# Changelog

All notable changes to this package are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the package uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] — unreleased

### Added

- `decodeEpc()`: decode EPC binary strings (hex, base64url or binary) to GS1 element data, for
  every EPC scheme with a GS1 key, including the TDS 2.x "+" schemes and their "+AIDC" AIs.
  Generated from GS1 EPC Tag Data Translation 2.2 artefacts; tested against GS1's reference
  translator on 1,812 vectors.
- `decompressEpcUri()` and `isEpcCompressedUri()`: expand EPC-compressed Digital Link URIs
  (`/eh…`, `/ex…`) per the GS1 Digital Link URI compression standard for EPC binary strings
  1.0.0 §4.2.
- `TDT_VERSION`; issue codes `EPC_INVALID_ENCODING`, `EPC_UNKNOWN_SCHEME`, `EPC_NOT_GS1_KEY`,
  `EPC_MALFORMED`, `EPC_UNSUPPORTED`.

### Changed

- Bundle grows from about 20 KB to about 35 KB gzipped (EPC tables).

## [0.1.0] — 2026-10-19

First release.

### Added

- `parse()` and `validate()` for GS1 Digital Link URIs (URI Syntax 1.7.0): custom stems,
  key-qualifier order, query-string data attributes, extension parameters, percent-encoding.
- `build()` from GTIN data, any primary key, or element arrays; `toCanonical()`; `isDigitalLink()`.
- `parseElementString()`, `validateElementString()` and `formatElementString()` for raw scanner
  data (GS separators, symbology identifiers) and bracketed element strings.
- `normaliseGtin()`, `validateGtin()`, `gs1CheckDigit()`.
- `getAI()`, `listAIs()`, `validateElement()`, generated from GS1 Barcode Syntax Dictionary
  release 2026-01-27.
- TypeScript port of every GS1 reference linter, tested against 5,649 GS1 vectors.
- Validation of mandatory AI associations and invalid AI pairs.

[Unreleased]: https://github.com/Himashi/digital-link/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Himashi/digital-link/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Himashi/digital-link/releases/tag/v0.1.0
