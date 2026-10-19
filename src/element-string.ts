import { checkValue, defaultLintContext, getAI, matchAIPrefix } from "./ai.js";
import { checkAssociations } from "./associations.js";
import { DigitalLinkError, issue, type Issue, type ValidationResult } from "./errors.js";
import type { LintContext } from "./linters.js";
import type { Element } from "./types.js";

/** ASCII Group Separator, which scanners transmit in place of FNC1. */
export const GS = "\u001d";

/**
 * AIM symbology identifiers that announce GS1 AI data (GS1-128, GS1 DataBar,
 * GS1 DataMatrix, GS1 QR Code, GS1 DotCode). Scanners may prefix data with one.
 */
const GS1_SYMBOLOGY_IDS = ["]C1", "]e0", "]d2", "]Q3", "]J1"];

/** Options for element-string parsing. */
export interface ElementStringOptions {
  /**
   * Year used as the century horizon when validating YYMMDD dates
   * (GS1 General Specifications §7.12). Defaults to the current UTC year.
   */
  readonly currentYear?: number;
}

const ctxFrom = (options?: ElementStringOptions): LintContext =>
  options?.currentYear === undefined ? defaultLintContext() : { currentYear: options.currentYear };

function parseRaw(input: string, issues: Issue[]): Element[] {
  const elements: Element[] = [];
  let data = input;
  const symbologyId = GS1_SYMBOLOGY_IDS.find((id) => data.startsWith(id));
  if (symbologyId) data = data.slice(symbologyId.length);
  else if (data.startsWith("]")) {
    issues.push(
      issue(
        "ELEMENT_STRING_MALFORMED",
        `Symbology identifier "${data.slice(0, 3)}" does not announce GS1 AI data`,
      ),
    );
    return elements;
  }
  if (data.startsWith(GS)) data = data.slice(1); // leading FNC1

  let p = 0;
  while (p < data.length) {
    const def = matchAIPrefix(data.slice(p));
    if (!def) {
      issues.push(
        issue(
          "ELEMENT_STRING_UNKNOWN_AI",
          `No known GS1 Application Identifier at position ${p + 1}: "${data.slice(p, p + 4)}…"`,
        ),
      );
      return elements;
    }
    p += def.ai.length;
    let end = data.indexOf(GS, p);
    if (end < 0) end = data.length;
    if (def.predefinedLength) end = Math.min(end, p + def.maxLength);
    else if (end - p > def.maxLength) {
      issues.push(
        issue(
          "ELEMENT_STRING_VALUE_TOO_LONG",
          `AI (${def.ai}) ${def.title}: value is longer than ${def.maxLength} characters ` +
            "(is a GS separator missing?)",
          { ai: def.ai },
        ),
      );
      return elements;
    }
    elements.push({ ai: def.ai, value: data.slice(p, end) });
    p = end;
    if (data[p] === GS) p++;
  }
  return elements;
}

function parseBracketed(input: string, issues: Issue[]): Element[] {
  const elements: Element[] = [];
  let p = 0;
  while (p < input.length) {
    const close = input.indexOf(")", p);
    if (input[p] !== "(" || close < 0) {
      issues.push(
        issue("ELEMENT_STRING_MALFORMED", `Expected "(AI)" at position ${p + 1} of "${input}"`),
      );
      return elements;
    }
    const ai = input.slice(p + 1, close);
    if (!getAI(ai)) {
      issues.push(
        issue("ELEMENT_STRING_UNKNOWN_AI", `AI (${ai}) is not a known GS1 Application Identifier`, {
          ai,
        }),
      );
      return elements;
    }
    // Value runs to the next "(" that is not escaped as "\(".
    let value = "";
    let q = close + 1;
    for (;;) {
      const next = input.indexOf("(", q);
      if (next < 0) {
        value += input.slice(q);
        q = input.length;
        break;
      }
      if (input[next - 1] === "\\") {
        value += input.slice(q, next - 1) + "(";
        q = next + 1;
        continue;
      }
      value += input.slice(q, next);
      q = next;
      break;
    }
    elements.push({ ai, value });
    p = q;
  }
  return elements;
}

