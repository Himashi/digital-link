// EPC binary strings: the worked examples of GS1 Digital Link URI:
// Compression Technical Standard for EPC binary strings 1.0.0 (Jul 2025)
// §4.2, plus error handling.

import { describe, expect, it } from "vitest";
import { decodeEpc, decompressEpcUri, isEpcCompressedUri } from "../src/index.js";

const SGTIN = [
  { ai: "01", value: "09528765123457" },
  { ai: "21", value: "123456789123" },
];

describe("EPCB §4.2 worked examples", () => {
  it("decodes the SGTIN-96 binary string", () => {
    expect(decodeEpc("30164596f40c0e5cbe991a83")).toEqual({
      valid: true,
      value: { scheme: "SGTIN-96", filter: 0, elements: SGTIN },
    });
  });

  it("§4.2.1 option A: hexadecimal after 'eh'", () => {
    expect(decompressEpcUri("https://example.com/eh30164596f40c0e5cbe991a83")).toEqual({
      valid: true,
      value: "https://example.com/01/09528765123457/21/123456789123",
    });
  });

  it("§4.2.2 option B: URI-safe base 64 after 'ex'", () => {
    expect(decompressEpcUri("https://example.com/exMBZFlvQMDly-mRqD")).toEqual({
      valid: true,
      value: "https://example.com/01/09528765123457/21/123456789123",
    });
  });
});

describe("decompressEpcUri", () => {
  it("keeps a custom stem, the query string and the fragment", () => {
    const r = decompressEpcUri(
      "https://id.brand.example/x/y/eh30164596f40c0e5cbe991a83?linkType=all#f",
    );
    expect(r).toEqual({
      valid: true,
      value: "https://id.brand.example/x/y/01/09528765123457/21/123456789123?linkType=all#f",
    });
  });

  it("rejects a URI that is not EPC-compressed", () => {
    const r = decompressEpcUri("https://example.com/01/09528765123457");
    expect(r.valid).toBe(false);
    expect(isEpcCompressedUri("https://example.com/01/09528765123457")).toBe(false);
    expect(isEpcCompressedUri("https://example.com/exMBZFlvQMDly-mRqD")).toBe(true);
  });

  it.each([
    ["https://example.com/ehzz", "EPC_INVALID_ENCODING"],
    ["https://example.com/eh", "EPC_INVALID_ENCODING"],
    ["https://example.com/ex+/", "EPC_INVALID_ENCODING"],
    ["https://example.com/ehff164596f40c0e5cbe991a83", "EPC_UNKNOWN_SCHEME"],
    // GID-96 header: not a GS1 key
    ["https://example.com/eh35164596f40c0e5cbe991a83", "EPC_NOT_GS1_KEY"],
    // SGTIN-96 cut short
    ["https://example.com/eh30164596f40c", "EPC_MALFORMED"],
    // SGTIN-96 with non-zero bits after the 96
    ["https://example.com/eh30164596f40c0e5cbe991a8301", "EPC_MALFORMED"],
  ])("%s → %s", (uri, code) => {
    const r = decompressEpcUri(uri);
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.code).toBe(code);
  });

  it("accepts upper-case hexadecimal and trailing zero padding", () => {
    expect(decompressEpcUri("https://example.com/eh30164596F40C0E5CBE991A830000").valid).toBe(true);
  });
});

// Hand-built binary strings for the error paths no reference vector reaches.

const bin = (n: number | bigint, width: number): string => n.toString(2).padStart(width, "0");
const bcd = (digits: string): string => [...digits].map((d) => bin(Number(d), 4)).join("");
const toHex = (bits: string): string => {
  const padded = bits.padEnd(Math.ceil(bits.length / 4) * 4, "0");
  let out = "";
  for (let i = 0; i < padded.length; i += 4)
    out += parseInt(padded.slice(i, i + 4), 2).toString(16);
  return out;
};
/** TDS 2.2 §14.5.6 numeric: indicator 000, 5-bit length, then the value in binary. */
const alnumNumeric = (digits: string): string =>
  "000" +
  bin(digits.length, 5) +
  (digits === ""
    ? ""
    : bin(BigInt(digits), (10n ** BigInt(digits.length) - 1n).toString(2).length));

/** SGTIN+ with GTIN 09528765123457, serial "1", and `plus` as its +AIDC data. */
const sgtinPlus = (plus?: string): string =>
  toHex(
    "11110111" +
      (plus === undefined ? "0" : "1") +
      "000" +
      bcd("09528765123457") +
      alnumNumeric("1") +
      (plus ?? ""),
  );

const code = (hex: string): string | undefined => {
  const r = decodeEpc(hex);
  return r.valid ? undefined : r.issues[0]?.code;
};

