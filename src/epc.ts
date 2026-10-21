// Decoding of EPC binary strings (GS1 EPC Tag Data Standard 2.2) to GS1
// element data, driven by the GS1 Tag Data Translation 2.2 artefacts; and
// expansion of EPC-compressed GS1 Digital Link URIs ("eh" / "ex"), per GS1
// Digital Link URI: Compression Technical Standard for EPC binary strings
// 1.0.0 (Jul 2025), §4.2.

import { DigitalLinkError, issue, type Issue, type ValidationResult } from "./errors.js";
import type { EpcField, EpcOption, EpcRule, EpcScheme, TableFComponent } from "./epc-types.js";
import { EPC_SCHEMES, OTHER_EPC_HEADERS, TABLE_F, TABLE_K } from "./generated/epc-table.js";
import { gs1CheckDigit } from "./gtin.js";
import type { Element } from "./types.js";
import { build, validate, type ParseOptions } from "./uri.js";

/** An EPC decoded to GS1 element data. */
export interface EpcIdentifier {
  /** EPC scheme name from the Tag Data Standard, e.g. `"SGTIN-96"`. */
  readonly scheme: string;
  /** Filter value (0–7), when the scheme has one. */
  readonly filter?: number;
  /** The identifier and any other data, as AIs, e.g. `[{ ai: "01", … }, { ai: "21", … }]`. */
  readonly elements: readonly Element[];
}

/** How the input to {@link decodeEpc} is written. */
export type EpcEncoding = "hex" | "base64url" | "binary";

const BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const CODE40 = " ABCDEFGHIJKLMNOPQRSTUVWXYZ-.:0123456789";

const BY_HEADER = new Map(EPC_SCHEMES.map((s) => [s.header, s]));
const PATTERNS = new Map<EpcOption, RegExp>();

/** Raised inside the decoder; becomes an `EPC_MALFORMED` issue. */
class Malformed extends Error {}

/** An encoding method this decoder does not implement: `EPC_UNSUPPORTED`. */
class Unsupported extends Error {}

/** Header of no known scheme, or of one without a GS1 key. */
class NoScheme extends Error {
  constructor(
    message: string,
    readonly known: boolean,
  ) {
    super(message);
  }
}

const malformed = (message: string): never => {
  throw new Malformed(message);
};

const isZeros = (bits: string): boolean => !bits.includes("1");

function toBits(input: string, encoding: EpcEncoding): string | undefined {
  if (input.length === 0) return undefined;
  if (encoding === "binary") return /^[01]+$/.test(input) ? input : undefined;
  const alphabet = encoding === "hex" ? "0123456789abcdef" : BASE64URL;
  const width = encoding === "hex" ? 4 : 6;
  let bits = "";
  for (const c of encoding === "hex" ? input.toLowerCase() : input) {
    const n = alphabet.indexOf(c);
    if (n < 0) return undefined;
    bits += n.toString(2).padStart(width, "0");
  }
  return bits;
}

/** Bits needed to hold any number of `digits` decimal digits: bit length of 10^n − 1. */
const numericBits = (digits: number): number => (10n ** BigInt(digits) - 1n).toString(2).length;

/** A run of `length` decimal digits, as one binary integer. */
const numeric = (r: Reader, length: number): string =>
  length === 0 ? "" : r.big(numericBits(length)).toString().padStart(length, "0");

/** Reads a bit string from the front, failing if it runs out. */
class Reader {
  constructor(private bits: string) {}

  get rest(): string {
    return this.bits;
  }

  take(n: number): string {
    if (n > this.bits.length) malformed("EPC binary string ends too early");
    const out = this.bits.slice(0, n);
    this.bits = this.bits.slice(n);
    return out;
  }

  int(n: number): number {
    return n === 0 ? 0 : parseInt(this.take(n), 2);
  }

  big(n: number): bigint {
    return n === 0 ? 0n : BigInt("0b" + this.take(n));
  }
}

const pad2 = (n: number): string => String(n).padStart(2, "0");

/** YYMMDD in 7 + 4 + 5 bits. Value ranges are left to the AI's own checks. */
function date(r: Reader): string {
  const yy = r.int(7);
  if (yy > 99) malformed(`EPC date has year ${yy}, more than 99`);
  return pad2(yy) + pad2(r.int(4)) + pad2(r.int(5));
}

