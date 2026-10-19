// Test vectors ported from the GS1 Syntax Engine's Digital Link unit tests
// (https://github.com/gs1/gs1-syntax-engine, src/c-lib/dl.c, Apache-2.0,
// (c) GS1 AISBL). Expected AI data is written in the engine's notation, with
// "^" for FNC1. Engine error names are mapped to this library's issue codes.
//
// Deliberate differences, each following the URI Syntax standard text:
// - A trailing "/" reports URI_TRAILING_SLASH (engine: no key found / empty
//   value) and can be tolerated with { allowTrailingSlash: true }.
// - Data attributes are emitted in lexical AI order by build() (§4.12),
//   where the engine keeps fixed-length AIs first in received order.

import { describe, expect, it } from "vitest";
import { build, parse, parseElementString, validate, type IssueCode } from "../src/index.js";

const ERR: Record<string, IssueCode> = {
  URI_CONTAINS_ILLEGAL_SCHEME: "URI_ILLEGAL_SCHEME",
  URI_MISSING_DOMAIN_AND_PATH_INFO: "URI_MISSING_HOST",
  NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO: "URI_NO_PRIMARY_KEY",
  DOMAIN_CONTAINS_ILLEGAL_CHARACTERS: "URI_ILLEGAL_HOST_CHARACTER",
  URI_CONTAINS_ILLEGAL_CHARACTERS: "URI_ILLEGAL_CHARACTER",
  AI_VALUE_IS_TOO_SHORT: "AI_VALUE_TOO_SHORT",
  AI_VALUE_IS_TOO_LONG: "AI_VALUE_TOO_LONG",
  AI_VALUE_QUERY_ELEMENT_IN_EMPTY: "URI_EMPTY_QUERY_VALUE",
  UNKNOWN_AI_IN_QUERY_PARAMS: "URI_UNKNOWN_AI_IN_QUERY",
  AI_LINTER_ERROR: "AI_VALUE_INVALID",
  AI_SHOULD_BE_IN_PATH_INFO: "URI_AI_SHOULD_BE_IN_PATH",
  DUPLICATE_AI: "URI_DUPLICATE_AI",
  AI_IS_NOT_VALID_DATA_ATTRIBUTE: "URI_AI_NOT_DATA_ATTRIBUTE",
  DECODED_AI_FROM_DL_PATH_INFO_CONTAINS_ILLEGAL_NULL: "URI_NUL_CHARACTER",
  DECODED_AI_VALUE_FROM_QUERY_PARAMS_CONTAINS_ILLEGAL_NULL: "URI_NUL_CHARACTER",
  INVALID_KEY_QUALIFIER_SEQUENCE: "URI_INVALID_KEY_QUALIFIER_SEQUENCE",
  TRAILING_SLASH: "URI_TRAILING_SLASH",
};

/** "^0112312312312333^10ABC" → elements, via this library's element-string parser. */
const aiData = (s: string) => parseElementString(s.replaceAll("^", "\x1d"), { currentYear: 2026 });

