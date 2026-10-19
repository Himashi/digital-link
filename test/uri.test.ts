import { describe, expect, it } from "vitest";
import {
  CANONICAL_STEM,
  DigitalLinkError,
  SYNTAX_DICTIONARY_RELEASE,
  URI_SYNTAX_VERSION,
  build,
  getAI,
  isDigitalLink,
  listAIs,
  parse,
  toCanonical,
  validate,
  validateElement,
} from "../src/index.js";
import { _internal } from "../src/uri.js";

const o = { currentYear: 2026 };
const codes = (uri: string, opts = {}) => {
  const r = validate(uri, { ...o, ...opts });
  return r.valid ? [] : r.issues.map((i) => i.code);
};

describe("parse", () => {
  it("returns convenience fields for a typical UK pack code", () => {
    const dl = parse("https://id.brand.co.uk/01/05012345678900/10/ABC123?17=271231", o);
    expect(dl).toMatchObject({
      scheme: "https",
      host: "id.brand.co.uk",
      stem: "",
      gtin: "05012345678900",
      batch: "ABC123",
      attributes: { "17": "271231" },
      params: {},
    });
    expect(dl.cpv).toBeUndefined();
    expect(dl.serial).toBeUndefined();
    expect(dl.fragment).toBeUndefined();
  });

  it("returns cpv, serial, params and fragment", () => {
    const dl = parse(
      "http://example.com/01/09520123456788/22/2A/21/S%2F1?linkType=gs1%3Apip&context=a+b#top",
      o,
    );
    expect(dl).toMatchObject({
      scheme: "http",
      cpv: "2A",
      serial: "S/1",
      params: { linkType: "gs1:pip", context: "a b" },
      fragment: "top",
    });
  });

  it("finds a batch carried as a data attribute", () => {
    expect(
      parse("https://a.example/00/006141411234567890?02=09520123456788&37=1&10=B1", o).batch,
    ).toBe("B1");
  });

  it("has no gtin for non-GTIN keys", () => {
    expect(parse("https://example.com/414/9520123456788", o).gtin).toBeUndefined();
  });

  it("accepts ';' as a query separator (§4.11 queryStringDelim)", () => {
    expect(
      parse("https://example.com/01/09520123456788?17=271231;3103=000195", o).attributes,
    ).toEqual({
      "17": "271231",
      "3103": "000195",
    });
  });

  it("keeps a non-AI parameter that decodes to NUL undecoded", () => {
    expect(parse("https://example.com/01/09520123456788?x%00=a%00", o).params).toEqual({
      "x%00": "a%00",
    });
  });

  it("keeps the last value of a repeated non-AI parameter", () => {
    expect(parse("https://example.com/01/09520123456788?linkType=a&linkType=b", o).params).toEqual({
      linkType: "b",
    });
  });

  it("accepts the data attributes added in URI Syntax 1.7.0", () => {
    // (8040) IMEI requires (01)+(21)
    expect(codes("https://example.com/01/09520123456788/21/S1?8040=123456789012345")).toEqual([]);
  });

  it("throws DigitalLinkError with all issues", () => {
    expect(() => parse("https://example.com/01/09520123456789")).toThrow(DigitalLinkError);
    try {
      parse("https://example.com/01/09520123456789");
    } catch (e) {
      expect((e as DigitalLinkError).issues[0]).toMatchObject({
        code: "AI_VALUE_INVALID",
        ai: "01",
        linterError: "INCORRECT_CHECK_DIGIT",
        position: 13,
        length: 1,
      });
      expect((e as DigitalLinkError).message).toBe(
        'AI (01) GTIN: value "09520123456789" has an incorrect check digit (at position 14: "9")',
      );
    }
  });
});

