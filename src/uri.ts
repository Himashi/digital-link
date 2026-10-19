// GS1 Digital Link URI parsing and building, per GS1 Digital Link Standard:
// URI Syntax, release 1.7.0 (Aug 2026), sections 4 and 6.

import { checkValue, defaultLintContext, getAI } from "./ai.js";
import { checkAssociations } from "./associations.js";
import { BAD_HOST_CHARACTERS, URI_CHARACTERS, URI_UNRESERVED, isDigits } from "./charsets.js";
import { DigitalLinkError, issue, type Issue, type ValidationResult } from "./errors.js";
import { normaliseGtin } from "./gtin.js";
import type { LintContext } from "./linters.js";
import type { AIDefinition, Element } from "./types.js";

/** The domain of canonical and reference GS1 Digital Link URIs (§4.12). */
export const CANONICAL_STEM = "https://id.gs1.org";

/** A parsed and validated GS1 Digital Link URI. */
export interface DigitalLink {
  /** Scheme as written, lower-cased: `"https"` or `"http"`. */
  readonly scheme: "https" | "http";
  /** Host, including any port, e.g. `"id.brand.co.uk"`. */
  readonly host: string;
  /**
   * Any custom path before the primary key, e.g. `"/products"`; `""` when the
   * primary key follows the host directly.
   */
  readonly stem: string;
  /** The primary identification key, e.g. `{ ai: "01", value: "09520123456788" }`. */
  readonly primaryKey: Element;
  /** Key qualifiers from the path, in order. */
  readonly qualifiers: readonly Element[];
  /** Data attributes from the query string, keyed by AI, e.g. `{ "17": "271231" }`. */
  readonly attributes: Readonly<Record<string, string>>;
  /**
   * Non-GS1 query parameters, decoded, e.g. `{ linkType: "gs1:pip" }`. If a
   * key repeats, the last value wins (§3).
   */
  readonly params: Readonly<Record<string, string>>;
  /** Fragment identifier, without `#`, if present. */
  readonly fragment?: string;
  /** Every AI in the URI, path first then query, in order of appearance. */
  readonly elements: readonly Element[];

  /** GTIN (AI 01), when it is the primary key. */
  readonly gtin?: string;
  /** Consumer product variant (AI 22), when present. */
  readonly cpv?: string;
  /** Batch or lot number (AI 10), from the path or query string. */
  readonly batch?: string;
  /** Serial number (AI 21), when present. */
  readonly serial?: string;
}

/** Options for {@link parse} and {@link validate}. */
export interface ParseOptions {
  /**
   * Accept a single trailing `/`. Not conformant to the URI syntax, but the
   * GS1-Conformant Resolver standard says resolvers should tolerate it.
   * Default `false`.
   */
  readonly allowTrailingSlash?: boolean;
  /**
   * Accept GTIN-8, -12 and -13 in AI (01) without zero-padding to 14 digits
   * (legacy URIs from before URI Syntax 1.4.0, §4.1). They are padded in the
   * result. Default `false`.
   */
  readonly allowShortGtin?: boolean;
  /**
   * Year used as the century horizon when validating YYMMDD dates
   * (GS1 General Specifications §7.12). Defaults to the current UTC year.
   */
  readonly currentYear?: number;
}

// --- Percent-encoding -------------------------------------------------------

const HEX = /^[0-9A-Fa-f]{2}$/;

/**
 * Reverse percent-encoding. Invalid escape sequences are kept literally; "+"
 * means space only in the query string. Each escape decodes to one byte, held
 * as one char code, so non-ASCII input is rejected later by character-set
 * checks rather than mis-decoded. Returns `undefined` if it decodes to NUL.
 */
function unescape(raw: string, query: boolean): string | undefined {
  let out = "";
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i] as string;
    if (c === "%" && HEX.test(raw.slice(i + 1, i + 3))) {
      const code = parseInt(raw.slice(i + 1, i + 3), 16);
      if (code === 0) return undefined;
      out += String.fromCharCode(code);
      i += 2;
    } else if (c === "+" && query) out += " ";
    else out += c;
  }
  return out;
}

/** Percent-encode everything except RFC 3986 unreserved characters (§4.2). */
function escape(value: string, query: boolean): string {
  let out = "";
  for (const c of value) {
    if (URI_UNRESERVED.has(c)) out += c;
    else if (c === " " && query) out += "+";
    else out += escapeChar(c);
  }
  return out;
}