const OK: [string, string][] = [
  ["http://a/00/006141411234567890", "^00006141411234567890"],
  ["HTTP://a/00/006141411234567890", "^00006141411234567890"],
  ["https://a/00/006141411234567890", "^00006141411234567890"],
  ["HTTPS://a/00/006141411234567890", "^00006141411234567890"],
  ["https://a/01/12312312312333", "^0112312312312333"],
  ["https://xn--fsq.xn--0zwm56d/01/12312312312333", "^0112312312312333"],
  ["https://a./01/12312312312333", "^0112312312312333"],
  ["https://a:65535/01/12312312312333", "^0112312312312333"],
  ["https://192.0.2.1/01/12312312312333", "^0112312312312333"],
  ["https://3232235777/01/12312312312333", "^0112312312312333"],
  ["https://0300.0250.01.01/01/12312312312333", "^0112312312312333"],
  ["https://0xC0.0xA8.0x01.0x01/01/12312312312333", "^0112312312312333"],
  ["https://[2001:db8::1]/01/12312312312333", "^0112312312312333"],
  ["https://a/stem/00/006141411234567890", "^00006141411234567890"],
  ["https://a/more/stem/00/006141411234567890", "^00006141411234567890"],
  ["https://a/00/faux/00/006141411234567890", "^00006141411234567890"],
  ["https://a/8004/9520614141234567?01=09521234543213", "^80049520614141234567^0109521234543213"],
  ["https://a/01/12312312312333/22/TEST/10/ABC/21/XYZ", "^011231231231233322TEST^10ABC^21XYZ"],
  ["https://a/01/12312312312333/235/TEST", "^0112312312312333235TEST"],
  ["https://a/253/1231231231232", "^2531231231231232"],
  ["https://a/253/1231231231232TEST5678901234567", "^2531231231231232TEST5678901234567"],
  ["https://a/8018/123456789012345675/8019/123", "^8018123456789012345675^8019123"],
  ["https://a/stem/00/006141411234567890?", "^00006141411234567890"],
  ["https://a/stem/00/006141411234567890?99=ABC", "^0000614141123456789099ABC"],
  ["https://a/stem/401/12345678?99=ABC", "^40112345678^99ABC"],
  ["https://a/01/12312312312333?99=ABC&98=XYZ", "^011231231231233399ABC^98XYZ"],
  ["https://a/01/12312312312333?&&&99=ABC&&&&&&98=XYZ&&&", "^011231231231233399ABC^98XYZ"],
  ["https://a/01/12312312312333?99=ABC&unknown=666&98=XYZ", "^011231231231233399ABC^98XYZ"],
  ["https://a/01/12312312312333?unknown=666&99=ABC&98=XYZ", "^011231231231233399ABC^98XYZ"],
  ["https://a/01/12312312312333?99=ABC&98=XYZ&unknown=666", "^011231231231233399ABC^98XYZ"],
  [
    "https://a/01/12312312312333?unknown1=555&99=ABC&unknown2=666&98=XYZ&unknown3=777",
    "^011231231231233399ABC^98XYZ",
  ],
  ["https://a/01/12312312312333?99=ABC&singleton&98=XYZ", "^011231231231233399ABC^98XYZ"],
  ["https://a/01/12312312312333?singleton&99=ABC&98=XYZ", "^011231231231233399ABC^98XYZ"],
  ["https://a/01/12312312312333?99=ABC&98=XYZ&singleton", "^011231231231233399ABC^98XYZ"],
  [
    "https://a/01/12312312312333?singleton1&99=ABC&singleton2&98=XYZ&singleton3",
    "^011231231231233399ABC^98XYZ",
  ],
  [
    "https://a/01/12312312312333?singleton1&unknown1=555&99=ABC&singleton2&unknown2=6666&98=XYZ&unknown3=777&singleton3",
    "^011231231231233399ABC^98XYZ",
  ],
  [
    "https://a/01/12312312312333/22/ABC%2d123?99=ABC&98=XYZ%2f987",
    "^011231231231233322ABC-123^99ABC^98XYZ/987",
  ],
  [
    "https://a/01/12312312312333/22/ABC+123?99=ABC&98=XYZ%2f987",
    "^011231231231233322ABC+123^99ABC^98XYZ/987",
  ],
  ["https://a/01/12312312312333/22/test/10/abc/21/xyz#", "^011231231231233322test^10abc^21xyz"],
  [
    "https://a/01/12312312312333/22/test/10/abc/21/xyz#fragment",
    "^011231231231233322test^10abc^21xyz",
  ],
  ["https://a/stem/00/006141411234567890?99=ABC#", "^0000614141123456789099ABC"],
  ["https://a/stem/00/006141411234567890?99=ABC#fragment", "^0000614141123456789099ABC"],
  // Examples from the DL specification, as tested by the engine
  ["https://id.gs1.org/01/09520123456788", "^0109520123456788"],
  ["https://id.gs1.org/01/09520123456788/22/2A", "^0109520123456788222A"],
  ["https://id.gs1.org/01/09520123456788/10/ABC123", "^010952012345678810ABC123"],
  ["https://id.gs1.org/01/09520123456788/21/12345", "^01095201234567882112345"],
  [
    "https://id.gs1.org/01/09520123456788/10/ABC1/21/12345?17=180426",
    "^010952012345678810ABC1^2112345^17180426",
  ],
  ["https://id.gs1.org/01/09520123456788?3103=000195", "^01095201234567883103000195"],
  [
    "https://example.com/01/09520123456788?3103=000195&3922=0299&17=201225",
    "^0109520123456788310300019539220299^17201225",
  ],
  [
    "https://id.gs1.org/01/09520123456788?17=201225&3103=000195&3922=0299",
    "^010952012345678817201225310300019539220299",
  ],
  ["https://id.gs1.org/00/952012345678912345", "^00952012345678912345"],
  [
    "https://id.gs1.org/00/952012345678912345?02=09520123456788&37=25&10=ABC123",
    "^0095201234567891234502095201234567883725^10ABC123",
  ],
  ["https://id.gs1.org/414/9520123456788", "^4149520123456788"],
  ["https://id.gs1.org/414/9520123456788/254/32a%2Fb", "^414952012345678825432a/b"],
  [
    "https://example.com/8004/9520614141234567?01=09520123456788",
    "^80049520614141234567^0109520123456788",
  ],
  ["https://id.gs1.org/01/09520123456788/235/XYZ?10=ABC123", "^0109520123456788235XYZ^10ABC123"],
  ["https://a/01/12312312312333/10/A+B", "^011231231231233310A+B"],
  ["https://a/01/12312312312333/10/A%4gB", "^011231231231233310A%4gB"],
];

