// TypeScript port of the GS1 Barcode Syntax Tests reference linters
// (https://github.com/gs1/gs1-syntax-dictionary, src/lint_*.c, release
// 2026-01-27, Apache-2.0, (c) GS1 AISBL). Error names and reported positions
// follow the reference implementation so results can be compared directly.

import { CSET39_SET, CSET64_SET, CSET82_SET } from "./charsets.js";
import {
  ISO3166_ALPHA2,
  ISO3166_NUMERIC,
  ISO4217_NUMERIC,
  MEDIA_TYPES,
  PACKAGE_TYPES,
} from "./generated/code-lists.js";

/** A linter failure: reference error name plus offending span within the input. */
export interface LintError {
  readonly error: string;
  readonly position: number;
  readonly length: number;
}

/** @internal */
export interface LintContext {
  /** Four-digit year used as the century horizon for YYMMDD dates. */
  readonly currentYear: number;
}

type Linter = (data: string, ctx: LintContext) => LintError | undefined;

const fail = (error: string, position: number, length: number): LintError => ({
  error,
  position,
  length,
});

const isDigit = (c: string | undefined): boolean => c !== undefined && c >= "0" && c <= "9";

function firstNonDigit(data: string, from = 0, to = data.length): number {
  for (let i = from; i < to; i++) if (!isDigit(data[i])) return i;
  return -1;
}

const num2 = (data: string, at: number): number =>
  (data.charCodeAt(at) - 48) * 10 + (data.charCodeAt(at + 1) - 48);

// --- Character sets ---------------------------------------------------------

function csetLinter(set: ReadonlySet<string>, error: string): Linter {
  return (data) => {
    for (let i = 0; i < data.length; i++) {
      if (!set.has(data[i] as string)) return fail(error, i, 1);
    }
    return undefined;
  };
}

const csetnumeric: Linter = (data) => {
  const i = firstNonDigit(data);
  return i >= 0 ? fail("NON_DIGIT_CHARACTER", i, 1) : undefined;
};

const cset82 = csetLinter(CSET82_SET, "INVALID_CSET82_CHARACTER");
const cset39 = csetLinter(CSET39_SET, "INVALID_CSET39_CHARACTER");

const cset64: Linter = (data) => {
  let pads = 0;
  while (pads < data.length && data[data.length - pads - 1] === "=") pads++;
  const len = data.length - pads;
  if (pads > 2 || (pads > 0 && data.length % 3 !== 0)) {
    return fail("INVALID_CSET64_PADDING", len, pads);
  }
  for (let i = 0; i < len; i++) {
    if (!CSET64_SET.has(data[i] as string)) return fail("INVALID_CSET64_CHARACTER", i, 1);
  }
  return undefined;
};

// --- Check digits -----------------------------------------------------------

/** GS1 mod-10 check digit linter (GS1 General Specifications §7.9.1). */
const csum: Linter = (data) => {
  if (data.length === 0) return fail("TOO_SHORT_FOR_CHECK_DIGIT", 0, 0);
  let weight = data.length % 2 === 0 ? 3 : 1;
  let parity = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (!isDigit(data[i])) return fail("NON_DIGIT_CHARACTER", i, 1);
    parity += weight * (data.charCodeAt(i) - 48);
    weight = 4 - weight;
  }
  const last = data.length - 1;
  if (!isDigit(data[last])) return fail("NON_DIGIT_CHARACTER", last, 1);
  if ((10 - (parity % 10)) % 10 !== data.charCodeAt(last) - 48) {
    return fail("INCORRECT_CHECK_DIGIT", last, 1);
  }
  return undefined;
};

const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
  101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
  197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307,
  311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
  431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509,
];
const CSET32 = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
// Character weights are positions in CSET 82 as ordered by GS1 (§7.9.5).
const CSET82_ORDER = `!"%&'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`;

/** GS1 check character pair linter (GS1 General Specifications §7.9.5). */
const csumalpha: Linter = (data) => {
  const n = data.length;
  if (n > PRIMES.length + 2) return fail("TOO_LONG_FOR_CHECK_PAIR_IMPLEMENTATION", 0, n);
  if (n < 2) return fail("TOO_SHORT_FOR_CHECK_PAIR", 0, n);
  if (n === 2) {
    return data === "22" ? undefined : fail("INCORRECT_CHECK_PAIR", 0, 2);
  }
  let sum = 0;
  for (let i = 0; i < n - 2; i++) {
    const w = CSET82_ORDER.indexOf(data[i] as string);
    if (w < 0) return fail("INVALID_CSET82_CHARACTER", i, 1);
    sum += w * (PRIMES[n - 3 - i] as number);
  }
  sum %= 1021;
  if (data[n - 2] !== CSET32[sum >> 5] || data[n - 1] !== CSET32[sum & 31]) {
    return fail("INCORRECT_CHECK_PAIR", n - 2, 2);
  }
  return undefined;
};