describe("validate: error reporting", () => {
  it("names the illegal character and its position", () => {
    const r = validate("https://example.com/01/09520123456788 x");
    expect(r.valid).toBe(false);
    if (!r.valid)
      expect(r.issues[0]).toMatchObject({ code: "URI_ILLEGAL_CHARACTER", position: 37 });
  });

  it("reports an empty path value", () => {
    expect(codes("https://example.com/01/09520123456788/10//21/X")).toEqual([
      "URI_EMPTY_PATH_VALUE",
    ]);
  });

  it("reports a non-data-attribute AI in the query", () => {
    // (21) serial is a key qualifier only, never a data attribute
    expect(codes("https://example.com/00/006141411234567890?21=X")).toEqual([
      "URI_AI_NOT_DATA_ATTRIBUTE",
    ]);
  });

  it("reports several structural problems at once", () => {
    expect(codes("https://example.com/01/09520123456788/21/S?21=T&8200=x&10=B")).toEqual([
      "URI_DUPLICATE_AI",
      "URI_AI_NOT_DATA_ATTRIBUTE",
      "URI_AI_NOT_DATA_ATTRIBUTE",
      "URI_AI_SHOULD_BE_IN_PATH",
    ]);
  });

  it("reports several value problems at once", () => {
    expect(codes("https://example.com/01/09520123456789?17=271331")).toEqual([
      "AI_VALUE_INVALID",
      "AI_VALUE_INVALID",
    ]);
  });

  it("reports missing mandatory associations", () => {
    // (37) count requires (00) with (02) or (8026)
    expect(codes("https://example.com/00/006141411234567890?37=5")).toEqual([
      "AI_REQUIRES_ASSOCIATION",
    ]);
  });

  it("explains the allowed key-qualifier sequences", () => {
    const r = validate("https://example.com/01/09520123456788/21/X/10/Y");
    expect(r.valid).toBe(false);
    if (!r.valid) {
      expect(r.issues[0]?.message).toContain("allowed: /01/…/22/…/10/…/21/… or /01/…/235/…");
    }
  });

  it("rejects qualifiers on keys that take none", () => {
    expect(codes("https://example.com/00/006141411234567890/10/X")).toEqual([
      "URI_INVALID_KEY_QUALIFIER_SEQUENCE",
    ]);
  });
});