/** Characters of `width` bits (TDS 2.2 §14.5.6 7-bit, and legacy 6/7/8-bit fields). */
function chars(bits: string, width: number, exact?: number): string {
  let out = "";
  let i = 0;
  for (; i + width <= bits.length; i += width) {
    let code = parseInt(bits.slice(i, i + width), 2);
    if (code === 0 && exact === undefined) break; // padding
    if (width === 6 && code < 32) code += 64;
    else if (code < 32) malformed(`EPC contains control character ${code}`);
    out += String.fromCharCode(code);
    if (out.length === exact) return out;
  }
  if (exact !== undefined) malformed("EPC binary string ends too early");
  if (!isZeros(bits.slice(i))) malformed("EPC character field has data after its padding");
  return out;
}

function hexDigits(r: Reader, length: number, upper: boolean): string {
  let out = "";
  for (let i = 0; i < length; i++) out += r.int(4).toString(16);
  return upper ? out.toUpperCase() : out;
}

/** Variable-length alphanumeric, TDS 2.2 §14.5.6. */
function variableAlphanumeric(r: Reader, c: TableFComponent): string {
  const indicator = r.take(3);
  const length = r.int(c.lenBits ?? malformed("Table F row has no length indicator"));
  if (c.max !== undefined && length > c.max) {
    malformed(`EPC value is ${length} characters long; at most ${c.max} allowed`);
  }
  switch (indicator) {
    case "000":
      return numeric(r, length);
    case "001":
      return hexDigits(r, length, true);
    case "010":
      return hexDigits(r, length, false);
    case "011": {
      let out = "";
      for (let i = 0; i < length; i++) out += BASE64URL.charAt(r.int(6));
      return out;
    }
    case "100":
      return chars(r.take(length * 7), 7, length);
    case "101": {
      let out = "";
      for (let i = 0; i < Math.ceil(length / 3); i++) {
        const n = r.int(16) - 1;
        if (n < 0 || n >= 40 ** 3) malformed("EPC contains an invalid URN Code 40 value");
        out +=
          CODE40.charAt(Math.floor(n / 1600)) +
          CODE40.charAt(Math.floor(n / 40) % 40) +
          CODE40.charAt(n % 40);
      }
      return out.slice(0, length);
    }
    default:
      return malformed(`EPC uses unknown encoding indicator ${indicator}`);
  }
}

/** Decodes one Table F component (TDS 2.2 §14.5). */
function tableF(r: Reader, c: TableFComponent): string {
  switch (c.method) {
    case "14.5.2": {
      const value = r.big(c.bits ?? 0).toString();
      if (c.chars !== undefined && value.length > c.chars) {
        malformed(`EPC value ${value} is longer than ${c.chars} digits`);
      }
      return value.padStart(c.chars ?? 0, "0");
    }
    case "14.5.4": {
      let out = "";
      for (let i = 0; i < (c.chars ?? 0); i++) {
        const d = r.int(4);
        if (d > 9) malformed("EPC numeric value contains a non-digit");
        out += d;
      }
      return out;
    }
    case "14.5.5": {
      // UNVERIFIED: delimited numeric, per GS1's TDT reference translator; the
      // TDS 2.2 text was not available to check against.
      let out = "";
      for (;;) {
        const d = r.int(4);
        if (d <= 9) out += d;
        else if (d === 15) return out;
        else if (d === 14) return out + variableAlphanumeric(r, c);
        else malformed("EPC delimited numeric value is malformed");
      }
    }
    case "14.5.6":
      return variableAlphanumeric(r, c);
    case "14.5.7":
      return r.take(1);
    case "14.5.8":
      return date(r);
    case "14.5.9": {
      const day = date(r);
      return day + pad2(r.int(5)) + pad2(r.int(6));
    }
    case "14.5.10": {
      const range = r.take(1) === "1";
      return range ? date(r) + date(r) : date(r);
    }
    case "14.5.11": {
      const precision = r.take(2);
      let out = date(r);
      if (precision !== "11") out += pad2(r.int(5));
      if (precision === "01" || precision === "10") out += pad2(r.int(6));
      if (precision === "10") out += pad2(r.int(6));
      return out;
    }
    case "14.5.12":
      return BASE64URL.charAt(r.int(6)) + BASE64URL.charAt(r.int(6));
    case "14.5.13": {
      return numeric(r, r.int(c.lenBits ?? 0));
    }
    case "14.5.14":
      return r.take(1) === "1" ? "-" : "";
    default:
      // UNVERIFIED: 14.5.15 (AI 7258) is in TDT Table F but not implemented by
      // GS1's reference translator, and the TDS 2.2 text was not available.
      throw new Unsupported(`EPC encoding method ${c.method} is not supported`);
  }
}

