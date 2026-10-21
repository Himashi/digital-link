#!/usr/bin/env node
// Generates test/fixtures/epc-vectors.json: random EPC binary strings for
// every EPC scheme with a GS1 Digital Link form, each with the GS1 Digital
// Link URI that GS1's own reference implementation decodes it to.
//
//   node scripts/generate-epc-vectors.mjs <path to a clone of github.com/gs1/TDT>
//
// The reference is demo/TDTtranslator.js from that repository (Apache-2.0,
// (c) GS1 AISBL), run against the TDT 2.2 artefacts vendored in data/tdt.
// Legacy (pre-TDS 2.0) strings are built from the TDT field definitions;
// TDS 2.x "+" strings are encoded by the reference translator itself from
// random AI data, including extra "+AIDC" AIs. Random values are seeded, so
// the output is reproducible.

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { gs1CheckDigit, validateElement } from "../dist/index.js";

const [tdtRepo] = process.argv.slice(2);
if (!tdtRepo) {
  console.error("usage: node scripts/generate-epc-vectors.mjs <gs1/TDT clone>");
  process.exit(2);
}
const commit = execFileSync("git", ["-C", tdtRepo, "rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
const STEM = "https://example.com";
const PER_OPTION = 12;

// --- Load the reference translator ------------------------------------------

const dataDir = new URL("../data/tdt/", import.meta.url);
const load = (file) => JSON.parse(readFileSync(new URL(file, dataDir), "utf8"));
// Two fixes to the reference's BINARY decoding, so that it decodes as the
// TDT definitions say. Each must apply exactly once.
const PATCHES = [
  [
    // parseInt loses precision above 2^53 (e.g. GIAI-96 asset references).
    "let value = parseInt(matchGroups[field.seq], 2).toString();",
    'let value = BigInt("0b" + matchGroups[field.seq]).toString();',
  ],
  [
    // A field of length 0 (e.g. GDTI-96 document type with a 12-digit GS1
    // Company Prefix) holds no digits; prePad left it as "0".
    'internalMap[field.name] = prePad(value, "0", field.length);',
    'internalMap[field.name] = field.length === 0 ? "" : prePad(value, "0", field.length);',
  ],
];
let source = readFileSync(join(tdtRepo, "demo/TDTtranslator.js"), "utf8");
for (const [from, to] of PATCHES) {
  if (source.split(from).length !== 2) throw new Error(`Patch does not apply: ${from}`);
  source = source.replace(from, to);
}
const context = vm.createContext({
  console: { debug() {}, info() {}, log() {}, warn() {}, error() {} },
  fetch: () => new Promise(() => {}), // data is injected below instead
  BigInt,
});
vm.runInContext(source + "\nglobalThis.TDTtranslator = TDTtranslator;", context);
const tdt = new context.TDTtranslator();
const manifest = load("manifest.json");
tdt.tdtData = { table: {}, scheme: {} };
for (const { table, file } of manifest.tables) {
  tdt.tdtData.table[table] = Object.fromEntries(load(file).rows.map((r) => [r.a, r]));
}
for (const { scheme, file } of manifest.definitionFiles) tdt.tdtData.scheme[scheme] = load(file);
const reference = (input, scheme, level, options) => {
  try {
    return tdt.translate(input, scheme, level, { ...options });
  } catch {
    return undefined;
  }
};

// --- Seeded random values ----------------------------------------------------

let seed = 20261021;
const random = () => {
  // mulberry32
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const int = (lo, hi) => lo + Math.floor(random() * (hi - lo + 1));
const bigInt = (lo, hi) => {
  const span = hi - lo + 1n;
  let n = 0n;
  for (let i = 0; i < 4; i++) n = (n << 32n) | BigInt(Math.floor(random() * 2 ** 32));
  return lo + (n % span);
};
const pick = (s) => s[int(0, s.length - 1)];
const CSET82 =
  "!\"%&'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
const CSET39 = "#-/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const text = (set, min, max) => Array.from({ length: int(min, max) }, () => pick(set)).join("");
const digits = (n) => text("0123456789", n, n);
const withCheck = (body) => body + gs1CheckDigit(body);
const date = () =>
  `${digits(2)}${String(int(1, 12)).padStart(2, "0")}${String(int(1, 28)).padStart(2, "0")}`;

// --- Legacy schemes: bits from the TDT field definitions --------------------

function legacyBits(option) {
  const fields = Object.fromEntries(option.field.map((f) => [f.name, f]));
  let bits = "";
  for (const token of option.grammar.match(/('.*?'|[^'\s]+)(?=\s|\s*$)/g)) {
    const literal = /^'(.*)'$/.exec(token);
    if (literal) {
      bits += literal[1];
      continue;
    }
    const f = fields[token];
    if (f.compaction) {
      const width = Number.parseInt(f.compaction, 10);
      const capacity = f.bitLength ? Math.floor(f.bitLength / width) : 24;
      const value = text(width === 6 ? CSET39 : CSET82, 1, capacity);
      let b = [...value]
        .map((c) => (c.charCodeAt(0) & ((1 << width) - 1)).toString(2).padStart(width, "0"))
        .join("");
      if (f.bitLength) b = b.padEnd(f.bitLength, "0");
      bits += b;
    } else {
      let lo = BigInt(f.decimalMinimum);
      let hi = BigInt(f.decimalMaximum);
      if (f.name === "prependedserial") lo = hi > 10n ** 12n ? 10n ** 12n : lo; // TDS: a leading '1'
      if (f.name === "filter") hi = 7n;
      bits += bigInt(lo, hi).toString(2).padStart(f.bitLength, "0");
    }
  }
  return bits;
}

// --- TDS 2.x "+" schemes: AI data encoded by the reference ------------------

const keyValue = {
  "01": () => withCheck(digits(13)),
  "00": () => withCheck(digits(17)),
  414: () => withCheck(digits(12)),
  8017: () => withCheck(digits(17)),
  8018: () => withCheck(digits(17)),
  8006: () => {
    const total = int(1, 99);
    return (
      withCheck(digits(13)) +
      String(int(1, total)).padStart(2, "0") +
      String(total).padStart(2, "0")
    );
  },
  8003: () => "0" + withCheck(digits(12)) + text(CSET82, 0, 16),
  8004: () => (random() < 0.5 ? digits(int(6, 30)) : digits(int(6, 12)) + text(CSET82, 1, 12)),
  253: () => withCheck(digits(12)) + text(CSET82, 0, 17),
  255: () => withCheck(digits(12)) + (random() < 0.3 ? "" : String(int(1, 999999999999))),
  8010: () => digits(int(6, 12)) + text(CSET39, 0, 12),
  8011: () => String(int(1, 999999999999)),
  21: () => text(CSET82, 1, 20),
  254: () => text(CSET82, 1, 20),
  date,
};

// Extra AIs covering every Table F method the reference implements.
const extraValue = {
  10: () => text(CSET82, 1, 20),
  17: date,
  11: date,
  3103: () => digits(6),
  7003: () => date() + String(int(0, 23)).padStart(2, "0") + String(int(0, 59)).padStart(2, "0"),
  7007: () => (random() < 0.5 ? date() : date() + date()),
  7011: () => date() + ["", String(int(0, 23)).padStart(2, "0")][int(0, 1)],
  8008: () =>
    date() +
    [2, 4, 6]
      .slice(0, int(1, 3))
      .map((n) => String(int(0, n === 2 ? 23 : 59)).padStart(2, "0"))
      .join(""),
  4324: () => date() + String(int(0, 23)).padStart(2, "0") + String(int(0, 59)).padStart(2, "0"),
  4307: () => pick(["GB", "FR", "DE", "LK", "US"]),
  4330: () => digits(6) + (random() < 0.5 ? "-" : ""),
  4321: () => pick("01"),
  30: () => String(int(1, 99999999)),
  235: () => text(CSET82, 1, 28),
  7023: () => digits(int(1, 12)) + text(CSET82, 0, 6),
};

function plusJson(jsonOption) {
  const ais = jsonOption.aiSequence;
  const pairs = ais.map((ai) => [
    ai,
    (/^1[13567]$|^700[67]$/.test(ai) ? keyValue.date : keyValue[ai])(),
  ]);
  for (const [ai, gen] of Object.entries(extraValue)) {
    if (random() < 0.3 && !ais.includes(ai)) pairs.push([ai, gen()]);
  }
  return pairs.filter(([ai, v]) => validateElement(ai, v).length === 0 || ais.includes(ai));
}

// --- Generate -----------------------------------------------------------------

const toHex = (bits) =>
  (bits.padEnd(Math.ceil(bits.length / 4) * 4, "0").match(/.{4}/g) ?? [])
    .map((b) => Number.parseInt(b, 2).toString(16))
    .join("");

const vectors = [];
const skipped = {};
for (const file of readdirSync(dataDir).filter(
  (f) => /^[A-Z].*\.json$/.test(f) && !f.startsWith("TDT_"),
)) {
  const scheme = load(file)["tdt:epcTagDataTranslation"].scheme;
  const levels = Object.fromEntries(scheme.level.map((l) => [l.type, l]));
  if (!levels.GS1_DIGITAL_LINK) continue;
  for (const option of levels.BINARY.option) {
    const jsonOption = levels.GS1_AI_JSON.option.find((o) => o.optionKey === option.optionKey);
    let made = 0;
    for (let attempt = 0; made < PER_OPTION && attempt < PER_OPTION * 20; attempt++) {
      let bits;
      if (option.encodedAI) {
        const pairs = plusJson(jsonOption);
        const json =
          "{" +
          pairs.map(([ai, v]) => `${JSON.stringify(ai)}:${JSON.stringify(v)}`).join(",") +
          "}";
        bits = reference(json, scheme.name, "BINARY", { filter: int(0, 7) });
      } else {
        bits = legacyBits(option);
      }
      const expected = bits && reference(bits, scheme.name, "GS1_DIGITAL_LINK", { uriStem: STEM });
      if (!expected || expected.includes("undefined") || expected.includes("NaN")) {
        skipped[scheme.name] = (skipped[scheme.name] ?? 0) + 1;
        continue;
      }
      vectors.push({ scheme: scheme.name, hex: toHex(bits), expected });
      made++;
    }
  }
}

writeFileSync(
  new URL("../test/fixtures/epc-vectors.json", import.meta.url),
  JSON.stringify(
    {
      source: `GS1 TDT reference translator (github.com/gs1/TDT demo/TDTtranslator.js, commit ${commit}), TDT ${manifest.date.slice(0, 10)} artefacts`,
      patches: PATCHES.map(([from, to]) => `${from} -> ${to}`),
      stem: STEM,
      vectors,
    },
    null,
    1,
  ) + "\n",
);
console.log(`${vectors.length} vectors; reference could not decode:`, skipped);