describe("build", () => {
  it("builds the example from the brief", () => {
    expect(
      build(
        { gtin: "5012345678900", batch: "ABC123", attributes: { "17": "271231" } },
        "id.brand.co.uk",
        o,
      ),
    ).toBe("https://id.brand.co.uk/01/05012345678900/10/ABC123?17=271231");
  });

  it("orders qualifiers per the standard and attributes lexically", () => {
    expect(
      build({
        gtin: "09520123456788",
        serial: "S1",
        batch: "B1",
        cpv: "2A",
        attributes: { "3922": "0299", "17": "201225", "3103": "000195" },
      }),
    ).toBe(
      "https://id.gs1.org/01/09520123456788/22/2A/10/B1/21/S1?17=201225&3103=000195&3922=0299",
    );
  });

  it("percent-encodes reserved characters in values (§4.2)", () => {
    expect(build({ gtin: "09520123456788", batch: "A/B%C&D+E:F" }, "example.com")).toBe(
      "https://example.com/01/09520123456788/10/A%2FB%25C%26D%2BE%3AF",
    );
    expect(
      build({
        primaryKey: { ai: "414", value: "9520123456788" },
        qualifiers: [{ ai: "254", value: "32a/b" }],
      }),
    ).toBe("https://id.gs1.org/414/9520123456788/254/32a%2Fb");
    for (const c of `!"%&'()*+,/:;<=>?`) {
      expect(_internal.escape(c, false)).toMatch(/^%[0-9A-F]{2}$/);
    }
  });

  it("round-trips through parse", () => {
    const uri = build(
      { gtin: "09520123456788", batch: "A/B(1)?", attributes: { "17": "271231" } },
      "example.com",
    );
    expect(parse(uri, o)).toMatchObject({
      gtin: "09520123456788",
      batch: "A/B(1)?",
      attributes: { "17": "271231" },
    });
  });

  it("accepts full stems with a custom path and http", () => {
    expect(build({ gtin: "09520123456788" }, "https://brand.example.com/products/")).toBe(
      "https://brand.example.com/products/01/09520123456788",
    );
    expect(build({ gtin: "09520123456788" }, "http://localhost:8787")).toBe(
      "http://localhost:8787/01/09520123456788",
    );
  });

  it("appends extra parameters after AI attributes", () => {
    expect(
      build({ gtin: "09520123456788" }, "example.com", {
        params: { linkType: "gs1:pip", note: "a b" },
      }),
    ).toBe("https://example.com/01/09520123456788?linkType=gs1%3Apip&note=a+b");
  });

  it("rejects all-numeric or empty extra parameter keys", () => {
    expect(() =>
      build({ gtin: "09520123456788" }, "example.com", { params: { "236": "x" } }),
    ).toThrow(/non-digit/);
    expect(() => build({ gtin: "09520123456788" }, "example.com", { params: { "": "x" } })).toThrow(
      /non-digit/,
    );
  });

  it.each([
    "",
    "ftp://example.com",
    "https://",
    "exa mple.com",
    "https://a_b.com",
    "https://example.com?x=1",
  ])("rejects bad domain %j", (domain) => {
    expect(() => build({ gtin: "09520123456788" }, domain)).toThrow(
      expect.objectContaining({
        issues: [expect.objectContaining({ code: "BUILD_INVALID_STEM" })],
      }),
    );
  });

  it("rejects bad GTINs, unknown AIs and non-key primary keys", () => {
    expect(() => build({ gtin: "9520123456789" })).toThrow(/check digit/);
    expect(() => build({ gtin: "09520123456788", attributes: { "89": "x" } })).toThrow(
      /not a known/,
    );
    expect(() => build({ primaryKey: { ai: "10", value: "X" } })).toThrow(
      expect.objectContaining({
        issues: [expect.objectContaining({ code: "BUILD_NO_PRIMARY_KEY" })],
      }),
    );
  });

  it("validates values and relationships", () => {
    expect(() => build({ gtin: "09520123456788", attributes: { "17": "271331" } })).toThrow(
      /invalid month/,
    );
    expect(() => build({ gtin: "09520123456788", batch: "x".repeat(21) })).toThrow(/too long/);
    expect(() => build({ gtin: "09520123456788", batch: "café" })).toThrow(/82-character set/);
    expect(() => build({ gtin: "09520123456788", batch: "\ud800" })).toThrow(/82-character set/);
  });

  it("passes currentYear through to date validation", () => {
    // 29 Feb "00": 2000 is a leap year, 2100 is not.
    expect(
      build({ gtin: "09520123456788", attributes: { "17": "000229" } }, undefined, {
        currentYear: 2026,
      }),
    ).toBe("https://id.gs1.org/01/09520123456788?17=000229");
    expect(() =>
      build({ gtin: "09520123456788", attributes: { "17": "000229" } }, undefined, {
        currentYear: 2099,
      }),
    ).toThrow(/invalid day/);
  });

  it("chooses the longest qualifier sequence from element arrays", () => {
    expect(
      build([
        { ai: "21", value: "S" },
        { ai: "01", value: "09520123456788" },
        { ai: "22", value: "V" },
      ]),
    ).toBe("https://id.gs1.org/01/09520123456788/22/V/21/S");
  });
});

describe("toCanonical", () => {
  it("accepts a parsed DigitalLink", () => {
    const dl = parse(
      "https://brand.example.com/stem/01/09520123456788/10/A?3103=000195&17=271231&x=1#f",
      o,
    );
    expect(toCanonical(dl)).toBe(`${CANONICAL_STEM}/01/09520123456788/10/A?17=271231&3103=000195`);
  });
  it("throws on invalid input", () => {
    expect(() => toCanonical("https://example.com/")).toThrow(DigitalLinkError);
  });
});

describe("isDigitalLink (URI Syntax §6.1.1 RE1)", () => {
  it.each([
    "https://id.gs1.org/01/09520123456788",
    "https://example.com/some/path/01/09520123456788/10/ABC?17=271231",
    "HTTP://user@example.com:8080/414/9520123456788",
  ])("plausibly %s", (s) => {
    expect(isDigitalLink(s)).toBe(true);
  });
  it.each([
    "https://example.com/",
    "https://example.com/products/123",
    "ftp://a/01/09520123456788",
    "0109520123456788",
  ])("not %s", (s) => {
    expect(isDigitalLink(s)).toBe(false);
  });
});

