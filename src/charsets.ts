// Character sets from GS1 General Specifications §7.11 (Figures 7.11-1 to
// 7.11-3), as also enumerated in GS1 Digital Link URI Syntax §4.2.

/** GS1 AI encodable character set 82. */
export const CSET82 = `!"%&'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`;

/** GS1 AI encodable character set 39. */
export const CSET39 = "#-/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** GS1 AI encodable character set 64 (excluding the "=" padding character). */
export const CSET64 = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

const set = (chars: string): ReadonlySet<string> => new Set(chars);

/** @internal */
export const CSET82_SET = set(CSET82);
/** @internal */
export const CSET39_SET = set(CSET39);
/** @internal */
export const CSET64_SET = set(CSET64);

/** @internal Characters that need no percent-encoding in a URI path segment or query value. */
export const URI_UNRESERVED = set(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
);

/** @internal Every character that may appear literally in a URI (RFC 3986), plus "%". */
export const URI_CHARACTERS = set(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%",
);

/** @internal URI characters that cannot appear in the host part. */
export const BAD_HOST_CHARACTERS = set("_~?#@!$&'()*+,;=%");

/** @internal */
export const isDigits = (s: string): boolean => /^[0-9]*$/.test(s);
