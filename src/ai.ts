import { issue, type Issue } from "./errors.js";
import { AI_RANGES } from "./generated/ai-table.js";
import { CSET_LINTERS, LINTERS, describeLintError, type LintContext } from "./linters.js";
import type { AIDefinition, AIRangeSpec } from "./types.js";

function define(ai: string, spec: AIRangeSpec): AIDefinition {
  let minLength = 0;
  let maxLength = 0;
  for (const c of spec.components) {
    if (!c.optional) minLength += c.min;
    maxLength += c.max;
  }
  return Object.freeze({
    ai,
    title: spec.title,
    predefinedLength: spec.predefinedLength,
    dataAttribute: spec.dataAttribute,
    primaryKey: spec.dlpkey !== undefined,
    qualifiers: spec.dlpkey ?? [],
    components: spec.components,
    minLength,
    maxLength,
    spec,
  });
}

const TABLE: ReadonlyMap<string, AIDefinition> = (() => {
  const map = new Map<string, AIDefinition>();
  for (const spec of AI_RANGES) {
    const width = spec.from.length;
    for (let n = Number(spec.from); n <= Number(spec.to); n++) {
      const ai = String(n).padStart(width, "0");
      map.set(ai, define(ai, spec));
    }
  }
  return map;
})();

/** Look up an Application Identifier. Returns `undefined` for unknown AIs. */
export function getAI(ai: string): AIDefinition | undefined {
  return TABLE.get(ai);
}

/** All known Application Identifiers, in lexical order. */
export function listAIs(): AIDefinition[] {
  return [...TABLE.values()].sort((a, b) => (a.ai < b.ai ? -1 : 1));
}

/**
 * Find the AI at the start of `data` (element-string parsing). GS1 AIs are
 * prefix-free, so at most one of the 2-, 3- and 4-digit prefixes matches.
 * @internal
 */
export function matchAIPrefix(data: string): AIDefinition | undefined {
  for (let len = 2; len <= 4; len++) {
    const def = TABLE.get(data.slice(0, len));
    if (def) return def;
  }
  return undefined;
}

/** @internal */
export const defaultLintContext = (): LintContext => ({
  currentYear: new Date().getUTCFullYear(),
});

const label = (def: AIDefinition): string => `AI (${def.ai}) ${def.title}`;

/**
 * Validate an AI value against its format: overall length, then each
 * component's character set and GS1 reference linters (check digits, dates,
 * code lists…). Returns the first problem found, as the reference
 * implementation does.
 * @internal
 */
export function checkValue(def: AIDefinition, value: string, ctx: LintContext): Issue | undefined {
  const { ai } = def;
  if (value.length === 0) {
    return issue("AI_VALUE_EMPTY", `${label(def)}: value is empty`, { ai });
  }
  if (value.length < def.minLength) {
    return issue(
      "AI_VALUE_TOO_SHORT",
      `${label(def)}: value "${value}" is too short (minimum ${def.minLength} characters)`,
      { ai },
    );
  }
  if (value.length > def.maxLength) {
    return issue(
      "AI_VALUE_TOO_LONG",
      `${label(def)}: value "${value}" is too long (maximum ${def.maxLength} characters)`,
      { ai },
    );
  }

  let offset = 0;
  for (const part of def.components) {
    const len = Math.min(part.max, value.length - offset);
    if (part.optional && len === 0) continue;
    if (len < part.min) {
      return issue(
        "AI_VALUE_TOO_SHORT",
        `${label(def)}: value "${value}" has an incorrect length`,
        { ai },
      );
    }
    const component = value.slice(offset, offset + len);
    for (const name of [null, ...part.linters]) {
      const linter = name === null ? CSET_LINTERS[part.cset] : LINTERS[name];
      /* v8 ignore next 3 -- the generated table only names implemented linters (tested) */
      if (!linter) {
        throw new Error(`Linter "${name}" for AI (${ai}) is not implemented`);
      }
      const err = linter(component, ctx);
      if (err) {
        const position = offset + err.position;
        return issue(
          "AI_VALUE_INVALID",
          `${label(def)}: value "${value}" ${describeLintError(err.error)}` +
            (err.length > 0 && err.length < value.length
              ? ` (at position ${position + 1}: "${value.slice(position, position + err.length)}")`
              : ""),
          { ai, linterError: err.error, position, length: err.length },
        );
      }
    }
    offset += len;
  }
  return undefined;
}

/**
 * Validate a single AI value, e.g. `validateElement("17", "271231")`.
 * Returns an empty array when valid.
 */
export function validateElement(ai: string, value: string): Issue[] {
  const def = getAI(ai);
  if (!def)
    return [issue("AI_UNKNOWN", `AI (${ai}) is not a known GS1 Application Identifier`, { ai })];
  const problem = checkValue(def, value, defaultLintContext());
  return problem ? [problem] : [];
}