/** Validate values, repeated AIs and AI relationships. @internal */
export function checkElements(elements: readonly Element[], ctx: LintContext): Issue[] {
  const issues: Issue[] = [];
  for (const el of elements) {
    // Unknown AIs are rejected by the parsers before reaching here.
    const problem = checkValue(
      getAI(el.ai) as NonNullable<ReturnType<typeof getAI>>,
      el.value,
      ctx,
    );
    if (problem) issues.push(problem);
  }
  if (issues.length > 0) return issues;
  return checkAssociations(elements);
}

/**
 * Parse and validate GS1 element strings, as transmitted by a barcode
 * scanner or written in human-readable form.
 *
 * Accepts either:
 * - raw scanner data: AIs and values with ASCII GS (`\x1d`) after
 *   variable-length values, optionally preceded by a GS1 symbology identifier
 *   such as `]Q3` or `]d2`; or
 * - bracketed form: `(01)09520123456788(10)ABC123`, with a literal `(` in a
 *   value written as `\(`.
 *
 * Repeated AIs with identical values (from multiple carriers on one pack) are
 * merged; repeated AIs with different values are an error.
 */
export function validateElementString(
  input: string,
  options?: ElementStringOptions,
): ValidationResult<Element[]> {
  const issues: Issue[] = [];
  if (input.length === 0 || input === GS) {
    return { valid: false, issues: [issue("ELEMENT_STRING_EMPTY", "Element string is empty")] };
  }
  const parsed = input.startsWith("(") ? parseBracketed(input, issues) : parseRaw(input, issues);
  if (issues.length > 0) return { valid: false, issues };

  const elements: Element[] = [];
  for (const el of parsed) {
    const seen = elements.find((e) => e.ai === el.ai);
    if (!seen) elements.push(el);
    else if (seen.value !== el.value) {
      issues.push(
        issue(
          "ELEMENT_STRING_REPEATED_AI_DIFFERENT_VALUE",
          `AI (${el.ai}) appears more than once with different values`,
          { ai: el.ai },
        ),
      );
    }
  }
  if (issues.length > 0) return { valid: false, issues };

  const problems = checkElements(elements, ctxFrom(options));
  return problems.length > 0
    ? { valid: false, issues: problems }
    : { valid: true, value: elements };
}

/**
 * Like {@link validateElementString}, but throws {@link DigitalLinkError}
 * instead of returning issues.
 *
 * @example
 * parseElementString("\x1d0109520123456788" + "10ABC123\x1d" + "17271231")
 * // [{ ai: "01", value: "09520123456788" }, { ai: "10", value: "ABC123" },
 * //  { ai: "17", value: "271231" }]
 */
export function parseElementString(input: string, options?: ElementStringOptions): Element[] {
  const result = validateElementString(input, options);
  if (!result.valid) throw new DigitalLinkError(result.issues);
  return result.value;
}

/**
 * Write elements as a GS1 element string.
 *
 * - `"bracketed"` (default): human-readable `(01)09520123456788(10)ABC123`.
 * - `"raw"`: scanner form, with GS separators after variable-length values
 *   that are followed by another element. Suitable for encoding in a GS1
 *   DataMatrix or GS1 QR Code after FNC1.
 *
 * Values are not validated; use {@link validateElementString} on the result if needed.
 */
export function formatElementString(
  elements: readonly Element[],
  format: "bracketed" | "raw" = "bracketed",
): string {
  if (format === "bracketed") {
    return elements.map((e) => `(${e.ai})${e.value.replaceAll("(", "\\(")}`).join("");
  }
  return elements
    .map((e, i) => {
      const def = getAI(e.ai);
      const needsGs = i < elements.length - 1 && !(def?.predefinedLength ?? false);
      return e.ai + e.value + (needsGs ? GS : "");
    })
    .join("");
}
