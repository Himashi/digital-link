// Differential test against GS1's reference implementation: every vector in
// test/fixtures/epc-vectors.json was decoded by GS1's TDT translator
// (scripts/generate-epc-vectors.mjs). Ours must yield the same AIs, and
// decompressEpcUri() must accept exactly those whose AI data is valid.

import { describe, expect, it } from "vitest";
import { build, decodeEpc, decompressEpcUri, validate, type Element } from "../src/index.js";
import fixture from "./fixtures/epc-vectors.json" with { type: "json" };

const opts = { currentYear: 2026 };

/**
 * AIs of the reference's output URI. Read loosely, as the reference does not
 * always percent-encode as the URI syntax requires.
 */
function referenceElements(uri: string): Element[] {
  const [path = "", query = ""] = uri.slice(fixture.stem.length + 1).split("?");
  const segments = path.split("/");
  const out: Element[] = [];
  for (let i = 0; i < segments.length; i += 2) {
    out.push({ ai: segments[i] as string, value: decodeURIComponent(segments[i + 1] as string) });
  }
  for (const pair of query.split("&").filter(Boolean)) {
    const [ai = "", value = ""] = pair.split("=");
    out.push({ ai, value: decodeURIComponent(value) });
  }
  return out;
}

const sorted = (elements: readonly Element[]): string[] =>
  elements.map((e) => `${e.ai}=${e.value}`).sort();

function buildable(elements: readonly Element[]): boolean {
  try {
    build(elements, fixture.stem, opts);
    return true;
  } catch {
    return false;
  }
}

describe(`EPC decoding matches GS1's reference translator (${fixture.vectors.length} vectors)`, () => {
  const byScheme = new Map<string, (typeof fixture.vectors)[number][]>();
  for (const v of fixture.vectors) byScheme.set(v.scheme, [...(byScheme.get(v.scheme) ?? []), v]);
  for (const [scheme, vectors] of byScheme) {
    it(scheme, () => {
      for (const v of vectors) {
        const expected = referenceElements(v.expected);
        const decoded = decodeEpc(v.hex);
        expect(decoded, v.hex).toMatchObject({ valid: true, value: { scheme } });
        if (!decoded.valid) continue;
        expect(sorted(decoded.value.elements), v.hex).toEqual(sorted(expected));

        const uri = decompressEpcUri(`${fixture.stem}/eh${v.hex}`, opts);
        expect(uri.valid, `${v.hex} → ${v.expected}`).toBe(buildable(expected));
        if (uri.valid) {
          const parsed = validate(uri.value, opts);
          expect(parsed.valid && sorted(parsed.value.elements)).toEqual(sorted(expected));
        }
      }
    });
  }

  it("covers every scheme with a GS1 Digital Link form", () => {
    expect(new Set(fixture.vectors.map((v) => v.scheme)).size).toBe(31);
  });
});