// --- GS1 Company Prefix -------------------------------------------------------

const GCP_MIN_LENGTH = 4;

/**
 * Checks the characters of the shortest possible GS1 Company Prefix are
 * digits. Membership of an allocated GCP range needs GS1 data that this
 * library does not ship, matching the reference implementation's default.
 */
const gcppos1: Linter = (data) => {
  if (data.length < GCP_MIN_LENGTH) return fail("TOO_SHORT_FOR_GCP", 0, data.length);
  const i = firstNonDigit(data, 0, GCP_MIN_LENGTH);
  return i >= 0 ? fail("INVALID_GCP_PREFIX", i, 1) : undefined;
};

const gcppos2: Linter = (data, ctx) => {
  if (data.length < 2) return fail("TOO_SHORT_FOR_GCP", 0, data.length);
  const err = gcppos1(data.slice(1), ctx);
  return err ? fail(err.error, err.position + 1, err.length) : undefined;
};

// --- Dates and times --------------------------------------------------------

const DAYS_IN_MONTH = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const yyyymmd0: Linter = (data) => {
  if (data.length !== 8) {
    return fail(data.length < 8 ? "DATE_TOO_SHORT" : "DATE_TOO_LONG", 0, data.length);
  }
  const i = firstNonDigit(data);
  if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
  const yyyy = num2(data, 0) * 100 + num2(data, 2);
  const mm = num2(data, 4);
  const dd = num2(data, 6);
  if (mm < 1 || mm > 12) return fail("ILLEGAL_MONTH", 4, 2);
  const leap = (yyyy % 4 === 0 && yyyy % 100 !== 0) || yyyy % 400 === 0;
  const maxdd = mm === 2 ? (leap ? 29 : 28) : (DAYS_IN_MONTH[mm - 1] as number);
  if (dd > maxdd) return fail("ILLEGAL_DAY", 6, 2); // "00" is permitted
  return undefined;
};

const yyyymmdd: Linter = (data, ctx) => {
  const err = yyyymmd0(data, ctx);
  if (err) return err;
  return data.slice(6, 8) === "00" ? fail("ILLEGAL_DAY", 6, 2) : undefined;
};

/**
 * Six-digit date, day "00" permitted. The century is chosen with the sliding
 * horizon of GS1 General Specifications §7.12, relative to `ctx.currentYear`.
 */
const yymmd0: Linter = (data, ctx) => {
  if (data.length !== 6) {
    return fail(data.length < 6 ? "DATE_TOO_SHORT" : "DATE_TOO_LONG", 0, data.length);
  }
  const i = firstNonDigit(data);
  if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
  const diff = num2(data, 0) - (ctx.currentYear % 100);
  const century = diff >= 51 ? "19" : diff > -50 ? "20" : "21";
  const err = yyyymmd0(century + data, ctx);
  return err ? fail(err.error, err.position - 2, err.length) : undefined;
};

const yymmdd: Linter = (data, ctx) => {
  const err = yymmd0(data, ctx);
  if (err) return err;
  return data.slice(4, 6) === "00" ? fail("ILLEGAL_DAY", 4, 2) : undefined;
};

function twoDigitLinter(unit: string, max: number): Linter {
  return (data) => {
    if (data.length !== 2) {
      return fail(`${unit}_${data.length < 2 ? "TOO_SHORT" : "TOO_LONG"}`, 0, data.length);
    }
    const i = firstNonDigit(data);
    if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
    return num2(data, 0) > max ? fail(`ILLEGAL_${unit}`, 0, 2) : undefined;
  };
}

const hh = twoDigitLinter("HOUR", 23);
const mi = twoDigitLinter("MINUTE", 59);
const ss = twoDigitLinter("SECOND", 59);

