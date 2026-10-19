import { describe, expect, it } from "vitest";
import {
  GS,
  formatElementString,
  parseElementString,
  validateElementString,
  type Element,
} from "../src/index.js";

const o = { currentYear: 2026 };
const codes = (input: string) => {
  const r = validateElementString(input, o);
  return r.valid ? [] : r.issues.map((i) => i.code);
};

describe("parseElementString: raw scanner data", () => {
  const expected: Element[] = [
    { ai: "01", value: "09520123456788" },
    { ai: "10", value: "ABC123" },
    { ai: "17", value: "271231" },
  ];

  it("splits fixed-length AIs without separators and variable ones at GS", () => {
    expect(parseElementString(`0109520123456788` + `10ABC123${GS}` + `17271231`, o)).toEqual(
      expected,
    );
  });

  it("accepts a leading FNC1 (GS)", () => {
    expect(parseElementString(`${GS}010952012345678810ABC123${GS}17271231`, o)).toEqual(expected);
  });

  it.each(["]Q3", "]d2", "]C1", "]e0", "]J1"])("strips GS1 symbology identifier %s", (id) => {
    expect(parseElementString(`${id}010952012345678810ABC123${GS}17271231`, o)).toEqual(expected);
  });

  it("rejects a non-GS1 symbology identifier", () => {
    expect(codes("]Q1010952012345678810ABC123")).toEqual(["ELEMENT_STRING_MALFORMED"]);
  });

  it("tolerates GS after a fixed-length AI", () => {
    expect(parseElementString(`0109520123456788${GS}10ABC123`, o)).toEqual(expected.slice(0, 2));
  });

  it("reports a variable-length value that runs on (missing GS)", () => {
    // Without GS after the batch, "17271231" is read as part of AI (10) and
    // the value exceeds 20 characters.
    expect(codes(`010952012345678810ABC1234567890123456789017271231`)).toEqual([
      "ELEMENT_STRING_VALUE_TOO_LONG",
    ]);
  });

  it("reports truncated fixed-length values", () => {
    expect(codes("01095201234567")).toEqual(["AI_VALUE_TOO_SHORT"]);
  });

  it("reports unknown AIs", () => {
    expect(codes("0109520123456788" + "89ABC")).toEqual(["ELEMENT_STRING_UNKNOWN_AI"]);
  });

  it("reports empty input", () => {
    expect(codes("")).toEqual(["ELEMENT_STRING_EMPTY"]);
    expect(codes(GS)).toEqual(["ELEMENT_STRING_EMPTY"]);
  });

  it("validates check digits and dates", () => {
    expect(codes("0109520123456789")).toEqual(["AI_VALUE_INVALID"]);
    expect(codes("010952012345678817271331")).toEqual(["AI_VALUE_INVALID"]);
  });
});

describe("parseElementString: bracketed form", () => {
  it("parses (AI)value pairs", () => {
    expect(parseElementString("(01)09520123456788(10)ABC123(17)271231", o)).toEqual([
      { ai: "01", value: "09520123456788" },
      { ai: "10", value: "ABC123" },
      { ai: "17", value: "271231" },
    ]);
  });

  it('treats "\\(" as a literal bracket in a value', () => {
    expect(parseElementString("(01)09520123456788(10)AB\\(C\\(D(21)X", o)).toEqual([
      { ai: "01", value: "09520123456788" },
      { ai: "10", value: "AB(C(D" },
      { ai: "21", value: "X" },
    ]);
  });

  it("reports malformed brackets and unknown AIs", () => {
    expect(codes("(01")).toEqual(["ELEMENT_STRING_MALFORMED"]);
    expect(codes("(01)09520123456788)(10)A")).toEqual(["AI_VALUE_TOO_LONG"]);
    expect(codes("(89)ABC")).toEqual(["ELEMENT_STRING_UNKNOWN_AI"]);
    expect(codes("(01)")).toEqual(["AI_VALUE_EMPTY"]);
  });
});

describe("repeated AIs", () => {
  it("merges identical repeats (several carriers on one pack)", () => {
    expect(parseElementString("(01)09520123456788(10)A(01)09520123456788", o)).toEqual([
      { ai: "01", value: "09520123456788" },
      { ai: "10", value: "A" },
    ]);
  });
  it("rejects repeats with different values", () => {
    expect(codes("(01)09520123456788(01)19520123456785")).toEqual([
      "ELEMENT_STRING_REPEATED_AI_DIFFERENT_VALUE",
    ]);
  });
});

describe("AI relationships (GS1 General Specifications §4.13)", () => {
  it("requires mandatory associations", () => {
    const r = validateElementString("(10)ABC123", o);
    expect(r.valid).toBe(false);
    if (!r.valid) {
      expect(r.issues[0]?.code).toBe("AI_REQUIRES_ASSOCIATION");
      expect(r.issues[0]?.message).toMatch(/\(01\) or \(02\)/);
    }
  });

  it("supports grouped requirements such as (01)+(21)", () => {
    // (8030) digital signature requires a serialised key such as (01)+(21)
    expect(codes("(01)09520123456788(8030)ABCD")).toContain("AI_REQUIRES_ASSOCIATION");
    expect(codes("(01)09520123456788(21)1(8030)ABCD")).toEqual([]);
  });

  it("rejects invalid pairs", () => {
    // (01) and (02) must not be used together
    expect(codes("(01)09520123456788(02)09520123456788(37)1")).toContain("AI_INVALID_PAIR");
  });

  it("matches pattern templates such as 31nn without matching an AI to itself", () => {
    // (310n) net weight variants must not be combined with each other.
    expect(codes("(01)09520123456788(3103)000195(3102)001950")).toContain("AI_INVALID_PAIR");
    expect(codes("(01)09520123456788(3103)000195")).toEqual([]);
  });

  it("requires the serial component of (253), (255), (8003) with (8030)", () => {
    expect(codes("(253)9520123456788(8030)ABCD")).toEqual(["AI_DIGSIG_REQUIRES_SERIAL"]);
    expect(codes("(253)9520123456788X(8030)ABCD")).toEqual([]);
  });
});

describe("formatElementString", () => {
  const els: Element[] = [
    { ai: "01", value: "09520123456788" },
    { ai: "10", value: "AB(C" },
    { ai: "17", value: "271231" },
    { ai: "21", value: "S1" },
  ];
  it("writes bracketed form with escaped brackets", () => {
    expect(formatElementString(els)).toBe("(01)09520123456788(10)AB\\(C(17)271231(21)S1");
  });
  it("writes raw form with GS only after non-final variable-length values", () => {
    expect(formatElementString(els, "raw")).toBe(
      `0109520123456788` + `10AB(C${GS}` + `17271231` + `21S1`,
    );
  });
  it("round-trips", () => {
    const raw = `0109520123456788` + `10ABC${GS}` + `17271231` + `21S1`;
    expect(formatElementString(parseElementString(raw, o), "raw")).toBe(raw);
    const br = "(01)09520123456788(10)ABC(17)271231(21)S1";
    expect(formatElementString(parseElementString(br, o))).toBe(br);
  });
});
