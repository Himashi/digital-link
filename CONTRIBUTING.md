# Contributing

Thanks for helping. Bug reports with a failing URI or element string are the most useful thing
you can send.

## Ground rules

- **Standards first.** Every behaviour must trace to a clause of the GS1 Digital Link URI Syntax
  standard, the GS1 General Specifications, or GS1 reference data. Cite the section in the code
  or test.
- **No hand-typed AI rules.** AI formats come from the GS1 Barcode Syntax Dictionary in
  `data/`. If the dictionary and the URI Syntax standard disagree, add an override in
  `scripts/generate-ai-table.mjs` with the clause it implements.
- **Zero runtime dependencies.** The package must run in browsers, Node.js and Cloudflare Workers.
- **Tests with every change.** Coverage must stay at or above 95%.

## Setup

```sh
pnpm install
pnpm test        # vitest with coverage
pnpm lint && pnpm typecheck && pnpm build && pnpm test:smoke
```

## Updating to a new GS1 dictionary release

1. Replace `data/gs1-syntax-dictionary.txt` with the tagged release from
   <https://github.com/gs1/gs1-syntax-dictionary>.
2. `pnpm generate` — regenerates `src/generated/ai-table.ts`. It fails if an override is no
   longer needed; remove it.
3. With a checkout of the same tag:
   `node scripts/extract-code-lists.mjs <checkout>` and
   `node scripts/extract-linter-tests.mjs <checkout>`.
4. Port any new or changed linters in `src/linters.ts` until `pnpm test` passes.
5. Note the release in `CHANGELOG.md` and `README.md`.

## Commits and releases

Conventional commits (`feat:`, `fix:`, `docs:` …). Releases follow semver; any change to what is
accepted or rejected is at least a minor version.