const hhmi: Linter = (data, ctx) => {
  if (data.length !== 4) {
    const which = data.length < 4 ? "TOO_SHORT" : "TOO_LONG";
    return fail(`HOUR_WITH_MINUTE_${which}`, 0, data.length);
  }
  const h = hh(data.slice(0, 2), ctx);
  if (h) return h;
  const m = mi(data.slice(2), ctx);
  return m ? fail(m.error, m.position + 2, m.length) : undefined;
};

// --- Code lists ---------------------------------------------------------------

function codeListLinter(list: ReadonlySet<string>, error: string): Linter {
  return (data) => (list.has(data) ? undefined : fail(error, 0, data.length));
}

const iso3166 = codeListLinter(ISO3166_NUMERIC, "NOT_ISO3166");
const iso3166alpha2 = codeListLinter(ISO3166_ALPHA2, "NOT_ISO3166_ALPHA2");
const iso4217 = codeListLinter(ISO4217_NUMERIC, "NOT_ISO4217");
const packagetype = codeListLinter(PACKAGE_TYPES, "INVALID_PACKAGE_TYPE");
const mediatype = codeListLinter(MEDIA_TYPES, "INVALID_MEDIA_TYPE");

const iso3166999: Linter = (data, ctx) => {
  if (data === "999") return undefined;
  const err = iso3166(data, ctx);
  return err ? fail("NOT_ISO3166_OR_999", err.position, err.length) : undefined;
};

// --- Single-character and simple-value linters -------------------------------

function oneOf(values: string, error: string): Linter {
  return (data) => {
    if (data.length !== 1) return fail(error, 0, data.length);
    return values.includes(data) ? undefined : fail(error, 0, 1);
  };
}

const yesno = oneOf("01", "NOT_ZERO_OR_ONE");
const winding = oneOf("019", "INVALID_WINDING_DIRECTION");
const iso5218 = oneOf("0129", "INVALID_BIOLOGICAL_SEX_CODE");

const IMPORTER_INDEX = new Set("-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz");
const importeridx: Linter = (data) => {
  if (data.length !== 1) return fail("IMPORTER_IDX_MUST_BE_ONE_CHARACTER", 0, data.length);
  return IMPORTER_INDEX.has(data) ? undefined : fail("INVALID_IMPORT_IDX_CHARACTER", 0, 1);
};

const hyphen: Linter = (data) => {
  if (data.length === 0) return fail("NOT_HYPHEN", 0, 0);
  return /^-+$/.test(data) ? undefined : fail("NOT_HYPHEN", 0, data.length);
};

const zero: Linter = (data) => {
  if (data.length === 0) return fail("NOT_ZERO", 0, 0);
  return /^0+$/.test(data) ? undefined : fail("NOT_ZERO", 0, data.length);
};

const nonzero: Linter = (data) => {
  const i = firstNonDigit(data);
  if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
  return /[1-9]/.test(data) ? undefined : fail("ILLEGAL_ZERO_VALUE", 0, data.length);
};

const nozeroprefix: Linter = (data) => {
  if (data.startsWith("0")) return fail("ILLEGAL_ZERO_PREFIX", 0, 1);
  const i = firstNonDigit(data);
  return i >= 0 ? fail("NON_DIGIT_CHARACTER", i, 1) : undefined;
};

const hasnondigit: Linter = (data) =>
  firstNonDigit(data) >= 0 ? undefined : fail("REQUIRES_NON_DIGIT_CHARACTER", 0, data.length);

const pcenc: Linter = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "%") continue;
    if (i + 2 >= data.length) return fail("INVALID_PERCENT_SEQUENCE", i, data.length - i);
    if (!/^[0-9A-Fa-f]{2}$/.test(data.slice(i + 1, i + 3))) {
      return fail("INVALID_PERCENT_SEQUENCE", i, 3);
    }
    i += 2;
  }
  return undefined;
};

function boundedDigits(error: string, max: number): Linter {
  return (data) => {
    if (data.length !== 10) return fail(`${error}_INVALID_LENGTH`, 0, data.length);
    const i = firstNonDigit(data);
    if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
    return Number(data) > max ? fail(`INVALID_${error}`, 0, 10) : undefined;
  };
}

const latitude = boundedDigits("LATITUDE", 1800000000);
const longitude = boundedDigits("LONGITUDE", 3600000000);

