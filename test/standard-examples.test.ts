// Every example from GS1 Digital Link Standard: URI Syntax, release 1.7.0
// (Aug 2026). Section numbers refer to that document.

import { describe, expect, it } from "vitest";
import {
  formatElementString,
  parse,
  parseElementString,
  toCanonical,
  validate,
  build,
} from "../src/index.js";

const opts = { currentYear: 2026 };

/** [URI, equivalent element string, canonical URI] from §5. */
const SECTION_5: [string, string, string][] = [
  // §5.1 GTIN
  [
    "https://id.gs1.org/01/09520123456788",
    "(01)09520123456788",
    "https://id.gs1.org/01/09520123456788",
  ],
  [
    "https://brand.example.com/01/09520123456788",
    "(01)09520123456788",
    "https://id.gs1.org/01/09520123456788",
  ],
  [
    "https://brand.example.com/some-extra/pathinfo/01/09520123456788",
    "(01)09520123456788",
    "https://id.gs1.org/01/09520123456788",
  ],
  // §5.2 GTIN + CPV
  [
    "https://id.gs1.org/01/09520123456788/22/2A",
    "(01)09520123456788(22)2A",
    "https://id.gs1.org/01/09520123456788/22/2A",
  ],
  [
    "https://brand.example.com/01/09520123456788/22/2A",
    "(01)09520123456788(22)2A",
    "https://id.gs1.org/01/09520123456788/22/2A",
  ],
  [
    "https://retailer.example.com/01/09520123456788/22/2A",
    "(01)09520123456788(22)2A",
    "https://id.gs1.org/01/09520123456788/22/2A",
  ],
  // §5.3 GTIN + Batch/Lot
  [
    "https://id.gs1.org/01/09520123456788/10/ABC123",
    "(01)09520123456788(10)ABC123",
    "https://id.gs1.org/01/09520123456788/10/ABC123",
  ],
  [
    "https://brand.example.com/01/09520123456788/10/ABC123",
    "(01)09520123456788(10)ABC123",
    "https://id.gs1.org/01/09520123456788/10/ABC123",
  ],
  [
    "https://retailer.example.com/01/09520123456788/10/ABC123",
    "(01)09520123456788(10)ABC123",
    "https://id.gs1.org/01/09520123456788/10/ABC123",
  ],
  // §5.4 GTIN + Serial
  [
    "https://id.gs1.org/01/09520123456788/21/12345",
    "(01)09520123456788(21)12345",
    "https://id.gs1.org/01/09520123456788/21/12345",
  ],
  [
    "https://brand.example.com/01/09520123456788/21/12345",
    "(01)09520123456788(21)12345",
    "https://id.gs1.org/01/09520123456788/21/12345",
  ],
  [
    "https://retailer.example.com/01/09520123456788/21/12345",
    "(01)09520123456788(21)12345",
    "https://id.gs1.org/01/09520123456788/21/12345",
  ],
  // §5.5 GTIN + Batch/Lot + Serial + Expiry. The standard writes the element
  // string with (17) first; element order is not significant.
  [
    "https://id.gs1.org/01/09520123456788/10/ABC1/21/12345?17=180426",
    "(01)09520123456788(17)180426(10)ABC1(21)12345",
    "https://id.gs1.org/01/09520123456788/10/ABC1/21/12345?17=180426",
  ],
  [
    "https://example.com/01/09520123456788/10/ABC1/21/12345?17=180426",
    "(01)09520123456788(17)180426(10)ABC1(21)12345",
    "https://id.gs1.org/01/09520123456788/10/ABC1/21/12345?17=180426",
  ],
  // §5.6 GTIN + Net weight
  [
    "https://id.gs1.org/01/09520123456788?3103=000195",
    "(01)09520123456788(3103)000195",
    "https://id.gs1.org/01/09520123456788?3103=000195",
  ],
  [
    "https://example.com/01/09520123456788?3103=000195",
    "(01)09520123456788(3103)000195",
    "https://id.gs1.org/01/09520123456788?3103=000195",
  ],
  // §5.7 Net weight + Amount payable + Expiry: only the lexically sorted form is canonical
  [
    "https://example.com/01/09520123456788?3103=000195&3922=0299&17=201225",
    "(01)09520123456788(3103)000195(3922)0299(17)201225",
    "https://id.gs1.org/01/09520123456788?17=201225&3103=000195&3922=0299",
  ],
  [
    "https://id.gs1.org/01/09520123456788?3103=000195&3922=0299&17=201225",
    "(01)09520123456788(3103)000195(3922)0299(17)201225",
    "https://id.gs1.org/01/09520123456788?17=201225&3103=000195&3922=0299",
  ],
  [
    "https://id.gs1.org/01/09520123456788?17=201225&3103=000195&3922=0299",
    "(01)09520123456788(3103)000195(3922)0299(17)201225",
    "https://id.gs1.org/01/09520123456788?17=201225&3103=000195&3922=0299",
  ],
  // §5.8 SSCC
  [
    "https://id.gs1.org/00/195201234567891232",
    "(00)195201234567891232",
    "https://id.gs1.org/00/195201234567891232",
  ],
  [
    "https://example.com/00/195201234567891232",
    "(00)195201234567891232",
    "https://id.gs1.org/00/195201234567891232",
  ],
  // §5.9 SSCC with Content, Count, Batch/Lot
  [
    "https://id.gs1.org/00/195201234567891232?02=09520123456788&37=25&10=ABC123",
    "(00)195201234567891232(02)09520123456788(37)25(10)ABC123",
    "https://id.gs1.org/00/195201234567891232?02=09520123456788&10=ABC123&37=25",
  ],
  [
    "https://example.com/00/195201234567891232?02=09520123456788&37=25&10=ABC123",
    "(00)195201234567891232(02)09520123456788(37)25(10)ABC123",
    "https://id.gs1.org/00/195201234567891232?02=09520123456788&10=ABC123&37=25",
  ],
  // §5.10 GLN, GLN + extension (percent-encoded "/")
  [
    "https://id.gs1.org/414/9520123456788",
    "(414)9520123456788",
    "https://id.gs1.org/414/9520123456788",
  ],
  [
    "https://id.gs1.org/414/9520123456788/254/32a%2Fb",
    "(414)9520123456788(254)32a/b",
    "https://id.gs1.org/414/9520123456788/254/32a%2Fb",
  ],
  [
    "https://example.com/414/9520123456788",
    "(414)9520123456788",
    "https://id.gs1.org/414/9520123456788",
  ],
  [
    "https://example.com/414/9520123456788/254/32a%2Fb",
    "(414)9520123456788(254)32a/b",
    "https://id.gs1.org/414/9520123456788/254/32a%2Fb",
  ],
  // §5.11 GIAI + GTIN, both ways round
  [
    "https://example.com/8004/9520614141234567?01=09520123456788",
    "(8004)9520614141234567(01)09520123456788",
    "https://id.gs1.org/8004/9520614141234567?01=09520123456788",
  ],
  [
    "https://example.com/01/09520123456788?8004=9520614141234567",
    "(01)09520123456788(8004)9520614141234567",
    "https://id.gs1.org/01/09520123456788?8004=9520614141234567",
  ],
];

