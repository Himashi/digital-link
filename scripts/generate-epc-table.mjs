#!/usr/bin/env node
// Generates src/generated/epc-table.ts from the vendored GS1 EPC Tag Data
// Translation 2.2 artefacts (data/tdt/*.json, Apache-2.0, (c) GS1 AISBL).
//
// Only what decoding needs is kept: for each EPC scheme that has a GS1
// Digital Link form, the BINARY level (bit patterns and fields), the
// GS1_DIGITAL_LINK grammar that says which AI each field belongs to, and the
// rules between them;
// plus TDT Table F (encoding of AI values in TDS 2.x "+" schemes) and Table K
// (AI length from its first two digits).

import { readFileSync, writeFileSync } from "node:fs";

const dir = new URL("../data/tdt/", import.meta.url);
const outPath = new URL("../src/generated/epc-table.ts", import.meta.url);
const read = (file) => JSON.parse(readFileSync(new URL(file, dir), "utf8"));

const manifest = read("manifest.json");
const fail = (msg) => {
  throw new Error(msg);
};

function parseRule(rule) {
  const m = /^([A-Z0-9]+)\((.+)\)$/.exec(rule.function) ?? fail(`Bad rule ${rule.function}`);
  const fn = m[1];
  if (!["SUBSTR", "CONCAT", "GS1CHECKSUM", "URLENCODE"].includes(fn))
    fail(`Unsupported rule ${fn}`);
  return { out: rule.newFieldName, fn, args: m[2].split(",") };
}