/** UTF-8 percent-encoding of one code point, with uppercase hex digits. */
function escapeChar(c: string): string {
  let enc: string;
  try {
    enc = encodeURIComponent(c);
  } catch {
    return "%EF%BF%BD"; // lone surrogate: U+FFFD, rejected later by validation
  }
  // encodeURIComponent leaves !'()* unescaped; GS1 requires them encoded (§4.2).
  return enc === c ? "%" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0") : enc;
}

// --- Key-qualifier sequences ---------------------------------------------------

/** True if `qualifiers` is an ordered subsequence of `sequence`. */
function isSubsequence(qualifiers: readonly string[], sequence: readonly string[]): boolean {
  let i = 0;
  for (const ai of sequence) if (qualifiers[i] === ai) i++;
  return i === qualifiers.length;
}

/** Is `[key, ...qualifiers]` a valid GS1 Digital Link path AI sequence (§4.9)? */
function isValidPath(key: AIDefinition, qualifiers: readonly string[]): boolean {
  const mandatory = key.spec.dlpkeyMandatory ?? [];
  if (!mandatory.every((ai) => qualifiers.includes(ai))) return false;
  return key.qualifiers.some((seq) => isSubsequence(qualifiers, seq));
}

const describePath = (key: AIDefinition): string =>
  key.qualifiers.map((seq) => [key.ai, ...seq].map((ai) => `/${ai}/…`).join("")).join(" or ");

// --- Parsing ------------------------------------------------------------------

const ctxFrom = (options?: ParseOptions): LintContext =>
  options?.currentYear === undefined ? defaultLintContext() : { currentYear: options.currentYear };

const fail = (...issues: Issue[]): ValidationResult<DigitalLink> => ({ valid: false, issues });

/**
 * Parse and validate a GS1 Digital Link URI, returning every problem found
 * as a readable message rather than throwing.
 *
 * @example
 * const r = validate("https://id.brand.co.uk/01/09520123456788/10/ABC123?17=271231");
 * if (r.valid) r.value.batch; // "ABC123"
 * else r.issues.map((i) => i.message);
 */