const pieceoftotal: Linter = (data) => {
  const i = firstNonDigit(data);
  if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
  const n = data.length;
  if (n === 0 || n % 2 !== 0) return fail("INVALID_LENGTH_FOR_PIECE_OF_TOTAL", 0, n);
  const piece = data.slice(0, n / 2);
  const total = data.slice(n / 2);
  if (/^0+$/.test(piece)) return fail("ZERO_PIECE_NUMBER", 0, n / 2);
  if (/^0+$/.test(total)) return fail("ZERO_TOTAL_PIECES", n / 2, n / 2);
  return piece > total ? fail("PIECE_NUMBER_EXCEEDS_TOTAL", 0, n) : undefined;
};

const posinseqslash: Linter = (data) => {
  const m = /^([0-9]+)\/([0-9]+)$/.exec(data);
  if (!m) return fail("POSITION_IN_SEQUENCE_MALFORMED", 0, data.length);
  const pos = m[1] as string;
  const end = m[2] as string;
  if (pos.startsWith("0")) return fail("ILLEGAL_ZERO_PREFIX", 0, pos.length);
  if (end.startsWith("0")) return fail("ILLEGAL_ZERO_PREFIX", pos.length + 1, end.length);
  // Neither has a zero prefix, so comparing length then lexically is numeric.
  if (pos.length > end.length || (pos.length === end.length && pos > end)) {
    return fail("POSITION_EXCEEDS_END", 0, data.length);
  }
  return undefined;
};

const IBAN_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** IBAN (ISO 13616) linter: country code, length and mod-97 checksum. */
const iban: Linter = (data, ctx) => {
  const n = data.length;
  if (n < 4) return fail("IBAN_TOO_SHORT", 0, n);
  if (iso3166alpha2(data.slice(0, 2), ctx)) return fail("ILLEGAL_IBAN_COUNTRY_CODE", 0, 2);
  if (n > 34) return fail("IBAN_TOO_LONG", 0, n);
  if (n <= 10) return fail("IBAN_TOO_SHORT", 0, n);
  let csum = 0;
  for (let p = 4; p < n + 4; p++) {
    const at = p < n ? p : p - n;
    const v = IBAN_CHARS.indexOf(data[at] as string);
    if (v < 0) return fail("INVALID_IBAN_CHARACTER", at, 1);
    csum = (csum * (v < 10 ? 10 : 100) + v) % 97;
  }
  return csum === 1 ? undefined : fail("INCORRECT_IBAN_CHECKSUM", 2, 2);
};

// --- North American coupon codes (AIs 8110, 8112) ----------------------------

/** Cursor over all-digit coupon data, mirroring the reference implementation's p/q pointers. */
class CouponCursor {
  p = 0;
  constructor(readonly data: string) {}
  get q(): number {
    return this.data.length;
  }
  get atEnd(): boolean {
    return this.p === this.q;
  }
  c(): string {
    return this.data[this.p] as string;
  }
  /** Error for "missing" fields: whole data when at end. */
  missing(error: string): LintError {
    return fail(error, 0, this.q);
  }
  /** Error for a single invalid character at the cursor. */
  invalid(error: string): LintError {
    return fail(error, this.p, 1);
  }
  /** Error for a field shorter than required, after the cursor has advanced. */
  truncated(error: string): LintError {
    return this.atEnd ? fail(error, 0, this.q) : fail(error, this.p, this.q - this.p);
  }
}

const couponposoffer: Linter = (data) => {
  const i = firstNonDigit(data);
  if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
  const k = new CouponCursor(data);
  if (k.atEnd) return k.missing("COUPON_MISSING_FORMAT_CODE");
  if (k.c() !== "0" && k.c() !== "1") return k.invalid("COUPON_INVALID_FORMAT_CODE");
  k.p++;
  if (k.atEnd) return k.missing("COUPON_MISSING_FUNDER_VLI");
  if (k.c() > "6") return k.invalid("COUPON_INVALID_FUNDER_LENGTH");
  let vli = Number(k.c()) + 6;
  k.p++;
  if (k.q - k.p < vli) return k.truncated("COUPON_TRUNCATED_FUNDER");
  k.p += vli;
  if (k.q - k.p < 6) return k.truncated("COUPON_TRUNCATED_OFFER_CODE");
  k.p += 6;
  if (k.atEnd) return k.missing("COUPON_MISSING_SERIAL_NUMBER_VLI");
  vli = Number(k.c()) + 6;
  k.p++;
  if (k.q - k.p < vli) return k.truncated("COUPON_TRUNCATED_SERIAL_NUMBER");
  k.p += vli;
  if (!k.atEnd) return fail("COUPON_EXCESS_DATA", k.p, k.q - k.p);
  return undefined;
};

