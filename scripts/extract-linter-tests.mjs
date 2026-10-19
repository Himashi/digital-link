#!/usr/bin/env node
// Extracts the unit-test vectors embedded in the GS1 reference linters
// (UNIT_TEST_PASS / UNIT_TEST_FAIL in src/lint_*.c of
// https://github.com/gs1/gs1-syntax-dictionary) into
// test/fixtures/gs1-linter-vectors.json, so the TypeScript port is tested
// against GS1's own expectations.
//
// Usage: node scripts/extract-linter-tests.mjs /path/to/gs1-syntax-dictionary

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2];
if (!root) {
  console.error("Usage: extract-linter-tests.mjs <gs1-syntax-dictionary checkout>");
  process.exit(1);
}
const release = /^# Release: (\S+)/m.exec(
  readFileSync(join(root, "gs1-syntax-dictionary.txt"), "utf8"),
)?.[1];

// A C string literal (possibly several adjacent ones) with simple escapes.
const STR = String.raw`((?:"(?:[^"\\]|\\.)*"\s*)+)`;
const RE = new RegExp(
  String.raw`^\s*UNIT_TEST_(PASS|FAIL)\(gs1_lint_(\w+),\s*${STR}(?:,\s*GS1_LINTER_(\w+),\s*${STR})?\);\s*(?://.*)?$`,
);

function cString(lit) {
  let out = "";
  for (const part of lit.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    out += part[1].replace(/\\(x[0-9A-Fa-f]{2}|.)/g, (_, e) => {
      if (e[0] === "x") return String.fromCharCode(parseInt(e.slice(1), 16));
      const map = { n: "\n", t: "\t", r: "\r", 0: "\0", '"': '"', "\\": "\\", "'": "'" };
      if (!(e in map)) throw new Error(`Unsupported escape \\${e}`);
      return map[e];
    });
  }
  return out;
}

const vectors = [];
let skipped = 0;
for (const file of readdirSync(join(root, "src")).filter((f) => /^lint_[a-z0-9]+\.c$/.test(f))) {
  for (const line of readFileSync(join(root, "src", file), "utf8").split("\n")) {
    if (!line.includes("UNIT_TEST_")) continue;
    if (line.includes("#define")) continue;
    const m = RE.exec(line);
    if (!m) {
      skipped++;
      continue;
    }
    const [, kind, linter, data, error, highlight] = m;
    const v = { linter, data: cString(data) };
    if (kind === "FAIL") {
      // Highlight marks the error span with "*": "1234567*3*". Solve for the
      // span rather than searching for "*", since data may contain "*".
      const h = cString(highlight);
      const d = v.data;
      let span;
      for (let p = 0; p <= d.length && !span; p++) {
        // Prefer the longest span: "*" highlighted as "***" is one character, not zero.
        for (let l = d.length - p; l >= 0; l--) {
          if (h === `${d.slice(0, p)}*${d.slice(p, p + l)}*${d.slice(p + l)}`) {
            span = { p, l };
            break;
          }
        }
      }
      if (!span) throw new Error(`Cannot locate highlight ${h} in ${d}`);
      v.error = error;
      v.position = span.p;
      v.length = span.l;
    }
    vectors.push(v);
  }
}

const out = new URL("../test/fixtures/gs1-linter-vectors.json", import.meta.url);
writeFileSync(out, JSON.stringify({ release, vectors }, null, 0).replace(/},{/g, "},\n{") + "\n");
console.log(
  `Extracted ${vectors.length} vectors (release ${release}); skipped ${skipped} non-literal lines`,
);