const tokens = (grammar) => grammar.match(/('.*?'|[^'\s]+)(?=\s|\s*$)/g);

function binaryField(field, tagEncodingOption) {
  const out = { name: field.name };
  if (field.encoding !== undefined) {
    if (field.encoding !== "dateYYMMDD" || field.bitLength !== 16)
      fail(`Bad encoding ${field.name}`);
    out.kind = "date";
  } else if (field.compaction !== undefined) {
    const m = /^([678])-bit$/.exec(field.compaction) ?? fail(`Bad compaction ${field.compaction}`);
    out.kind = "chars";
    out.chars = Number(m[1]);
  } else if (field.decimalMinimum !== undefined) {
    out.kind = "int";
    out.min = field.decimalMinimum;
    out.max = field.decimalMaximum;
    let length = field.length;
    if (length === undefined) {
      // TDT gives the digit count of some numeric fields only at the
      // TAG_ENCODING level, as zero padding.
      const tag = tagEncodingOption?.field.find((f) => f.name === field.name);
      if (tag?.padChar !== undefined) {
        if (tag.padChar !== "0" || tag.padDir !== "LEFT") fail(`Bad padding ${field.name}`);
        length = tag.length;
      }
    }
    if (length !== undefined) out.length = length;
  } else {
    fail(`Field ${field.name} has no decodable type`);
  }
  return out;
}

const schemes = [];
const otherHeaders = {};

for (const { file } of manifest.definitionFiles) {
  const scheme = read(file)["tdt:epcTagDataTranslation"].scheme;
  const levels = Object.fromEntries(scheme.level.map((l) => [l.type, l]));
  const binary = levels.BINARY ?? fail(`${scheme.name} has no BINARY level`);
  if (!/^[01]{8}$/.test(binary.prefixMatch)) fail(`${scheme.name}: unexpected header`);

  const dl = levels.GS1_DIGITAL_LINK;
  if (!dl) {
    otherHeaders[binary.prefixMatch] = scheme.name;
    continue;
  }

  const options = binary.option.map((option) => {
    const fields = [...option.field].sort((a, b) => a.seq - b.seq);
    fields.forEach((f, i) => f.seq === i + 1 || fail(`${scheme.name}: field seq gap`));
    const tagOption = levels.TAG_ENCODING?.option.find((o) => o.optionKey === option.optionKey);
    const dlOption =
      dl.option.find((o) => o.optionKey === option.optionKey) ??
      fail(`${scheme.name}: no GS1_DIGITAL_LINK option ${option.optionKey}`);
    const grammar = tokens(dlOption.grammar);
    if (grammar[0] !== "uriStem") fail(`${scheme.name}: grammar does not start with uriStem`);
    new RegExp(option.pattern); // must compile
    const out = {
      key: option.optionKey,
      pattern: option.pattern,
      fields: fields.map((f) => binaryField(f, tagOption)),
      grammar: grammar.slice(1),
    };
    if (option.encodedAI) {
      if (!option.grammar.endsWith(" encodedAI")) fail(`${scheme.name}: encodedAI not last`);
      out.encodedAI = option.encodedAI.map(({ ai, name }) => ({ ai, name }));
    }
    return out;
  });

  schemes.push({
    name: scheme.name,
    header: binary.prefixMatch,
    // The partition option key is the GS1 Company Prefix length, used by rules.
    ...(scheme.optionKey === "gs1companyprefixlength" ? { optionIsGcpLength: true } : {}),
    options,
    extract: (binary.rule ?? []).filter((r) => r.type === "EXTRACT").map(parseRule),
    format: (dl.rule ?? []).filter((r) => r.type === "FORMAT").map(parseRule),
  });
}

const tableF = {};
for (const row of read("TDT_TableF.json").rows) {
  const comp = (method, chars, bits, lenBits, max) => {
    const c = { method };
    if (chars !== undefined) c.chars = Number(chars);
    if (bits !== undefined) c.bits = Number(bits);
    if (lenBits !== undefined) c.lenBits = Number(lenBits);
    if (max !== undefined) c.max = Number(max);
    return c;
  };
  const comps = [comp(row.c, row.d, row.e, row.g, row.h)];
  if (row.j) comps.push(comp(row.j, row.k, row.l, row.n, row.o));
  for (const c of [row.f, row.m])
    if (c !== undefined && c !== "3") fail(`AI ${row.a}: indicator bits`);
  tableF[row.a] = comps;
}

const tableK = {};
for (const row of read("TDT_TableK.json").rows) {
  const digits = Number(row.b);
  if (Number(row.c) !== (digits - 2) * 4) fail(`Table K ${row.a}: bits do not match length`);
  tableK[row.a] = digits;
}

const json = (v) => JSON.stringify(v, null, 2);
writeFileSync(
  outPath,
  `// GENERATED FILE — do not edit. Run \`pnpm generate\`.
//
// Source: GS1 EPC Tag Data Translation (TDT) ${read(manifest.definitionFiles[0].file)["tdt:epcTagDataTranslation"].version} artefacts, ${manifest.date.slice(0, 10)}
// https://github.com/gs1/TDT/tree/main/artefacts/JSON
// (c) GS1 AISBL. Licensed under the Apache License, Version 2.0.

import type { EpcScheme, TableFComponent } from "../epc-types.js";

/** Version of the GS1 EPC Tag Data Translation artefacts these tables were generated from. */
export const TDT_VERSION = "${read(manifest.definitionFiles[0].file)["tdt:epcTagDataTranslation"].version}";

/** EPC schemes that have a GS1 Digital Link form, keyed by their 8-bit header. */
export const EPC_SCHEMES: readonly EpcScheme[] = ${json(schemes)};

/** Headers of EPC schemes with no GS1 Digital Link form. */
export const OTHER_EPC_HEADERS: Readonly<Record<string, string>> = ${json(otherHeaders)};

/** TDT Table F: how each AI's value is encoded in TDS 2.x "+" schemes. */
export const TABLE_F: Readonly<Record<string, readonly TableFComponent[]>> = ${json(tableF)};

/** TDT Table K: number of digits in an AI, from its first two digits. */
export const TABLE_K: Readonly<Record<string, number>> = ${json(tableK)};
`,
);
console.log(`Wrote ${schemes.length} schemes, ${Object.keys(tableF).length} Table F rows.`);
