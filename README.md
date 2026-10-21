# @packpath/digital-link

Parse, build and validate [GS1 Digital Link](https://ref.gs1.org/standards/digital-link/) URIs
and GS1 element strings in TypeScript or JavaScript. Decode EPC binary strings from RFID tags, and
EPC-compressed Digital Link URIs.

- **Standards-first.** Implements GS1 Digital Link URI Syntax **1.7.0** (Aug 2026). Application
  Identifier rules are generated from GS1's own Barcode Syntax Dictionary, not typed by hand.
- **Tested against GS1's own data.** Every example in the URI Syntax standard, the GS1 Syntax
  Engine's Digital Link test vectors, and 5,649 test vectors from GS1's reference linters.
- **Readable errors.** `validate()` returns every problem as a plain-English message with a
  machine-readable code: _`AI (01) GTIN: value "09520123456789" has an incorrect check digit`_.
- **Zero dependencies.** ESM and CommonJS, about 35 KB gzipped. Uses no platform APIs, so it
  runs in browsers, Node.js 18+ and Cloudflare Workers.

```sh
npm install @packpath/digital-link
```

## Quick start

```ts
import { build, parse, validate } from "@packpath/digital-link";

// Build the URI to print in a QR code
build({ gtin: "5012345678900", batch: "ABC123", attributes: { "17": "271231" } }, "id.brand.co.uk");
// → "https://id.brand.co.uk/01/05012345678900/10/ABC123?17=271231"

// Parse a scanned URI
const link = parse("https://id.brand.co.uk/01/05012345678900/10/ABC123?17=271231");
link.gtin; // "05012345678900"
link.batch; // "ABC123"
link.attributes["17"]; // "271231" — expiry date, YYMMDD

// Validate without throwing
const result = validate("https://id.brand.co.uk/01/05012345678901");
if (!result.valid) {
  console.log(result.issues.map((i) => i.message));
  // [ 'AI (01) GTIN: value "05012345678901" has an incorrect check digit (at position 14: "1")' ]
}
```

## What it checks

| Check                                                                    | Source                                     |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| URI characters, scheme, host, custom path stems                          | URI Syntax §4.11                           |
| Primary keys and key-qualifier order (e.g. `/01/…/22/…/10/…/21/…`)       | URI Syntax §4.3–4.9                        |
| Which AIs may appear in the query string; AIs that belong in the path    | URI Syntax §4.10                           |
| All-numeric query keys reserved for AIs; duplicate AIs                   | URI Syntax §3, §4.10.1                     |
| Percent-encoding (`/` as `%2F` etc.; `+` is a space only in the query)   | URI Syntax §4.2, RFC 3986                  |
| AI value length, character set (82, 39, 64), components                  | GS1 General Specifications via dictionary  |
| Check digits, check character pairs, dates, times, country and currency codes, package types, IBANs, coupons | GS1 reference linters |
| Mandatory AI associations and invalid pairs (e.g. `(10)` needs `(01)`)   | GS1 General Specifications §4.13           |

Not checked: whether a GS1 Company Prefix is actually allocated (needs GS1 registry data).
Not supported: the general compressed Digital Link URI form (only EPC-compressed URIs, below).

## API

### Digital Link URIs

#### `parse(uri, options?) → DigitalLink`

Parses and validates. Throws `DigitalLinkError` (with an `issues` array) if invalid.

```ts
interface DigitalLink {
  scheme: "https" | "http";
  host: string; // "id.brand.co.uk"
  stem: string; // custom path before the key, e.g. "/products", or ""
  primaryKey: Element; // { ai: "01", value: "05012345678900" }
  qualifiers: Element[]; // path key qualifiers, in order
  attributes: Record<string, string>; // query-string AIs, e.g. { "17": "271231" }
  params: Record<string, string>; // other query parameters, e.g. { linkType: "gs1:pip" }
  fragment?: string;
  elements: Element[]; // every AI, path then query
  gtin?: string; // AI 01, when it is the primary key
  cpv?: string; // AI 22
  batch?: string; // AI 10, from path or query
  serial?: string; // AI 21
}
```

Options:

| Option               | Default      | Effect                                                                                                   |
| -------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| `allowTrailingSlash` | `false`      | Accept one trailing `/`. Not conformant, but resolvers should tolerate it.                               |
| `allowShortGtin`     | `false`      | Accept legacy 8/12/13-digit GTINs in AI (01) and pad them to 14 (URI Syntax §4.1).                       |
| `currentYear`        | current year | Century horizon for `YYMMDD` dates (General Specifications §7.12). Set it for reproducible results.      |

#### `validate(uri, options?) → ValidationResult<DigitalLink>`

Same as `parse`, but returns `{ valid: true, value }` or `{ valid: false, issues }`.

#### `build(data, domain?, options?) → string`

Builds a Digital Link URI. `data` is one of:

- `{ gtin, cpv?, batch?, serial?, attributes? }` — GTIN-8/12/13/14 accepted, normalised to 14 digits.
- `{ primaryKey, qualifiers?, attributes? }` — any other key, e.g. an SSCC `{ ai: "00", value: "…" }`.
- `Element[]` — e.g. from `parseElementString()`. The first primary key becomes the path root
  and as many key qualifiers as possible go into the path, as the GS1 Syntax Engine does.

`domain` is a host (`"id.brand.co.uk"`, HTTPS assumed) or a stem
(`"https://brand.co.uk/products"`). Default: `https://id.gs1.org`. Query-string AIs are written in
lexical order. `options.params` adds non-GS1 parameters such as `{ linkType: "gs1:pip" }`.
The result is always re-validated, so `build()` never returns an invalid URI.

#### `toCanonical(uriOrLink) → string`

The canonical form (URI Syntax §4.12): `https://id.gs1.org`, no stem, only AI parameters in
lexical order, no fragment. A stable key for the same identifier written on different domains.

```ts
toCanonical("http://example.com/01/09520123456788/22/2A?linkType=gs1:traceability");
// "https://id.gs1.org/01/09520123456788/22/2A"
```

#### `isDigitalLink(text) → boolean`

Fast check using the standard's own regular expression (§6.1.1). `true` means "plausibly a
Digital Link URI", for routing scanned text; use `validate()` to be sure.

### Element strings

#### `parseElementString(input, options?) → Element[]`

Parses data from a barcode scanner or in bracketed form, and validates it.

```ts
// Raw scanner data: GS (\x1d) after variable-length values, optional symbology identifier
parseElementString("]Q3" + "0105012345678900" + "10ABC123\x1d" + "17271231");
// Bracketed form
parseElementString("(01)05012345678900(10)ABC123(17)271231");
// Both → [{ ai: "01", value: "05012345678900" }, { ai: "10", value: "ABC123" }, { ai: "17", value: "271231" }]
```

Identical repeated AIs (e.g. from two carriers on one pack) are merged; differing repeats are an
error. `validateElementString()` returns a `ValidationResult` instead of throwing.

#### `formatElementString(elements, format?) → string`

Writes `"bracketed"` (default) or `"raw"` (GS separators where needed) element strings.

### GTINs and AIs

| Function                       | Returns                                                                    |
| ------------------------------ | -------------------------------------------------------------------------- |
| `normaliseGtin(gtin)`          | 14-digit GTIN; throws on wrong length, non-digits or bad check digit       |
| `validateGtin(gtin)`           | `ValidationResult<string>`                                                 |
| `gs1CheckDigit(digits)`        | The mod-10 check digit for digits without one                              |
| `getAI(ai)`                    | `AIDefinition` (title, format, primary key, data attribute…) or undefined  |
| `listAIs()`                    | Every known AI                                                             |
| `validateElement(ai, value)`   | `Issue[]` for one AI value; empty when valid                               |

### EPC binary strings (RFID)

#### `decodeEpc(input, encoding?) → ValidationResult<EpcIdentifier>`

Decodes an EPC binary string, as read from an RFID tag, to GS1 element data. `encoding` is
`"hex"` (default), `"base64url"` or `"binary"`. Covers every EPC scheme with a GS1
identification key: SGTIN, SSCC, SGLN, GRAI, GIAI, GSRN, GSRNP, GDTI, CPI, SGCN, ITIP and the
TDS 2.x "+" schemes including DSGTIN+, with any extra "+AIDC" AIs such as expiry date or batch.

```ts
decodeEpc("30164596f40c0e5cbe991a83");
// { valid: true, value: { scheme: "SGTIN-96", filter: 0, elements: [
//   { ai: "01", value: "09528765123457" }, { ai: "21", value: "123456789123" } ] } }
```

AI values are not validated here; `decompressEpcUri()` and `build()` do that.

#### `decompressEpcUri(uri, options?) → ValidationResult<string>`

Expands a Digital Link URI whose last path segment is an EPC binary string in hexadecimal
(`/eh…`) or URI-safe base 64 (`/ex…`). The stem, query string and fragment are kept, and the
result is validated.

```ts
decompressEpcUri("https://example.com/exMBZFlvQMDly-mRqD");
// { valid: true, value: "https://example.com/01/09528765123457/21/123456789123" }
```

`isEpcCompressedUri(uri)` tells whether a URI has that form, without decoding it.

### Errors

Every problem is an `Issue`:

```ts
interface Issue {
  code: IssueCode; // e.g. "AI_VALUE_INVALID", "URI_AI_SHOULD_BE_IN_PATH"
  message: string; // plain English
  ai?: string;
  linterError?: string; // GS1 reference linter error, e.g. "INCORRECT_CHECK_DIGIT"
  position?: number; // offset of the bad characters in the AI value
  length?: number;
}
```

`parse`, `build`, `normaliseGtin` and `parseElementString` throw `DigitalLinkError`, whose
`issues` property holds the list.

## Standards

| Standard                                                          | Version used           |
| ----------------------------------------------------------------- | ---------------------- |
| GS1 Digital Link Standard: URI Syntax                             | 1.7.0, ratified Aug 2026 |
| GS1 Barcode Syntax Dictionary (AI formats, linters, associations) | release 2026-01-27     |
| GS1 Digital Link URI: Compression Technical Standard for EPC binary strings | 1.0.0, Jul 2025 |
| GS1 EPC Tag Data Translation artefacts (EPC Tag Data Standard 2.2) | 2.2, 2024-11-18       |

Exported as `URI_SYNTAX_VERSION`, `SYNTAX_DICTIONARY_RELEASE` and `TDT_VERSION`.

EPC decoding is generated from GS1's Tag Data Translation artefacts and tested against GS1's
reference translator on 1,812 vectors across all 31 schemes. Two known gaps: Table F method
14.5.15 (AI 7258) gives `EPC_UNSUPPORTED`, as GS1's reference translator does not implement it
either; and the delimited-numeric method 14.5.5 follows the reference translator, as the Tag
Data Standard text was not available to check it against.

Where the dictionary release lags the URI Syntax standard, the standard wins:

- AIs (7041), (8040), (8041), (8042) and (8043) are permitted as query-string data attributes
  (URI Syntax 1.7.0 §4.10).
- AI (415) must be followed by (8020) in the path (`payTo-path = payTo-comp refNo-comp`, §4.9).

Behaviour that differs from the GS1 Syntax Engine, each following the standard's text:

- `;` is accepted as a query-string separator, as well as `&` (§4.11 `queryStringDelim`).
- `build()` writes query-string AIs in lexical order (§4.12); the engine keeps input order.

## Licence

Apache-2.0. Includes data and code derived from the GS1 Barcode Syntax Dictionary and the GS1
EPC Tag Data Translation artefacts (both Apache-2.0, © GS1 AISBL); see [NOTICE](./NOTICE).

"GS1" and "GS1 Digital Link" are trademarks of GS1 AISBL. This project is not affiliated with or
endorsed by GS1.

Maintained by [Packpath](https://packpath.co.uk), a product of Starlab Systems Limited.