function aiValue(r: Reader, ai: string): string {
  const comps = TABLE_F[ai] ?? malformed(`AI (${ai}) cannot be encoded in an EPC`);
  return comps.map((c) => tableF(r, c)).join("");
}

/** TDS 2.x "+AIDC data": AI header digits then the Table F value, repeated. */
function plusData(r: Reader): Element[] {
  const out: Element[] = [];
  while (r.rest.length > 8 && !isZeros(r.rest)) {
    let ai = "";
    const digit = (): void => {
      const d = r.int(4);
      if (d > 9) malformed("EPC AI header contains a non-digit");
      ai += d;
    };
    digit();
    digit();
    const digits = TABLE_K[ai] ?? malformed(`EPC has an AI starting "${ai}", which is not valid`);
    while (ai.length < digits) digit();
    out.push({ ai, value: aiValue(r, ai) });
  }
  if (!isZeros(r.rest)) malformed("EPC has data after its padding");
  return out;
}

function field(bits: string, f: EpcField): string {
  if (f.kind === "date") return date(new Reader(bits));
  if (f.kind === "chars") return chars(bits, f.chars ?? 7);
  const n = bits.length === 0 ? 0n : BigInt("0b" + bits);
  if ((f.min !== undefined && n < BigInt(f.min)) || (f.max !== undefined && n > BigInt(f.max))) {
    malformed(`EPC field ${f.name} is out of range`);
  }
  if (f.length === 0) return "";
  return n.toString().padStart(f.length ?? 0, "0");
}

function runRules(rules: readonly EpcRule[], map: Map<string, string>): void {
  for (const rule of rules) {
    if (map.has(rule.out)) continue;
    const args: string[] = [];
    for (const a of rule.args) {
      const v = /^\d+$/.test(a) ? a : (/^'(.*)'$/.exec(a)?.[1] ?? map.get(a));
      if (v === undefined) break;
      args.push(v);
    }
    if (args.length < rule.args.length) continue;
    const [s = "", from, len] = args;
    map.set(
      rule.out,
      rule.fn === "CONCAT"
        ? args.join("")
        : rule.fn === "URLENCODE"
          ? s // values stay unescaped; build() escapes them
          : rule.fn === "GS1CHECKSUM"
            ? gs1CheckDigit(s)
            : len === undefined
              ? s.slice(Number(from))
              : s.slice(Number(from), Number(from) + Number(len)),
    );
  }
}

/**
 * Reads the AIs from the TDT GS1_DIGITAL_LINK grammar: a literal such as
 * `'/01/'` or `'?17='` starts an AI; the fields and literals after it are its
 * value.
 */
function elementsOf(option: EpcOption, map: Map<string, string>): Element[] {
  const out: { ai: string; value: string }[] = [];
  for (const token of option.grammar) {
    const literal = /^'(.*)'$/.exec(token)?.[1];
    const ai = literal === undefined ? undefined : /^[/?&](\d{2,4})[/=]$/.exec(literal)?.[1];
    if (ai !== undefined) {
      out.push({ ai, value: "" });
      continue;
    }
    const current = out.at(-1) ?? malformed("EPC grammar has data before its first AI");
    current.value +=
      literal ?? map.get(token) ?? malformed(`EPC field ${token} could not be derived`);
  }
  return out;
}

function decodeBits(bits: string): EpcIdentifier {
  const header = bits.slice(0, 8);
  const scheme: EpcScheme | undefined = BY_HEADER.get(header);
  if (!scheme) {
    const other = OTHER_EPC_HEADERS[header];
    throw new NoScheme(
      other
        ? `EPC scheme ${other} does not use a GS1 identification key`
        : `EPC header ${header} is not a known EPC scheme`,
      other !== undefined,
    );
  }
  for (const option of scheme.options) {
    let re = PATTERNS.get(option);
    if (!re) {
      re = new RegExp(option.pattern + (option.encodedAI ? "([01]*)" : ""));
      PATTERNS.set(option, re);
    }
    const m = re.exec(bits);
    if (!m) continue;

    const map = new Map<string, string>();
    option.fields.forEach((f, i) => map.set(f.name, field(m[i + 1] as string, f)));
    if (scheme.optionIsGcpLength) map.set("gs1companyprefixlength", option.key);

    let extra: Element[] = [];
    const rest = new Reader(
      option.encodedAI ? (m[option.fields.length + 1] as string) : bits.slice(m[0].length),
    );
    if (option.encodedAI) {
      for (const { ai, name } of option.encodedAI) map.set(name, aiValue(rest, ai));
      if (map.get("dataToggle") === "1") extra = plusData(rest);
    }
    if (!isZeros(rest.rest)) malformed("EPC has data after its padding");

    runRules(scheme.extract, map);
    runRules(scheme.format, map);
    const filter = map.get("filter");
    return {
      scheme: scheme.name,
      ...(filter !== undefined ? { filter: Number(filter) } : {}),
      elements: [...elementsOf(option, map), ...extra],
    };
  }
  return malformed(`EPC does not match any layout of scheme ${scheme.name}`);
}

