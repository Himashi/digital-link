# Changelog

All notable changes to this package are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the package uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] — unreleased

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

[Unreleased]: https://github.com/Himashi/digital-link/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Himashi/digital-link/releases/tag/v0.1.0