describe("percent-decoding", () => {
  const { unescape } = _internal;
  it.each([
    ["", "", ""],
    ["+", "+", " "],
    ["%20", " ", " "],
    ["A%20%20B", "A  B", "A  B"],
    ["ABC%2", "ABC%2", "ABC%2"],
    ["ABCD%", "ABCD%", "ABCD%"],
    ["A%4fB", "AOB", "AOB"],
    ["%2B", "+", "+"],
    ["A%4gB", "A%4gB", "A%4gB"],
    ["A%ffB", "AÿB", "AÿB"],
  ])("%j → path %j, query %j (GS1 engine URIunescape vectors)", (input, path, query) => {
    expect(unescape(input, false)).toBe(path);
    expect(unescape(input, true)).toBe(query);
  });
  it("traps NUL", () => {
    expect(unescape("A%00B", false)).toBeUndefined();
  });
});

describe("AI table", () => {
  it("records the standard versions", () => {
    expect(URI_SYNTAX_VERSION).toBe("1.7.0");
    expect(SYNTAX_DICTIONARY_RELEASE).toBe("2026-01-27");
  });

  it("describes AIs", () => {
    expect(getAI("01")).toMatchObject({
      ai: "01",
      title: "GTIN",
      predefinedLength: true,
      primaryKey: true,
      qualifiers: [["22", "10", "21"], ["235"]],
      minLength: 14,
      maxLength: 14,
    });
    expect(getAI("10")).toMatchObject({
      predefinedLength: false,
      dataAttribute: true,
      primaryKey: false,
      maxLength: 20,
    });
    expect(getAI("3103")?.title).toMatch(/NET WEIGHT/);
    expect(getAI("89")).toBeUndefined();
  });

  it("is prefix-free, so element strings parse unambiguously", () => {
    const ais = listAIs().map((d) => d.ai);
    expect(ais.length).toBeGreaterThan(500);
    for (const a of ais)
      for (const b of ais) if (a !== b) expect(b.startsWith(a), `${a} prefixes ${b}`).toBe(false);
  });

  it("lists AIs in lexical order", () => {
    const ais = listAIs().map((d) => d.ai);
    expect(ais).toEqual([...ais].sort());
  });

  it("has exactly the primary keys of URI Syntax §4.3", () => {
    expect(
      listAIs()
        .filter((d) => d.primaryKey)
        .map((d) => d.ai)
        .sort(),
    ).toEqual([
      "00",
      "01",
      "253",
      "255",
      "401",
      "402",
      "414",
      "415",
      "417",
      "8003",
      "8004",
      "8006",
      "8010",
      "8013",
      "8017",
      "8018",
    ]);
  });

  it("validateElement checks single values", () => {
    expect(validateElement("17", "271231")).toEqual([]);
    expect(validateElement("17", "")).toMatchObject([{ code: "AI_VALUE_EMPTY" }]);
    expect(validateElement("17", "27123")).toMatchObject([{ code: "AI_VALUE_TOO_SHORT" }]);
    expect(validateElement("17", "2712311")).toMatchObject([{ code: "AI_VALUE_TOO_LONG" }]);
    expect(validateElement("89", "x")).toMatchObject([{ code: "AI_UNKNOWN" }]);
    // (8008) N6 N2 [N2] [N2]: optional components may be omitted
    expect(validateElement("8008", "26101912")).toEqual([]);
    expect(validateElement("8008", "2610191230")).toEqual([]);
    expect(validateElement("8008", "2610192530")).toMatchObject([
      { linterError: "ILLEGAL_HOUR", position: 6 },
    ]);
    // (7011) N6 [N4]: an optional component, once started, must be complete
    expect(validateElement("7011", "261019")).toEqual([]);
    expect(validateElement("7011", "2610191230")).toEqual([]);
    expect(validateElement("7011", "26101912")).toMatchObject([{ code: "AI_VALUE_TOO_SHORT" }]);
  });
});