const couponcode: Linter = (data, ctx) => {
  const i = firstNonDigit(data);
  if (i >= 0) return fail("NON_DIGIT_CHARACTER", i, 1);
  const k = new CouponCursor(data);

  const gcp = (len: number): LintError | undefined => {
    const err = gcppos1(data.slice(k.p, k.p + len), ctx);
    return err ? fail(err.error, k.p, len) : undefined;
  };

  // Primary GS1 Company Prefix
  if (k.atEnd) return k.missing("COUPON_MISSING_GCP_VLI");
  if (k.c() > "6") return k.invalid("COUPON_INVALID_GCP_LENGTH");
  let vli = Number(k.c()) + 6;
  k.p++;
  if (k.q - k.p < vli) return k.truncated("COUPON_TRUNCATED_GCP");
  let err = gcp(vli);
  if (err) return err;
  k.p += vli;

  // Offer code
  if (k.q - k.p < 6) return k.truncated("COUPON_TRUNCATED_OFFER_CODE");
  k.p += 6;

  // Save value
  if (k.atEnd) return k.missing("COUPON_MISSING_SAVE_VALUE_VLI");
  if (k.c() < "1" || k.c() > "5") return k.invalid("COUPON_INVALID_SAVE_VALUE_LENGTH");
  vli = Number(k.c());
  k.p++;
  if (k.q - k.p < vli) return k.truncated("COUPON_TRUNCATED_SAVE_VALUE");
  k.p += vli;

  // Purchase requirement (1st, 2nd, 3rd share a layout)
  const requirement = (nth: string): LintError | undefined => {
    if (k.atEnd) return k.missing(`COUPON_MISSING_${nth}_PURCHASE_REQUIREMENT_VLI`);
    if (k.c() < "1" || k.c() > "5")
      return k.invalid(`COUPON_INVALID_${nth}_PURCHASE_REQUIREMENT_LENGTH`);
    const len = Number(k.c());
    k.p++;
    if (k.q - k.p < len) return k.truncated(`COUPON_TRUNCATED_${nth}_PURCHASE_REQUIREMENT`);
    k.p += len;
    if (k.atEnd) return k.missing(`COUPON_MISSING_${nth}_PURCHASE_REQUIREMENT_CODE`);
    if (k.c() > "4" && k.c() !== "9")
      return k.invalid(`COUPON_INVALID_${nth}_PURCHASE_REQUIREMENT_CODE`);
    k.p++;
    if (k.q - k.p < 3) return k.truncated(`COUPON_TRUNCATED_${nth}_PURCHASE_FAMILY_CODE`);
    k.p += 3;
    return undefined;
  };

  const additionalGcp = (nth: string): LintError | undefined => {
    if (k.atEnd) return k.missing(`COUPON_MISSING_${nth}_PURCHASE_GCP_VLI`);
    if (k.c() > "6" && k.c() !== "9") return k.invalid(`COUPON_INVALID_${nth}_PURCHASE_GCP_LENGTH`);
    const len = k.c() !== "9" ? Number(k.c()) + 6 : 0;
    k.p++;
    if (k.q - k.p < len) return k.truncated(`COUPON_TRUNCATED_${nth}_PURCHASE_GCP`);
    if (len > 0) {
      const e = gcp(len);
      if (e) return e;
      k.p += len;
    }
    return undefined;
  };

  err = requirement("1ST");
  if (err) return err;

  // Optional field 1: second qualifying purchase
  if (!k.atEnd && k.c() === "1") {
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_ADDITIONAL_PURCHASE_RULES_CODE");
    if (k.c() > "3") return k.invalid("COUPON_INVALID_ADDITIONAL_PURCHASE_RULES_CODE");
    k.p++;
    err = requirement("2ND") ?? additionalGcp("2ND");
    if (err) return err;
  }

  // Optional field 2: third qualifying purchase
  if (!k.atEnd && k.c() === "2") {
    k.p++;
    err = requirement("3RD") ?? additionalGcp("3RD");
    if (err) return err;
  }

  // Optional field 3: expiration date
  let expiry: string | undefined;
  if (!k.atEnd && k.c() === "3") {
    k.p++;
    if (k.q - k.p < 6) return k.truncated("COUPON_TOO_SHORT_FOR_EXPIRATION_DATE");
    expiry = data.slice(k.p, k.p + 6);
    if (yymmdd(expiry, ctx)) return fail("COUPON_INVALID_EXIPIRATION_DATE", k.p, 6);
    k.p += 6;
  }

  // Optional field 4: start date
  if (!k.atEnd && k.c() === "4") {
    k.p++;
    if (k.q - k.p < 6) return k.truncated("COUPON_TOO_SHORT_FOR_START_DATE");
    const start = data.slice(k.p, k.p + 6);
    if (yymmdd(start, ctx)) return fail("COUPON_INVALID_START_DATE", k.p, 6);
    if (expiry !== undefined && start > expiry) {
      return fail("COUPON_EXPIRATION_BEFORE_START", k.p - 8, 14);
    }
    k.p += 6;
  }

  // Optional field 5: serial number
  if (!k.atEnd && k.c() === "5") {
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_SERIAL_NUMBER_VLI");
    vli = Number(k.c()) + 6;
    k.p++;
    if (k.q - k.p < vli) return k.truncated("COUPON_TRUNCATED_SERIAL_NUMBER");
    k.p += vli;
  }

  // Optional field 6: retailer GCP or GLN
  if (!k.atEnd && k.c() === "6") {
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_RETAILER_GCP_OR_GLN_VLI");
    if (k.c() < "1" || k.c() > "7") return k.invalid("COUPON_INVALID_RETAILER_GCP_OR_GLN_LENGTH");
    vli = Number(k.c()) + 6;
    k.p++;
    if (k.q - k.p < vli) return k.truncated("COUPON_TRUNCATED_RETAILER_GCP_OR_GLN");
    err = gcp(vli);
    if (err) return err;
    k.p += vli;
  }

  // Optional field 9: miscellaneous
  if (!k.atEnd && k.c() === "9") {
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_SAVE_VALUE_CODE");
    if (!"01256".includes(k.c())) return k.invalid("COUPON_INVALID_SAVE_VALUE_CODE");
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_SAVE_VALUE_APPLIES_TO_ITEM");
    if (k.c() > "2") return k.invalid("COUPON_INVALID_SAVE_VALUE_APPLIES_TO_ITEM");
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_STORE_COUPON_FLAG");
    k.p++;
    if (k.atEnd) return k.missing("COUPON_MISSING_DONT_MULTIPLY_FLAG");
    if (k.c() !== "0" && k.c() !== "1") return k.invalid("COUPON_INVALID_DONT_MULTIPLY_FLAG");
    k.p++;
  }

  if (!k.atEnd) return fail("COUPON_EXCESS_DATA", k.p, k.q - k.p);
  return undefined;
};