const sortedElements = (s: string) =>
  [...parseElementString(s, opts)].sort((a, b) => (a.ai < b.ai ? -1 : 1));

describe("URI Syntax 1.7.0 §5 examples", () => {
  it.each(SECTION_5)("%s", (uri, elementString, canonical) => {
    const dl = parse(uri, opts);
    // Informationally equivalent to the element string given by the standard
    const fromUri = [...dl.elements].sort((a, b) => (a.ai < b.ai ? -1 : 1));
    expect(fromUri).toEqual(sortedElements(elementString));
    expect(toCanonical(dl)).toBe(canonical);
    // And the element string itself is valid
    expect(formatElementString(parseElementString(elementString, opts))).toBe(elementString);
  });

  it("§5.10: decodes %2F to a literal slash in the GLN extension", () => {
    expect(parse("https://id.gs1.org/414/9520123456788/254/32a%2Fb").qualifiers).toEqual([
      { ai: "254", value: "32a/b" },
    ]);
  });

  it("§5.11: the key in the path is the primary key", () => {
    expect(parse("https://example.com/8004/9520614141234567?01=09520123456788").primaryKey).toEqual(
      {
        ai: "8004",
        value: "9520614141234567",
      },
    );
    const dl = parse("https://example.com/01/09520123456788?8004=9520614141234567");
    expect(dl.gtin).toBe("09520123456788");
    expect(dl.attributes).toEqual({ "8004": "9520614141234567" });
  });

  it("§5.1: custom path segments before the primary key are a stem", () => {
    const dl = parse("https://brand.example.com/some-extra/pathinfo/01/09520123456788");
    expect(dl.host).toBe("brand.example.com");
    expect(dl.stem).toBe("/some-extra/pathinfo");
  });
});