export function validate(uri: string, options?: ParseOptions): ValidationResult<DigitalLink> {
  for (let i = 0; i < uri.length; i++) {
    if (!URI_CHARACTERS.has(uri[i] as string)) {
      return fail(
        issue(
          "URI_ILLEGAL_CHARACTER",
          `URI contains a character that is not allowed in a URI: ${JSON.stringify(uri[i])} at position ${i + 1}`,
          { position: i, length: 1 },
        ),
      );
    }
  }

  const scheme = /^(https?|HTTPS?):\/\//.exec(uri)?.[1];
  if (!scheme) {
    return fail(issue("URI_ILLEGAL_SCHEME", 'URI must start with "https://" or "http://"'));
  }
  let rest = uri.slice(scheme.length + 3);

  let fragment: string | undefined;
  const hashAt = rest.indexOf("#");
  if (hashAt >= 0) {
    fragment = rest.slice(hashAt + 1);
    rest = rest.slice(0, hashAt);
  }
  let query = "";
  const queryAt = rest.indexOf("?");
  if (queryAt >= 0) {
    query = rest.slice(queryAt + 1);
    rest = rest.slice(0, queryAt);
  }

  const slashAt = rest.indexOf("/");
  const host = slashAt >= 0 ? rest.slice(0, slashAt) : rest;
  for (const c of host) {
    if (BAD_HOST_CHARACTERS.has(c)) {
      return fail(
        issue("URI_ILLEGAL_HOST_CHARACTER", `Host "${host}" contains an illegal character "${c}"`),
      );
    }
  }
  if (host.length === 0 || slashAt < 0) {
    return fail(issue("URI_MISSING_HOST", "URI must have a host followed by a path"));
  }

  let path = rest.slice(slashAt);
  if (path.length > 1 && path.endsWith("/")) {
    if (!options?.allowTrailingSlash) {
      return fail(
        issue("URI_TRAILING_SLASH", "GS1 Digital Link URI path must not end with a slash"),
      );
    }
    path = path.slice(0, -1);
  }

  // Find the primary key by walking "/AI/value" pairs back from the end of
  // the path; anything before it is a custom stem (§4.11).
  const segments = path.slice(1).split("/");
  let keyIndex = -1;
  for (let i = segments.length - 2; i >= 0; i -= 2) {
    const def = getAI(segments[i] as string);
    if (!def) break;
    if (def.primaryKey) {
      keyIndex = i;
      break;
    }
  }
  if (keyIndex < 0) {
    return fail(
      issue(
        "URI_NO_PRIMARY_KEY",
        "No GS1 primary key (such as /01/ followed by a GTIN) found at the end of the URI path",
      ),
    );
  }

  const issues: Issue[] = [];
  const ctx = ctxFrom(options);

  const pathElements: Element[] = [];
  for (let i = keyIndex; i < segments.length; i += 2) {
    const ai = segments[i] as string;
    const raw = segments[i + 1] as string;
    if (raw.length === 0) {
      issues.push(issue("URI_EMPTY_PATH_VALUE", `AI (${ai}) in the URI path has no value`, { ai }));
      continue;
    }
    const value = unescape(raw, false);
    if (value === undefined) {
      issues.push(issue("URI_NUL_CHARACTER", `AI (${ai}) value contains a NUL character`, { ai }));
      continue;
    }
    pathElements.push({ ai, value });
  }

  const attributeElements: Element[] = [];
  const params: Record<string, string> = {};
  // Parameters are separated by "&" or ";" (§4.11 queryStringDelim).
  for (const param of query.split(/[&;]/)) {
    if (param === "") continue;
    const eq = param.indexOf("=");
    const rawKey = eq >= 0 ? param.slice(0, eq) : param;
    const rawValue = eq >= 0 ? param.slice(eq + 1) : "";
    if (eq >= 0 && isDigits(rawKey) && rawKey.length > 0) {
      if (!getAI(rawKey)) {
        issues.push(
          issue(
            "URI_UNKNOWN_AI_IN_QUERY",
            `Query parameter "${rawKey}" is all digits but is not a GS1 Application Identifier ` +
              "(extension keys must not be all-numeric, §4.10.1)",
            { ai: rawKey },
          ),
        );
        continue;
      }
      if (rawValue.length === 0) {
        issues.push(
          issue("URI_EMPTY_QUERY_VALUE", `AI (${rawKey}) in the query string has no value`, {
            ai: rawKey,
          }),
        );
        continue;
      }
      const value = unescape(rawValue, true);
      if (value === undefined) {
        issues.push(
          issue("URI_NUL_CHARACTER", `AI (${rawKey}) value contains a NUL character`, {
            ai: rawKey,
          }),
        );
        continue;
      }
      attributeElements.push({ ai: rawKey, value });
    } else {
      params[unescape(rawKey, true) ?? rawKey] = unescape(rawValue, true) ?? rawValue;
    }
  }

  // Legacy GTIN-8/12/13 in AI (01), when permitted.
  const pad = (e: Element): Element =>
    options?.allowShortGtin && e.ai === "01" && [8, 12, 13].includes(e.value.length)
      ? { ai: e.ai, value: e.value.padStart(14, "0") }
      : e;
  const path_ = pathElements.map(pad);
  const attrs = attributeElements.map(pad);
  const elements = [...path_, ...attrs];

  // Structure: key-qualifier order (§4.9)
  const key = getAI(segments[keyIndex] as string) as AIDefinition;
  const qualifierAIs = path_.slice(1).map((e) => e.ai);
  if (issues.length === 0 && !isValidPath(key, qualifierAIs)) {
    issues.push(
      issue(
        "URI_INVALID_KEY_QUALIFIER_SEQUENCE",
        `Path ${[key.ai, ...qualifierAIs].map((ai) => `/${ai}/…`).join("")} is not a valid ` +
          `key qualifier sequence for AI (${key.ai}) ${key.title}; allowed: ${describePath(key)}`,
        { ai: key.ai },
      ),
    );
  }

  // No AI may appear twice.
  const seen = new Set<string>();
  for (const e of elements) {
    if (seen.has(e.ai)) {
      issues.push(issue("URI_DUPLICATE_AI", `AI (${e.ai}) appears more than once`, { ai: e.ai }));
    }
    seen.add(e.ai);
  }

  // Query AIs must be permitted data attributes, and not belong in the path.
  for (const e of attrs) {
    const def = getAI(e.ai) as AIDefinition;
    if (!def.dataAttribute) {
      issues.push(
        issue(
          "URI_AI_NOT_DATA_ATTRIBUTE",
          `AI (${e.ai}) ${def.title} is not permitted in the query string of a GS1 Digital Link URI`,
          { ai: e.ai },
        ),
      );
      continue;
    }
    for (let j = 0; j <= qualifierAIs.length; j++) {
      const trial = [...qualifierAIs.slice(0, j), e.ai, ...qualifierAIs.slice(j)];
      if (isValidPath(key, trial)) {
        issues.push(
          issue(
            "URI_AI_SHOULD_BE_IN_PATH",
            `AI (${e.ai}) ${def.title} is a key qualifier of AI (${key.ai}) and must be in the ` +
              `URI path, e.g. ${describePath(key)}`,
            { ai: e.ai },
          ),
        );
        break;
      }
    }
  }
  if (issues.length > 0) return fail(...issues);

  // Values, then relationships between AIs.
  for (const e of elements) {
    const problem = checkValue(getAI(e.ai) as AIDefinition, e.value, ctx);
    if (problem) issues.push(problem);
  }
  if (issues.length === 0) issues.push(...checkAssociations(elements));
  if (issues.length > 0) return fail(...issues);

  const primaryKey = path_[0] as Element;
  const qualifiers = path_.slice(1);
  const find = (ai: string): string | undefined => elements.find((e) => e.ai === ai)?.value;
  const gtin = primaryKey.ai === "01" ? primaryKey.value : undefined;
  const cpv = find("22");
  const batch = find("10");
  const serial = find("21");

  const stemSegments = segments.slice(0, keyIndex);
  const value: DigitalLink = {
    scheme: scheme.toLowerCase() as "https" | "http",
    host,
    stem: stemSegments.length > 0 ? "/" + stemSegments.join("/") : "",
    primaryKey,
    qualifiers,
    attributes: Object.fromEntries(attrs.map((e) => [e.ai, e.value])),
    params,
    ...(fragment !== undefined ? { fragment } : {}),
    elements,
    ...(gtin !== undefined ? { gtin } : {}),
    ...(cpv !== undefined ? { cpv } : {}),
    ...(batch !== undefined ? { batch } : {}),
    ...(serial !== undefined ? { serial } : {}),
  };
  return { valid: true, value };
}

