#!/usr/bin/env node
// Generates src/generated/ai-table.ts from the vendored GS1 Barcode Syntax
// Dictionary (data/gs1-syntax-dictionary.txt, Apache-2.0, (c) GS1 AISBL).
//
// The dictionary is the machine-readable source of AI formats, linters,
// Digital Link primary keys / qualifiers, data-attribute permissions and
// mandatory/invalid AI pairings. Generating from it (rather than hand-typing
// rules) keeps this library aligned with GS1's own reference data.

import { readFileSync, writeFileSync } from "node:fs";

const dictPath = new URL("../data/gs1-syntax-dictionary.txt", import.meta.url);
const outPath = new URL("../src/generated/ai-table.ts", import.meta.url);

const text = readFileSync(dictPath, "utf8");
const release = /^# Release: (\S+)/m.exec(text)?.[1];
if (!release || release === "UNSET") {
  throw new Error("Dictionary has no release tag; vendor a tagged release.");
}

const FLAG_CHARS = new Set([..."*!?\"$%&'()+,-./:;<=>@[\\]^_`{|}~"]);
const LINTER_RE = /^[a-z0-9]+$/;

function parseComponent(token) {
  let optional = false;
  let body = token;
  // "[N4],hhmi" or "[N3],iso3166" — optional component with trailing linters
  const opt = /^\[([^\]]+)\](.*)$/.exec(body);
  if (opt) {
    optional = true;
    body = opt[1] + opt[2];
  }
  const [type, ...linters] = body.split(",");
  const m = /^([NXYZ])(?:(\d+)|\.\.(\d+))$/.exec(type);
  if (!m) throw new Error(`Bad component type: ${token}`);
  for (const l of linters) if (!LINTER_RE.test(l)) throw new Error(`Bad linter: ${token}`);
  const cset = m[1];
  const min = m[2] ? Number(m[2]) : 1;
  const max = Number(m[2] ?? m[3]);
  return { cset, min, max, optional, linters };
}

function parseLine(line) {
  const hash = line.indexOf("#");
  const title = hash >= 0 ? line.slice(hash + 1).trim() : "";
  const body = (hash >= 0 ? line.slice(0, hash) : line).trim();
  const tokens = body.split(/\s+/);

  const aiToken = tokens.shift();
  const range = /^(\d{2,4})(?:-(\d{2,4}))?$/.exec(aiToken);
  if (!range) throw new Error(`Bad AI: ${line}`);
  const from = range[1];
  const to = range[2] ?? range[1];
  if (from.length !== to.length) throw new Error(`Bad AI range: ${line}`);

  let flags = "";
  if (tokens[0] && [...tokens[0]].every((c) => FLAG_CHARS.has(c))) flags = tokens.shift();

  const components = [];
  while (tokens[0] && /^\[?[NXYZ](\d|\.\.)/.test(tokens[0])) {
    components.push(parseComponent(tokens.shift()));
  }
  if (components.length === 0) throw new Error(`No components: ${line}`);

  const req = [];
  const ex = [];
  let dlpkey;
  for (const attr of tokens) {
    if (attr.startsWith("req=")) {
      req.push(
        attr
          .slice(4)
          .split(",")
          .map((group) => group.split("+")),
      );
    } else if (attr.startsWith("ex=")) {
      ex.push(...attr.slice(3).split(","));
    } else if (attr === "dlpkey") {
      dlpkey = [[]];
    } else if (attr.startsWith("dlpkey=")) {
      dlpkey = attr
        .slice(7)
        .split("|")
        .map((seq) => seq.split(","));
    } else {
      throw new Error(`Unknown attribute "${attr}" in: ${line}`);
    }
  }

  return {
    from,
    to,
    predefinedLength: flags.includes("*"),
    dataAttribute: flags.includes("?"),
    components,
    req,
    ex,
    ...(dlpkey ? { dlpkey } : {}),
    title,
  };
}

// Where the normative GS1 Digital Link URI Syntax standard and the dictionary
// disagree, the standard wins. Each override cites the clause it implements.
const URI_SYNTAX_VERSION = "1.7.0";
const OVERRIDES = {
  // URI Syntax 1.7.0 §4.10 defines ufrgtUnitTypeParameter, imeiParameter,
  // imei2Parameter, eSimParameter and pSimParameter as data attributes; the
  // dictionary release does not yet carry the "?" flag for them.
  dataAttribute: ["7041", "8040", "8041", "8042", "8043"],
  // URI Syntax 1.7.0 §4.9: payTo-path = payTo-comp refNo-comp, i.e. (8020) is
  // mandatory after (415). The dictionary lists it as an optional qualifier.
  mandatoryQualifiers: { 415: ["8020"] },
};

const entries = text
  .split("\n")
  .filter((l) => l.trim() !== "" && !l.startsWith("#"))
  .map(parseLine);

for (const ai of OVERRIDES.dataAttribute) {
  const entry = entries.find((e) => e.from === ai && e.to === ai);
  if (!entry) throw new Error(`Override target (${ai}) missing from dictionary`);
  if (entry.dataAttribute) throw new Error(`Override for (${ai}) no longer needed; remove it`);
  entry.dataAttribute = true;
}
for (const [ai, qualifiers] of Object.entries(OVERRIDES.mandatoryQualifiers)) {
  const entry = entries.find((e) => e.from === ai && e.to === ai);
  if (!entry?.dlpkey) throw new Error(`Override target (${ai}) is not a primary key`);
  entry.dlpkeyMandatory = qualifiers;
}

const header = `// GENERATED FILE — do not edit. Run \`pnpm generate\`.
//
// Source: GS1 Barcode Syntax Dictionary, release ${release}
// https://github.com/gs1/gs1-syntax-dictionary/tree/${release}
// Copyright (c) 2020-2021 BWIPP project; (c) 2020-2021 Zint Project;
// (c) 2021-2025 GS1 AISBL. Licensed under the Apache License, Version 2.0.
//
// Overrides applied to align with GS1 Digital Link URI Syntax ${URI_SYNTAX_VERSION}
// (see scripts/generate-ai-table.mjs):
//   data attributes added: ${OVERRIDES.dataAttribute.join(", ")}
//   mandatory qualifiers:  ${Object.entries(OVERRIDES.mandatoryQualifiers)
  .map(([k, v]) => `(${k}) requires ${v.map((q) => `(${q})`).join(" ")}`)
  .join("; ")}

import type { AIRangeSpec } from "../types.js";

/** Release tag of the GS1 Barcode Syntax Dictionary this table was generated from. */
export const SYNTAX_DICTIONARY_RELEASE = ${JSON.stringify(release)};

/** Version of the GS1 Digital Link URI Syntax standard this library implements. */
export const URI_SYNTAX_VERSION = ${JSON.stringify(URI_SYNTAX_VERSION)};

export const AI_RANGES: readonly AIRangeSpec[] = `;

writeFileSync(outPath, header + JSON.stringify(entries, null, 2) + ";\n");
console.log(`Wrote ${entries.length} AI entries (dictionary ${release}) to ${outPath.pathname}`);
