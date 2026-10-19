import { describe, expect, it } from "vitest";
import { CSET_LINTERS, LINTERS, describeLintError } from "../src/linters.js";
import { AI_RANGES } from "../src/generated/ai-table.js";
import vectors from "./fixtures/gs1-linter-vectors.json" with { type: "json" };

// The reference implementation is compiled with CURRENT_YEAR=21 by default;
// its YYMMDD vectors assume that horizon.
const ctx = { currentYear: 2021 };

const byName = {
  ...LINTERS,
  csetnumeric: CSET_LINTERS.N,
  cset82: CSET_LINTERS.X,
  cset39: CSET_LINTERS.Y,
  cset64: CSET_LINTERS.Z,
};

interface Vector {
  linter: string;
  data: string;
  error?: string;
  position?: number;
  length?: number;
}

describe("GS1 reference linter vectors", () => {
  const all = vectors.vectors as Vector[];

  it(`were extracted from dictionary release ${vectors.release}`, () => {
    expect(vectors.release).toBe("2026-01-27");
    expect(all.length).toBeGreaterThan(5000);
  });

  const grouped = new Map<string, Vector[]>();
  for (const v of all) grouped.set(v.linter, [...(grouped.get(v.linter) ?? []), v]);

  for (const [name, cases] of grouped) {
    it(`${name}: ${cases.length} vectors`, () => {
      const linter = byName[name as keyof typeof byName];
      expect(linter, `linter ${name} implemented`).toBeDefined();
      const failures: string[] = [];
      for (const v of cases) {
        const got = linter!(v.data, ctx);
        const want = v.error
          ? { error: v.error, position: v.position, length: v.length }
          : undefined;
        if (JSON.stringify(got) !== JSON.stringify(want)) {
          failures.push(
            `${JSON.stringify(v.data)}: want ${JSON.stringify(want)} got ${JSON.stringify(got)}`,
          );
        }
      }
      expect(failures).toEqual([]);
    });
  }
});

describe("gcppos1 / gcppos2 (loop-generated reference cases)", () => {
  it("accepts data whose first four characters are digits", () => {
    expect(LINTERS.gcppos1!("1234", ctx)).toBeUndefined();
    expect(LINTERS.gcppos1!("12345", ctx)).toBeUndefined();
    expect(LINTERS.gcppos1!("1234A", ctx)).toBeUndefined();
    expect(LINTERS.gcppos2!("X1234", ctx)).toBeUndefined();
    expect(LINTERS.gcppos2!("012345678901", ctx)).toBeUndefined();
  });

  it("rejects data too short for a GS1 Company Prefix", () => {
    for (const d of ["", "1", "12", "123"]) {
      expect(LINTERS.gcppos1!(d, ctx)).toEqual({
        error: "TOO_SHORT_FOR_GCP",
        position: 0,
        length: d.length,
      });
    }
    expect(LINTERS.gcppos2!("", ctx)).toEqual({
      error: "TOO_SHORT_FOR_GCP",
      position: 0,
      length: 0,
    });
    expect(LINTERS.gcppos2!("1", ctx)).toEqual({
      error: "TOO_SHORT_FOR_GCP",
      position: 0,
      length: 1,
    });
    expect(LINTERS.gcppos2!("1123", ctx)).toEqual({
      error: "TOO_SHORT_FOR_GCP",
      position: 1,
      length: 3,
    });
  });

  it("reports the first non-digit within the minimum GCP", () => {
    for (let i = 0; i < 4; i++) {
      const d = "1234".slice(0, i) + "A" + "1234".slice(i + 1);
      expect(LINTERS.gcppos1!(d, ctx)).toEqual({
        error: "INVALID_GCP_PREFIX",
        position: i,
        length: 1,
      });
      expect(LINTERS.gcppos2!("0" + d, ctx)).toEqual({
        error: "INVALID_GCP_PREFIX",
        position: i + 1,
        length: 1,
      });
    }
  });
});

describe("linter registry", () => {
  it("implements every linter named in the AI table", () => {
    const names = new Set(AI_RANGES.flatMap((r) => r.components.flatMap((c) => c.linters)));
    for (const n of names) expect(LINTERS[n], n).toBeDefined();
  });

  it("describes linter errors in plain English, falling back to the name", () => {
    expect(describeLintError("INCORRECT_CHECK_DIGIT")).toBe("has an incorrect check digit");
    expect(describeLintError("SOMETHING_NEW")).toBe("failed check SOMETHING_NEW");
  });
});

describe("yymmd0 century horizon (GS1 General Specifications §7.12)", () => {
  // 29 February is valid only in leap years, so it reveals the chosen century.
  it("uses the current century for years within 50 of the current year", () => {
    expect(LINTERS.yymmd0!("240229", { currentYear: 2026 })).toBeUndefined(); // 2024
    expect(LINTERS.yymmd0!("230229", { currentYear: 2026 })).toEqual({
      error: "ILLEGAL_DAY",
      position: 4,
      length: 2,
    });
  });
  it("uses the previous century for years 51 or more ahead", () => {
    // In 2000, "99" is 99 years ahead, so it means 1999: not a leap year.
    expect(LINTERS.yymmd0!("990229", { currentYear: 2000 })).toEqual({
      error: "ILLEGAL_DAY",
      position: 4,
      length: 2,
    });
    // In 2000, "96" means 1996: a leap year.
    expect(LINTERS.yymmd0!("960229", { currentYear: 2000 })).toBeUndefined();
  });
  it("uses the next century for years 50 or more behind", () => {
    // In 2099, "00" is 2100, which is not a leap year.
    expect(LINTERS.yymmd0!("000229", { currentYear: 2099 })).toEqual({
      error: "ILLEGAL_DAY",
      position: 4,
      length: 2,
    });
    expect(LINTERS.yymmd0!("000229", { currentYear: 2026 })).toBeUndefined();
  });
});