/** @internal Character-set linters keyed by component type. */
export const CSET_LINTERS: Readonly<Record<"N" | "X" | "Y" | "Z", Linter>> = {
  N: csetnumeric,
  X: cset82,
  Y: cset39,
  Z: cset64,
};

/** @internal Content linters keyed by the names used in the GS1 Barcode Syntax Dictionary. */
export const LINTERS: Readonly<Record<string, Linter>> = {
  couponcode,
  couponposoffer,
  csum,
  csumalpha,
  gcppos1,
  gcppos2,
  hasnondigit,
  hh,
  hhmi,
  hyphen,
  iban,
  importeridx,
  iso3166,
  iso3166999,
  iso3166alpha2,
  iso4217,
  iso5218,
  latitude,
  longitude,
  mediatype,
  mi,
  nonzero,
  nozeroprefix,
  packagetype,
  pcenc,
  pieceoftotal,
  posinseqslash,
  ss,
  winding,
  yesno,
  yymmd0,
  yymmdd,
  yyyymmd0,
  yyyymmdd,
  zero,
};

/** Plain-English descriptions of linter errors. Unlisted names fall back to the name itself. */
const LINTER_MESSAGES: Readonly<Record<string, string>> = {
  NON_DIGIT_CHARACTER: "contains a non-digit character",
  INVALID_CSET82_CHARACTER: "contains a character outside the GS1 82-character set",
  INVALID_CSET39_CHARACTER: "contains a character outside the GS1 39-character set",
  INVALID_CSET64_CHARACTER: "contains a character outside the GS1 64-character set",
  INVALID_CSET64_PADDING: "has invalid base64 padding",
  TOO_SHORT_FOR_CHECK_DIGIT: "is too short to contain a check digit",
  INCORRECT_CHECK_DIGIT: "has an incorrect check digit",
  TOO_SHORT_FOR_CHECK_PAIR: "is too short to contain a check character pair",
  TOO_LONG_FOR_CHECK_PAIR_IMPLEMENTATION: "is too long to compute a check character pair",
  INCORRECT_CHECK_PAIR: "has an incorrect check character pair",
  TOO_SHORT_FOR_GCP: "is too short to contain a GS1 Company Prefix",
  INVALID_GCP_PREFIX: "does not start with a valid GS1 Company Prefix",
  DATE_TOO_SHORT: "is too short for a date",
  DATE_TOO_LONG: "is too long for a date",
  ILLEGAL_MONTH: "has an invalid month",
  ILLEGAL_DAY: "has an invalid day",
  HOUR_TOO_SHORT: "is too short for an hour",
  HOUR_TOO_LONG: "is too long for an hour",
  ILLEGAL_HOUR: "has an invalid hour",
  MINUTE_TOO_SHORT: "is too short for minutes",
  MINUTE_TOO_LONG: "is too long for minutes",
  ILLEGAL_MINUTE: "has invalid minutes",
  SECOND_TOO_SHORT: "is too short for seconds",
  SECOND_TOO_LONG: "is too long for seconds",
  ILLEGAL_SECOND: "has invalid seconds",
  HOUR_WITH_MINUTE_TOO_SHORT: "is too short for a time (HHMM)",
  HOUR_WITH_MINUTE_TOO_LONG: "is too long for a time (HHMM)",
  NOT_ISO3166: "is not an ISO 3166 numeric country code",
  NOT_ISO3166_OR_999: 'is not an ISO 3166 numeric country code or "999"',
  NOT_ISO3166_ALPHA2: "is not an ISO 3166 alpha-2 country code",
  NOT_ISO4217: "is not an ISO 4217 numeric currency code",
  INVALID_PACKAGE_TYPE: "is not a valid package type code",
  INVALID_MEDIA_TYPE: "is not a valid AIDC media type",
  NOT_ZERO_OR_ONE: 'must be "0" or "1"',
  INVALID_WINDING_DIRECTION: 'must be "0", "1" or "9"',
  INVALID_BIOLOGICAL_SEX_CODE: 'must be "0", "1", "2" or "9"',
  IMPORTER_IDX_MUST_BE_ONE_CHARACTER: "importer index must be one character",
  INVALID_IMPORT_IDX_CHARACTER: "has an invalid importer index character",
  NOT_HYPHEN: 'must be "-"',
  NOT_ZERO: "must be zero",
  ILLEGAL_ZERO_VALUE: "must not be zero",
  ILLEGAL_ZERO_PREFIX: "must not start with zero",
  REQUIRES_NON_DIGIT_CHARACTER: "must contain at least one non-digit character",
  INVALID_PERCENT_SEQUENCE: "has an invalid percent-encoded sequence",
  LATITUDE_INVALID_LENGTH: "latitude must be 10 digits",
  INVALID_LATITUDE: "latitude is out of range",
  LONGITUDE_INVALID_LENGTH: "longitude must be 10 digits",
  INVALID_LONGITUDE: "longitude is out of range",
  INVALID_LENGTH_FOR_PIECE_OF_TOTAL: "piece/total must have an even, non-zero length",
  ZERO_PIECE_NUMBER: "piece number must not be zero",
  ZERO_TOTAL_PIECES: "total pieces must not be zero",
  PIECE_NUMBER_EXCEEDS_TOTAL: "piece number exceeds total pieces",
  POSITION_IN_SEQUENCE_MALFORMED: 'must be "position/total"',
  POSITION_EXCEEDS_END: "position exceeds total",
  IBAN_TOO_SHORT: "IBAN is too short",
  IBAN_TOO_LONG: "IBAN is too long",
  ILLEGAL_IBAN_COUNTRY_CODE: "IBAN has an invalid country code",
  INVALID_IBAN_CHARACTER: "IBAN contains an invalid character",
  INCORRECT_IBAN_CHECKSUM: "IBAN has an incorrect checksum",
};

/** @internal */
export function describeLintError(error: string): string {
  return LINTER_MESSAGES[error] ?? `failed check ${error}`;
}
