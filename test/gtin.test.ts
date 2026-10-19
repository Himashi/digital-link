import { describe, expect, it } from "vitest";
import { DigitalLinkError, gs1CheckDigit, normaliseGtin, validateGtin } from "../src/index.js";

describe("gs1CheckDigit", () => {
  it.each([
    ["952012345678", "8"], // GTIN-13 9520123456788
    ["0952012345678", "8"], // same, as GTIN-14
    ["0234567", "3"], // GTIN-8 02345673
    ["41600033610", "8"], // GTIN-12 416000336108
    ["1234567890123", "1"],
    ["00614141123456789", "0"], // SSCC 006141411234567890
  ])("%s → %s", (digits, check) => {
    expect(gs1CheckDigit(digits)).toBe(check);
  });

  it("throws on non-digits", () => {
    expect(() => gs1CheckDigit("12A")).toThrow(DigitalLinkError);
    expect(() => gs1CheckDigit("")).toThrow(DigitalLinkError);
  });
});

describe("normaliseGtin", () => {
  it.each([
    ["02345673", "00000002345673"], // GTIN-8
    ["416000336108", "00416000336108"], // GTIN-12 (UPC-A)
    ["9520123456788", "09520123456788"], // GTIN-13 (EAN-13)
    ["09520123456788", "09520123456788"], // GTIN-14
    ["19520123456785", "19520123456785"], // GTIN-14 with indicator digit
    [" 9520123456788 ", "09520123456788"], // surrounding whitespace trimmed
  ])("%s → %s", (input, expected) => {
    expect(normaliseGtin(input)).toBe(expected);
  });

  it("rejects a bad check digit with the expected digit in the message", () => {
    expect(() => normaliseGtin("9520123456789")).toThrow(/expected 8, found 9/);
  });

  it.each(["123", "1234567", "12345678901", "123456789012345", ""])(
    "rejects length %j",
    (input) => {
      const r = validateGtin(input);
      expect(r.valid).toBe(false);
      if (!r.valid) expect(r.issues[0]?.code).toBe("GTIN_INVALID");
    },
  );

  it("rejects non-digits", () => {
    const r = validateGtin("95201234567A8");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.message).toMatch(/only digits/);
  });

  it("returns issues on the thrown error", () => {
    try {
      normaliseGtin("12");
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(DigitalLinkError);
      expect((e as DigitalLinkError).issues[0]?.code).toBe("GTIN_INVALID");
      expect((e as DigitalLinkError).name).toBe("DigitalLinkError");
    }
  });
});