/**
 * Parse a GS1 Digital Link URI. Throws {@link DigitalLinkError} (with an
 * `issues` array) if the URI is not a valid GS1 Digital Link URI.
 *
 * @example
 * parse("https://id.brand.co.uk/01/09520123456788/10/ABC123?17=271231");
 * // { gtin: "09520123456788", batch: "ABC123", attributes: { "17": "271231" }, … }
 */
export function parse(uri: string, options?: ParseOptions): DigitalLink {
  const result = validate(uri, options);
  if (!result.valid) throw new DigitalLinkError(result.issues);
  return result.value;
}

// --- Building -----------------------------------------------------------------

/** Identifier data for a GTIN-keyed Digital Link URI. */
export interface GtinInput {
  /** GTIN-8, -12, -13 or -14. Normalised to 14 digits. */
  readonly gtin: string;
  /** Consumer product variant, AI (22). */
  readonly cpv?: string;
  /** Batch or lot, AI (10). */
  readonly batch?: string;
  /** Serial number, AI (21). */
  readonly serial?: string;
  /** Data attributes keyed by AI, e.g. `{ "17": "271231" }` for an expiry date. */
  readonly attributes?: Readonly<Record<string, string>>;
}

/** Identifier data for any primary key, e.g. an SSCC or GLN. */
export interface KeyInput {
  readonly primaryKey: Element;
  readonly qualifiers?: readonly Element[];
  readonly attributes?: Readonly<Record<string, string>>;
}

/** Options for {@link build}. */
export interface BuildOptions {
  /**
   * Non-GS1 query parameters to append, e.g. `{ linkType: "gs1:pip" }`. Keys
   * must not be all-numeric (§4.10.1). Omitted from canonical URIs.
   */
  readonly params?: Readonly<Record<string, string>>;
  /** See {@link ParseOptions.currentYear}. */
  readonly currentYear?: number;
}