const FAIL: [string, string][] = [
  ["URI_CONTAINS_ILLEGAL_SCHEME", ""],
  ["URI_CONTAINS_ILLEGAL_SCHEME", "ftp://"],
  ["URI_MISSING_DOMAIN_AND_PATH_INFO", "http://"],
  ["URI_MISSING_DOMAIN_AND_PATH_INFO", "http:///"],
  ["URI_MISSING_DOMAIN_AND_PATH_INFO", "http://a"],
  ["NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO", "http://a/"],
  ["NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO", "http://a/b"],
  ["TRAILING_SLASH", "http://a/b/"],
  ["URI_CONTAINS_ILLEGAL_SCHEME", "HtTp://a/b/00/006141411234567890"],
  ["NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO", "https://00/006141411234567890"],
  ["DOMAIN_CONTAINS_ILLEGAL_CHARACTERS", "https://[fe80::1%25lo]/01/12312312312333"],
  ["DOMAIN_CONTAINS_ILLEGAL_CHARACTERS", "https://$a/006141411234567890"],
  ["DOMAIN_CONTAINS_ILLEGAL_CHARACTERS", "https://a$/006141411234567890"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333<bad"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333>bad"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333{bad"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333}bad"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333\\bad"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333^bad"],
  ["URI_CONTAINS_ILLEGAL_CHARACTERS", "https://a/01/12312312312333`bad"],
  ["NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO", "https://a/gtin/12312312312333"],
  ["AI_VALUE_IS_TOO_SHORT", "https://a/01/2112345678900"],
  ["AI_VALUE_IS_TOO_SHORT", "https://a/01/416000336108"],
  ["AI_VALUE_IS_TOO_SHORT", "https://a/01/02345673"],
  ["AI_VALUE_IS_TOO_SHORT", "https://a/8004/9520614141234567?01=2112345678900"],
  ["AI_VALUE_IS_TOO_SHORT", "https://a/8004/9520614141234567?01=02345673"],
  ["AI_VALUE_IS_TOO_LONG", "https://a/253/1231231231232TEST56789012345678"],
  ["TRAILING_SLASH", "https://a/stem/00/006141411234567890/"],
  ["AI_VALUE_QUERY_ELEMENT_IN_EMPTY", "https://a/01/12312312312333?99="],
  ["UNKNOWN_AI_IN_QUERY_PARAMS", "https://a/01/12312312312333?99=ABC&999=faux"],
  ["AI_LINTER_ERROR", "https://a/01/12312312312333/22/ABC%2d123?99=ABC&98=XYZ+987"],
  ["AI_SHOULD_BE_IN_PATH_INFO", "https://example.com/01/09520123456788?10=ABC123"],
  ["DUPLICATE_AI", "https://id.gs1.org/01/09520123456788/10/ABC123?99=XYZ789&01=09520123456788"],
  ["DUPLICATE_AI", "https://id.gs1.org/01/09520123456788/10/ABC123?99=XYZ789&10=ABC123"],
  ["DUPLICATE_AI", "https://id.gs1.org/01/09520123456788/10/ABC123?99=XYZ789&99=XYZ789"],
  ["NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO", "https://example.com/01/09520123456788/89/ABC123?99=XYZ"],
  ["UNKNOWN_AI_IN_QUERY_PARAMS", "https://example.com/01/09520123456788?99=XYZ&89=ABC123"],
  ["NO_GS1_DL_KEYS_FOUND_IN_PATH_INFO", "https://a/01//12312312312333"],
  ["DECODED_AI_FROM_DL_PATH_INFO_CONTAINS_ILLEGAL_NULL", "https://a/01/1231231231233%003"],
  [
    "DECODED_AI_VALUE_FROM_QUERY_PARAMS_CONTAINS_ILLEGAL_NULL",
    "https://a/01/12312312312333?99=ABC%00DEF",
  ],
  ["AI_LINTER_ERROR", "https://a/01/12312312312333?99=A+B"],
  ["TRAILING_SLASH", "https://a/01/12312312312333/10/"],
  ["INVALID_KEY_QUALIFIER_SEQUENCE", "https://a/01/12312312312333/99/ABC"],
];

describe("GS1 Syntax Engine parseDLuri vectors", () => {
  it.each(OK)("parses %s", (uri, expected) => {
    expect(parse(uri, { currentYear: 2026 }).elements).toEqual(aiData(expected));
  });

  it.each(FAIL)("rejects with %s: %s", (engineError, uri) => {
    const r = validate(uri, { currentYear: 2026 });
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues.map((i) => i.code)).toContain(ERR[engineError]);
  });

  it("legacy zero-suppressed GTINs expand when permitted", () => {
    const o = { allowShortGtin: true, currentYear: 2026 };
    expect(parse("https://a/01/2112345678900", o).gtin).toBe("02112345678900");
    expect(parse("https://a/01/416000336108", o).gtin).toBe("00416000336108");
    expect(parse("https://a/01/02345673", o).gtin).toBe("00000002345673");
    expect(parse("https://a/8004/9520614141234567?01=2112345678900", o).attributes["01"]).toBe(
      "02112345678900",
    );
    expect(parse("https://brand.example.com/some-extra/pathinfo/01/9520123456788", o).gtin).toBe(
      "09520123456788",
    );
  });

  it("AI (99) accepts exactly 90 characters in the query string", () => {
    const ok = "https://a/01/12312312312333?99=" + "A".repeat(90);
    expect(validate(ok).valid).toBe(true);
    const r = validate(ok + "A");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.issues[0]?.code).toBe("AI_VALUE_TOO_LONG");
  });
});

