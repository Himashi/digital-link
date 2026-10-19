#!/usr/bin/env node
// Extracts the code lists used by GS1 reference linters (ISO 3166, ISO 4217,
// PackageTypeCode, AIDC media type) from a checkout of
// https://github.com/gs1/gs1-syntax-dictionary at the release matching
// data/gs1-syntax-dictionary.txt, and writes src/generated/code-lists.ts.
//
// Usage: node scripts/extract-code-lists.mjs /path/to/gs1-syntax-dictionary
//
// Only needed when the vendored dictionary is upgraded.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2];
if (!root) {
  console.error("Usage: extract-code-lists.mjs <gs1-syntax-dictionary checkout>");
  process.exit(1);
}

const release = /^# Release: (\S+)/m.exec(
  readFileSync(join(root, "gs1-syntax-dictionary.txt"), "utf8"),
)?.[1];
const vendored = /^# Release: (\S+)/m.exec(
  readFileSync(new URL("../data/gs1-syntax-dictionary.txt", import.meta.url), "utf8"),
)?.[1];
if (release !== vendored) {
  throw new Error(`Checkout is release ${release}; vendored dictionary is ${vendored}`);
}

const src = (name) => readFileSync(join(root, "src", `lint_${name}.c`), "utf8");

// Decode a C23 binary-literal bitfield table (MSB-first, as read by
// GS1_LINTER_BITFIELD_LOOKUP) into the list of set bit indexes.
function bitfield(name, table) {
  const c = src(name);
  const start = c.indexOf(`static const uint`);
  const block = c.slice(c.indexOf(table, start));
  const c23 = block.slice(block.indexOf("#if __STDC_VERSION__"), block.indexOf("#else"));
  const words = [...c23.matchAll(/0b([01]+)/g)].map((m) => m[1]);
  if (words.length === 0) throw new Error(`No bitfield found for ${name}`);
  const set = [];
  let base = 0;
  for (const w of words) {
    for (let i = 0; i < w.length; i++) if (w[i] === "1") set.push(base + i);
    base += w.length;
  }
  return set;
}

const pad3 = (n) => String(n).padStart(3, "0");
const iso3166 = bitfield("iso3166", "iso3166[]").map(pad3);
const iso4217 = bitfield("iso4217", "iso4217[]").map(pad3);
const iso3166alpha2 = bitfield("iso3166alpha2", "iso3166alpha2[]").map(
  (v) => String.fromCharCode(65 + Math.floor(v / 26)) + String.fromCharCode(65 + (v % 26)),
);
const mediatypes = bitfield("mediatype", "mediatypes[]").map((n) => String(n).padStart(2, "0"));

const pt = src("packagetype");
const ptBlock = pt.slice(
  pt.indexOf("packagetypes[][4] = {"),
  pt.indexOf("};", pt.indexOf("packagetypes[][4]")),
);
const packagetypes = [...ptBlock.matchAll(/"([0-9A-Z]{1,3})"/g)].map((m) => m[1]);

// Sanity checks against values known from the source comments.
const must = (cond, msg) => {
  if (!cond) throw new Error(`Sanity check failed: ${msg}`);
};
must(iso3166.includes("826") && iso3166.includes("004") && !iso3166.includes("999"), "iso3166");
must(iso4217.includes("826") && iso4217.includes("978"), "iso4217 GBP/EUR");
must(
  iso3166alpha2.includes("GB") && iso3166alpha2.includes("AD") && !iso3166alpha2.includes("AA"),
  "alpha2",
);
must(
  mediatypes.join() ===
    "01,02,03,04,05,06,07,08,09,10," + Array.from({ length: 20 }, (_, i) => 80 + i).join(),
  "mediatype",
);
must(packagetypes.includes("1A") && packagetypes.includes("ZZ"), "packagetypes");

const list = (a) => JSON.stringify(a).replace(/","/g, '", "');
const out = `// GENERATED FILE — do not edit. Run scripts/extract-code-lists.mjs.
//
// Source: lint_*.c in GS1 Barcode Syntax Dictionary, release ${release}
// https://github.com/gs1/gs1-syntax-dictionary/tree/${release}/src
// Copyright (c) 2021-2025 GS1 AISBL. Licensed under the Apache License, Version 2.0.

/** ISO 3166-1 numeric country codes. */
export const ISO3166_NUMERIC: ReadonlySet<string> = new Set(${list(iso3166)});

/** ISO 3166-1 alpha-2 country codes. */
export const ISO3166_ALPHA2: ReadonlySet<string> = new Set(${list(iso3166alpha2)});

/** ISO 4217 numeric currency codes. */
export const ISO4217_NUMERIC: ReadonlySet<string> = new Set(${list(iso4217)});

/** GS1 PackageTypeCode values. */
export const PACKAGE_TYPES: ReadonlySet<string> = new Set(${list(packagetypes)});

/** AIDC media type values. */
export const MEDIA_TYPES: ReadonlySet<string> = new Set(${list(mediatypes)});
`;

writeFileSync(new URL("../src/generated/code-lists.ts", import.meta.url), out);
console.log(
  `iso3166=${iso3166.length} alpha2=${iso3166alpha2.length} iso4217=${iso4217.length} packagetypes=${packagetypes.length} mediatypes=${mediatypes.length}`,
);