function normaliseStem(domain: string): string {
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(domain) ? domain : `https://${domain}`;
  const stem = withScheme.replace(/\/+$/, "");
  const m = /^(https?|HTTPS?):\/\/([^/?#]+)((?:\/[^/?#]*)*)$/.exec(stem);
  const host = m?.[2] ?? "";
  if (!m || [...host].some((c) => BAD_HOST_CHARACTERS.has(c) || !URI_CHARACTERS.has(c))) {
    throw new DigitalLinkError([
      issue(
        "BUILD_INVALID_STEM",
        `"${domain}" is not a valid domain or URI stem (expected e.g. "id.brand.co.uk" or "https://id.brand.co.uk/path")`,
      ),
    ]);
  }
  return stem;
}

/**
 * Choose the primary key and the longest key-qualifier sequence satisfied by
 * a set of elements, breaking ties the way the GS1 Syntax Engine does.
 */
function arrange(elements: readonly Element[]): { path: Element[]; rest: Element[] } {
  const keyEl = elements.find((e) => getAI(e.ai)?.primaryKey);
  if (!keyEl) {
    throw new DigitalLinkError([
      issue(
        "BUILD_NO_PRIMARY_KEY",
        "Cannot build a GS1 Digital Link URI without a primary key such as a GTIN, AI (01)",
      ),
    ]);
  }
  const key = getAI(keyEl.ai) as AIDefinition;
  const present = new Set(elements.map((e) => e.ai));
  const candidates = new Set<string>();
  for (const seq of key.qualifiers) {
    const usable = seq.filter((ai) => present.has(ai));
    // Every ordered subsequence of the usable qualifiers, as "AI AI …" strings.
    for (let mask = 0; mask < 1 << usable.length; mask++) {
      const pick = usable.filter((_, i) => mask & (1 << i));
      if (isValidPath(key, pick)) candidates.add([key.ai, ...pick].join(" "));
    }
  }
  const best = [...candidates]
    .sort()
    .reduce((a, b) => (b.split(" ").length > a.split(" ").length ? b : a), key.ai);
  const pathAIs = best.split(" ");
  const path = pathAIs.map((ai) => elements.find((e) => e.ai === ai) as Element);
  const rest = elements.filter((e) => !pathAIs.includes(e.ai));
  return { path, rest };
}

function assemble(
  stem: string,
  path: readonly Element[],
  attributes: readonly Element[],
  params?: Readonly<Record<string, string>>,
): string {
  const sorted = [...attributes].sort((a, b) => (a.ai < b.ai ? -1 : a.ai > b.ai ? 1 : 0));
  const query = [
    ...sorted.map((e) => `${e.ai}=${escape(e.value, true)}`),
    ...Object.entries(params ?? {}).map(([k, v]) => `${escape(k, true)}=${escape(v, true)}`),
  ];
  return (
    stem +
    path.map((e) => `/${e.ai}/${escape(e.value, false)}`).join("") +
    (query.length > 0 ? "?" + query.join("&") : "")
  );
}

/**
 * Build a GS1 Digital Link URI. Data attributes are written in lexical AI
 * order (§4.12). The result is validated; invalid data throws
 * {@link DigitalLinkError} with readable issues.
 *
 * `data` may be:
 * - `{ gtin, cpv?, batch?, serial?, attributes? }` for products;
 * - `{ primaryKey, qualifiers?, attributes? }` for any other key; or
 * - an array of elements, e.g. from {@link parseElementString}. The first
 *   primary-key AI becomes the path root and as many key qualifiers as
 *   possible go into the path.
 *
 * `domain` is a host such as `"id.brand.co.uk"` (HTTPS assumed) or a full
 * stem such as `"https://brand.co.uk/products"`. Defaults to `https://id.gs1.org`.
 *
 * @example
 * build({ gtin: "9520123456788", batch: "ABC123", attributes: { "17": "271231" } }, "id.brand.co.uk");
 * // "https://id.brand.co.uk/01/09520123456788/10/ABC123?17=271231"
 */
export function build(
  data: GtinInput | KeyInput | readonly Element[],
  domain: string = CANONICAL_STEM,
  options?: BuildOptions,
): string {
  const stem = normaliseStem(domain);

  let elements: Element[];
  if (Array.isArray(data)) {
    // Identical repeats (multiple carriers) collapse to one.
    elements = [];
    for (const e of data as readonly Element[]) {
      if (!elements.some((x) => x.ai === e.ai && x.value === e.value)) elements.push(e);
    }
  } else if ("gtin" in data) {
    const d = data as GtinInput;
    elements = [
      { ai: "01", value: normaliseGtin(d.gtin) },
      ...(d.cpv !== undefined ? [{ ai: "22", value: d.cpv }] : []),
      ...(d.batch !== undefined ? [{ ai: "10", value: d.batch }] : []),
      ...(d.serial !== undefined ? [{ ai: "21", value: d.serial }] : []),
      ...Object.entries(d.attributes ?? {}).map(([ai, value]) => ({ ai, value })),
    ];
  } else {
    const d = data as KeyInput;
    elements = [
      d.primaryKey,
      ...(d.qualifiers ?? []),
      ...Object.entries(d.attributes ?? {}).map(([ai, value]) => ({ ai, value })),
    ];
  }

  for (const k of Object.keys(options?.params ?? {})) {
    if (k === "" || isDigits(k)) {
      throw new DigitalLinkError([
        issue(
          "URI_UNKNOWN_AI_IN_QUERY",
          `Extra query parameter key "${k}" must contain a non-digit character (§4.10.1)`,
        ),
      ]);
    }
  }
  for (const e of elements) {
    if (!getAI(e.ai)) {
      throw new DigitalLinkError([
        issue("AI_UNKNOWN", `AI (${e.ai}) is not a known GS1 Application Identifier`, { ai: e.ai }),
      ]);
    }
  }

  const { path, rest } = Array.isArray(data)
    ? arrange(elements)
    : ((): { path: Element[]; rest: Element[] } => {
        const key = getAI((elements[0] as Element).ai) as AIDefinition;
        if (!key.primaryKey) {
          throw new DigitalLinkError([
            issue(
              "BUILD_NO_PRIMARY_KEY",
              `AI (${key.ai}) ${key.title} is not a GS1 Digital Link primary key`,
              { ai: key.ai },
            ),
          ]);
        }
        const qualifierCount =
          "gtin" in data
            ? elements.filter((e) => ["22", "10", "21"].includes(e.ai)).length
            : ((data as KeyInput).qualifiers ?? []).length;
        return {
          path: elements.slice(0, 1 + qualifierCount),
          rest: elements.slice(1 + qualifierCount),
        };
      })();

  const uri = assemble(stem, path, rest, options?.params);
  // Round-trip through the parser so build() can never emit an invalid URI.
  const check = validate(
    uri,
    options?.currentYear === undefined ? undefined : { currentYear: options.currentYear },
  );
  if (!check.valid) throw new DigitalLinkError(check.issues);
  return uri;
}

/**
 * The canonical form of a GS1 Digital Link URI (§4.12): HTTPS, `id.gs1.org`,
 * no custom stem, only GS1 AI query parameters in lexical order, no
 * fragment. Useful as a stable lookup key.
 *
 * @example
 * toCanonical("http://example.com/01/09520123456788/22/2A?linkType=gs1:traceability");
 * // "https://id.gs1.org/01/09520123456788/22/2A"
 */
export function toCanonical(link: string | DigitalLink, options?: ParseOptions): string {
  const d = typeof link === "string" ? parse(link, options) : link;
  return assemble(
    CANONICAL_STEM,
    [d.primaryKey, ...d.qualifiers],
    Object.entries(d.attributes).map(([ai, value]) => ({ ai, value })),
  );
}

/** URI Syntax §6.1.1 regular expression RE1 for uncompressed GS1 Digital Link URIs. */
const RE1 =
  /^(https?|HTTPS?):(\/\/((([^/?#]*)@)?([^/?#:]*)(:([^/?#]*))?))?([^?#]*)(((\/(01|8006|8013|8010|414|415|417|8017|8018|255|00|253|401|402|8003|8004)\/)(\d{4}[^/]+)(\/[^/]+\/[^/]+)?[/]?(\?([^?\n]*))?(#([^\n]*))?))/;

/**
 * Quick check, using the standard's own regular expression (§6.1.1), that a
 * scanned string is plausibly an uncompressed GS1 Digital Link URI. A `true`
 * result is not validation; call {@link validate} for that.
 */
export function isDigitalLink(text: string): boolean {
  return RE1.test(text);
}

/** @internal */
export const _internal = { unescape, escape, isSubsequence };