describe("GS1 Syntax Engine generateDLuri vectors", () => {
  const gen = (data: string, stem?: string) => build(aiData(data), stem);

  it.each([
    ["(01)12312312312326(21)abc123", undefined, "https://id.gs1.org/01/12312312312326/21/abc123"],
    [
      "(01)12312312312326(21)abc123",
      "https://example.com",
      "https://example.com/01/12312312312326/21/abc123",
    ],
    [
      "(01)12312312312326(22)ABC(10)DEF(21)GHI",
      "https://example.com",
      "https://example.com/01/12312312312326/22/ABC/10/DEF/21/GHI",
    ],
    [
      "(01)12312312312326(22)ABC(10)DEF(21)GHI(95)INT",
      "https://example.com",
      "https://example.com/01/12312312312326/22/ABC/10/DEF/21/GHI?95=INT",
    ],
    [
      "(21)XYZ(01)12312312312333(10)ABC123(99)XYZ",
      "https://example.com",
      "https://example.com/01/12312312312333/10/ABC123/21/XYZ?99=XYZ",
    ],
    [
      "(01)12312312312333(10)ABC+123(99)XYZ+QWERTY",
      "https://example.com",
      "https://example.com/01/12312312312333/10/ABC%2B123?99=XYZ%2BQWERTY",
    ],
    // Multiple candidate primary keys: the first becomes the path root.
    // Attributes are in lexical order here (engine: received order).
    [
      "(8017)795260646688514634(99)000001(253)9526064000028000001",
      "https://example.com",
      "https://example.com/8017/795260646688514634?253=9526064000028000001&99=000001",
    ],
    [
      "(253)9526064000028000001(99)000001(8017)795260646688514634",
      "https://example.com",
      "https://example.com/253/9526064000028000001?8017=795260646688514634&99=000001",
    ],
    [
      "(98)ABC(253)9526064000028000001(99)000001(8017)795260646688514634",
      "https://example.com",
      "https://example.com/253/9526064000028000001?8017=795260646688514634&98=ABC&99=000001",
    ],
    [
      "(253)9526064000028000001(99)000001(01)12312312312326(10)DEF(95)INT",
      "https://example.com",
      "https://example.com/253/9526064000028000001?01=12312312312326&10=DEF&95=INT&99=000001",
    ],
    // Repeated identical AIs collapse
    [
      "(01)12312312312326(01)12312312312326(10)ABC123(99)XYZ789",
      "https://example.com",
      "https://example.com/01/12312312312326/10/ABC123?99=XYZ789",
    ],
    [
      "(01)12312312312326(10)ABC123(10)ABC123(99)XYZ789",
      "https://example.com",
      "https://example.com/01/12312312312326/10/ABC123?99=XYZ789",
    ],
    [
      "(01)12312312312326(10)ABC123(99)XYZ789(99)XYZ789",
      "https://example.com",
      "https://example.com/01/12312312312326/10/ABC123?99=XYZ789",
    ],
    [
      "(8010)0200(3133)333333(3300)000000(99)57(3133)333333(3300)000000(01)04065093955756(10)0(3133)333333(3300)000000(01)04065093955756",
      "https://example.com",
      "https://example.com/8010/0200?01=04065093955756&10=0&3133=333333&3300=000000&99=57",
    ],
    // Stem with trailing slash is trimmed
    ["(01)12312312312326", "https://example.com/", "https://example.com/01/12312312312326"],
  ])("%s with stem %s", (data, stem, expected) => {
    expect(gen(data, stem)).toBe(expected);
  });

  it.each([
    ["(01)12312312312326(99)000001(8200)http://example.com(95)INT", "URI_AI_NOT_DATA_ATTRIBUTE"],
    ["(01)12312312312326(235)TPX9526064(99)000001(22)ABC(95)INT", "URI_AI_NOT_DATA_ATTRIBUTE"],
    [
      "(01)12312312312326(22)ABC(10)DEF(99)000001(235)TPX9526064(95)INT",
      "URI_AI_NOT_DATA_ATTRIBUTE",
    ],
    ["(01)12312312312326(235)ABC(10)DEF", "URI_AI_NOT_DATA_ATTRIBUTE"],
    ["(99)XYZ789", "BUILD_NO_PRIMARY_KEY"],
  ])("refuses %s", (data, code) => {
    expect(() => gen(data, "https://example.com")).toThrow(
      expect.objectContaining({
        issues: expect.arrayContaining([expect.objectContaining({ code })]),
      }),
    );
  });

  it("keeps the path order of a parsed URI: /01/…/235/…?10=…", () => {
    const dl = parse("https://example.com/01/12312312312326/235/ABC?10=DEF");
    expect(
      build(
        { primaryKey: dl.primaryKey, qualifiers: dl.qualifiers, attributes: dl.attributes },
        "https://example.com",
      ),
    ).toBe("https://example.com/01/12312312312326/235/ABC?10=DEF");
  });
});