const fail = (...issues: Issue[]): { valid: false; issues: Issue[] } => ({ valid: false, issues });

/**
 * Decode an EPC binary string, as read from an RFID tag, to GS1 element data,
 * using the GS1 Tag Data Translation 2.2 definitions. Supports every EPC
 * scheme with a GS1 identification key, including the TDS 2.x "+" schemes
 * and their extra AIs. AI values are not validated here; {@link build} or
 * {@link decompressEpcUri} do that.
 *
 * @example
 * decodeEpc("30164596f40c0e5cbe991a83");
 * // { valid: true, value: { scheme: "SGTIN-96", filter: 0, elements: [
 * //   { ai: "01", value: "09528765123457" }, { ai: "21", value: "123456789123" } ] } }
 */
export function decodeEpc(
  input: string,
  encoding: EpcEncoding = "hex",
): ValidationResult<EpcIdentifier> {
  const bits = toBits(input, encoding);
  if (bits === undefined) {
    return fail(issue("EPC_INVALID_ENCODING", `EPC is not a valid ${encoding} string`));
  }
  try {
    return { valid: true, value: decodeBits(bits) };
  } catch (e) {
    if (e instanceof Malformed) return fail(issue("EPC_MALFORMED", e.message));
    if (e instanceof Unsupported) return fail(issue("EPC_UNSUPPORTED", e.message));
    if (e instanceof NoScheme) {
      return fail(issue(e.known ? "EPC_NOT_GS1_KEY" : "EPC_UNKNOWN_SCHEME", e.message));
    }
    throw e;
  }
}

/** A compressed string "eh…" or "ex…" as the last path segment (EPCB §4.2). */
const COMPRESSED = /^(https?:\/\/[^/?#]+(?:\/[^/?#]*)*?)\/(eh|ex)([^/?#]*)(\?[^#]*)?(#.*)?$/;

/**
 * True if `uri` ends in an EPC-compressed string (`/eh…` or `/ex…`). Note
 * that this only looks at the form; use {@link decompressEpcUri} to decode.
 */
export function isEpcCompressedUri(uri: string): boolean {
  return COMPRESSED.test(uri);
}

/**
 * Expand a GS1 Digital Link URI whose last path segment is an EPC binary
 * string in hexadecimal (`eh…`) or URI-safe base 64 (`ex…`), per the GS1
 * Digital Link URI compression standard for EPC binary strings 1.0.0 §4.2.
 * The URI stem is kept; any query string or fragment is carried over. The
 * result is validated like {@link validate}.
 *
 * @example
 * decompressEpcUri("https://example.com/eh30164596f40c0e5cbe991a83");
 * // { valid: true, value: "https://example.com/01/09528765123457/21/123456789123" }
 */
export function decompressEpcUri(uri: string, options?: ParseOptions): ValidationResult<string> {
  const m = COMPRESSED.exec(uri);
  if (!m) {
    return fail(
      issue(
        "EPC_INVALID_ENCODING",
        'URI does not end in an EPC compressed string ("/eh…" or "/ex…")',
      ),
    );
  }
  const [, stem = "", prefix, data = "", query = "", fragment = ""] = m;
  const decoded = decodeEpc(data, prefix === "eh" ? "hex" : "base64url");
  if (!decoded.valid) return decoded;

  let expanded: string;
  try {
    expanded = build(
      decoded.value.elements,
      stem,
      options?.currentYear === undefined ? undefined : { currentYear: options.currentYear },
    );
  } catch (e) {
    if (e instanceof DigitalLinkError) return fail(...e.issues);
    throw e;
  }
  const extraQuery = query.slice(1);
  if (extraQuery !== "") expanded += (expanded.includes("?") ? "&" : "?") + extraQuery;
  expanded += fragment;
  const check = validate(expanded, options);
  return check.valid ? { valid: true, value: expanded } : check;
}