describe("URI Syntax 1.7.0 §4.9 path element order", () => {
  it.each([
    "/01/09520123456788/22/2A/10/ABC123/21/12345XYZ",
    "/01/09520123456788/10/ABC123/21/12345XYZ",
    "/01/09520123456788/21/12345XYZ",
  ])("permits %s", (path) => {
    expect(validate(`https://example.com${path}`).valid).toBe(true);
  });

  it("permits /01/09520123456788/10/ABC123/ (trailing slash tolerated as resolvers should)", () => {
    // The standard lists this as permitted by gtin-path; the final "/" itself
    // is outside the ABNF (§4.12) and tolerated only on request.
    expect(validate("https://example.com/01/09520123456788/10/ABC123/").valid).toBe(false);
    expect(
      validate("https://example.com/01/09520123456788/10/ABC123/", { allowTrailingSlash: true })
        .valid,
    ).toBe(true);
  });

  it("does not permit /01/09520123456788/21/12345XYZ/10/ABC123", () => {
    const r = validate("https://example.com/01/09520123456788/21/12345XYZ/10/ABC123");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.code).toBe("URI_INVALID_KEY_QUALIFIER_SEQUENCE");
  });

  it("requires (8020) after (415): payTo-path = payTo-comp refNo-comp", () => {
    const r = validate("https://example.com/415/9520123456788");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.code).toBe("URI_INVALID_KEY_QUALIFIER_SEQUENCE");
    expect(validate("https://example.com/415/9520123456788/8020/REF123").valid).toBe(true);
  });

  it.each([
    ["upui-path", "/01/09520123456788/235/TPX123"],
    ["eoid-path", "/417/9520123456788/7040/1ABC"],
    ["fid-path", "/414/9520123456788/7040/1ABC"],
    ["mid-path", "/8004/9520614141234567/7040/1ABC"],
    ["cpid-path", "/8010/9520123ABC/8011/123"],
    ["gsrn-path", "/8018/123456789012345675/8019/123"],
  ])("permits %s %s", (_, path) => {
    expect(validate(`https://example.com${path}`, opts).valid).toBe(true);
  });
});

describe("URI Syntax 1.7.0 §4.10.1 extension parameters", () => {
  it("23P=12098 is a valid extension parameter", () => {
    expect(parse("https://example.com/01/09520123456788?23P=12098").params).toEqual({
      "23P": "12098",
    });
  });
  it("236=12098 is invalid: all-numeric keys are reserved for AIs", () => {
    const r = validate("https://example.com/01/09520123456788?236=12098");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.code).toBe("URI_UNKNOWN_AI_IN_QUERY");
  });
});

describe("URI Syntax 1.7.0 §4.12 canonical URIs", () => {
  it("drops linkType and the custom domain", () => {
    expect(
      toCanonical("http://example.com/01/09520123456788/22/2A?linkType=gs1:traceability"),
    ).toBe("https://id.gs1.org/01/09520123456788/22/2A");
  });
  it("never has a trailing slash", () => {
    expect(
      toCanonical("https://example.com/8003/09520123456788ABC/", { allowTrailingSlash: true }),
    ).toBe("https://id.gs1.org/8003/09520123456788ABC");
  });
  it("build() with no domain produces canonical URIs", () => {
    expect(build({ gtin: "09520123456788", cpv: "2A" })).toBe(
      "https://id.gs1.org/01/09520123456788/22/2A",
    );
  });
});

describe("URI Syntax 1.7.0 §4.1 GTIN of fewer than 14 digits", () => {
  it("is rejected by default", () => {
    const r = validate("https://brand.example.com/01/9520123456788");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.code).toBe("AI_VALUE_TOO_SHORT");
  });
  it("is padded when legacy support is requested", () => {
    expect(parse("https://brand.example.com/01/9520123456788", { allowShortGtin: true }).gtin).toBe(
      "09520123456788",
    );
  });
});