describe("decodeEpc", () => {
  it("decodes SGTIN+ with and without +AIDC data", () => {
    expect(decodeEpc(sgtinPlus())).toEqual({
      valid: true,
      value: {
        scheme: "SGTIN+",
        filter: 0,
        elements: [
          { ai: "01", value: "09528765123457" },
          { ai: "21", value: "1" },
        ],
      },
    });
    const withExpiry = decodeEpc(sgtinPlus(bcd("17") + bin(27, 7) + bin(12, 4) + bin(31, 5)));
    expect(withExpiry.valid && withExpiry.value.elements.at(-1)).toEqual({
      ai: "17",
      value: "271231",
    });
  });

  it("reads binary and base64url input", () => {
    const hex = "30164596f40c0e5cbe991a83";
    const bits = [...hex].map((c) => bin(parseInt(c, 16), 4)).join("");
    expect(decodeEpc(bits, "binary")).toEqual(decodeEpc(hex));
    expect(decodeEpc("MBZFlvQMDly-mRqD", "base64url")).toEqual(decodeEpc(hex));
    expect(code("01x")).toBe("EPC_INVALID_ENCODING");
    expect(decodeEpc("012", "binary").valid).toBe(false);
  });

  it("decodes delimited numeric values (§14.5.5)", () => {
    const ok = decodeEpc(sgtinPlus(bcd("8004") + bcd("123") + "1111"));
    expect(ok.valid && ok.value.elements.at(-1)).toEqual({ ai: "8004", value: "123" });
    const mixed = decodeEpc(sgtinPlus(bcd("8004") + bcd("12") + "1110" + alnumNumeric("34")));
    expect(mixed.valid && mixed.value.elements.at(-1)).toEqual({ ai: "8004", value: "1234" });
    expect(code(sgtinPlus(bcd("8004") + bcd("1") + "1010"))).toBe("EPC_MALFORMED");
  });

  it.each([
    [
      "field out of range (SGTIN-96 item reference 15, max 9)",
      toHex("00110000" + "000" + "000" + bin(0, 40) + bin(15, 4) + bin(1, 38)),
    ],
    [
      "value longer than its maximum",
      toHex("11110111" + "0000" + bcd("09528765123457") + "000" + bin(21, 5)),
    ],
    [
      "unknown encoding indicator",
      toHex("11110111" + "0000" + bcd("09528765123457") + "110" + bin(1, 5)),
    ],
    ["fixed-length numeric too long (AI 20 = 127)", sgtinPlus(bcd("20") + bin(127, 7))],
    [
      "non-digit in a GTIN",
      toHex("11110111" + "0000" + "1010" + bcd("9528765123457") + alnumNumeric("1")),
    ],
    ["non-digit in an AI header", sgtinPlus("1010" + bcd("0") + bcd("00"))],
    ["control character in 7-bit text", sgtinPlus(bcd("10") + "100" + bin(1, 5) + bin(1, 7))],
    ["invalid URN Code 40 value", sgtinPlus(bcd("10") + "101" + bin(3, 5) + bin(0, 16))],
    [
      "data after the padding of a legacy text field (SGTIN-198 serial)",
      toHex(
        "00110110" +
          "000" +
          "000" +
          bin(0, 40) +
          bin(0, 4) +
          bin(65, 7) +
          bin(0, 7) +
          bin(66, 7) +
          "0".repeat(119),
      ),
    ],
    ["unknown AI header", sgtinPlus(bcd("99"))],
    [
      "data after +AIDC padding",
      sgtinPlus(bcd("17") + bin(27, 7) + bin(12, 4) + bin(31, 5) + "00000000001"),
    ],
    ["year over 99", sgtinPlus(bcd("17") + bin(127, 7) + bin(12, 4) + bin(31, 5))],
  ])("%s → EPC_MALFORMED", (_name, hex) => {
    expect(code(hex)).toBe("EPC_MALFORMED");
  });

  it("decodes variable-precision date-times (§14.5.11) as GS1's reference translator does", () => {
    // Precision 10: YYMMDDhhmmss. Indicators per demo/TDTtranslator.js.
    const r = decodeEpc(
      sgtinPlus(
        bcd("8008") +
          "10" +
          bin(27, 7) +
          bin(12, 4) +
          bin(31, 5) +
          bin(23, 5) +
          bin(59, 6) +
          bin(58, 6),
      ),
    );
    expect(r.valid && r.value.elements.at(-1)).toEqual({ ai: "8008", value: "271231235958" });
  });

  it("decodes an empty numeric value", () => {
    const r = decodeEpc(toHex("11110111" + "0000" + bcd("09528765123457") + alnumNumeric("")));
    expect(r.valid && r.value.elements.at(-1)).toEqual({ ai: "21", value: "" });
  });

  it("reports AI 7258 (§14.5.15) as unsupported", () => {
    expect(code(sgtinPlus(bcd("7258") + bin(0, 8)))).toBe("EPC_UNSUPPORTED");
  });
});

describe("decompressEpcUri with invalid AI data", () => {
  it("returns the build issues", () => {
    // Valid EPC, but expiry month 13 is not a valid AI (17) value.
    const hex = sgtinPlus(bcd("17") + bin(27, 7) + bin(13, 4) + bin(31, 5));
    expect(decodeEpc(hex).valid).toBe(true);
    const r = decompressEpcUri(`https://example.com/eh${hex}`);
    expect(r.valid).toBe(false);
  });

  it("appends the request's query string to the decoded one", () => {
    const hex = sgtinPlus(bcd("17") + bin(27, 7) + bin(12, 4) + bin(31, 5));
    expect(
      decompressEpcUri(`https://example.com/eh${hex}?linkType=gs1:pip`, { currentYear: 2026 }),
    ).toEqual({
      valid: true,
      value: "https://example.com/01/09528765123457/21/1?17=271231&linkType=gs1:pip",
    });
  });

  it("passes currentYear on", () => {
    const hex = sgtinPlus(bcd("17") + bin(27, 7) + bin(12, 4) + bin(31, 5));
    expect(decompressEpcUri(`https://example.com/eh${hex}`, { currentYear: 2026 })).toEqual({
      valid: true,
      value: "https://example.com/01/09528765123457/21/1?17=271231",
    });
  });
});
