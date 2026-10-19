// Validation of relationships between AIs in one message: invalid pairs
// ("ex"), mandatory associations ("req") and the digital-signature rule
// (GS1 General Specifications §4.13), as encoded in the GS1 Barcode Syntax
// Dictionary and applied by the GS1 Syntax Engine.

import { getAI } from "./ai.js";
import { issue, type Issue } from "./errors.js";
import type { AIDefinition, Element } from "./types.js";

/**
 * True if an AI other than `ignore` matching `template` is present. A template
 * is an AI or a pattern such as "35nn", where each "n" matches any digit.
 */
function present(
  elements: readonly Element[],
  template: string,
  ignore?: string,
): Element | undefined {
  const prefix = /^[0-9]*/.exec(template)?.[0] ?? "";
  return elements.find(
    (e) => e.ai.length === template.length && e.ai.startsWith(prefix) && e.ai !== ignore,
  );
}

const fmt = (group: readonly string[]): string => group.map((ai) => `(${ai})`).join(" + ");

/**
 * Check AI relationships. Expects distinct, known AIs: element-string
 * parsing merges repeats and Digital Link URIs forbid them.
 * @internal
 */
export function checkAssociations(elements: readonly Element[]): Issue[] {
  const issues: Issue[] = [];

  for (const el of elements) {
    // Callers only pass known AIs.
    const def = getAI(el.ai) as AIDefinition;

    for (const template of def.spec.ex) {
      const other = present(elements, template, el.ai);
      if (other) {
        issues.push(
          issue(
            "AI_INVALID_PAIR",
            `AI (${el.ai}) ${def.title} must not be used together with AI (${other.ai})`,
            { ai: el.ai },
          ),
        );
      }
    }

    for (const alternatives of def.spec.req) {
      const satisfied = alternatives.some((group) =>
        group.every((template) => present(elements, template, el.ai)),
      );
      if (!satisfied) {
        issues.push(
          issue(
            "AI_REQUIRES_ASSOCIATION",
            `AI (${el.ai}) ${def.title} must be used together with ` +
              alternatives.map(fmt).join(" or "),
            { ai: el.ai },
          ),
        );
      }
    }
  }

  // AIs (253), (255) and (8003) must carry their optional serial component
  // when signed with AI (8030).
  if (present(elements, "8030")) {
    for (const ai of ["253", "255", "8003"]) {
      const el = present(elements, ai);
      const def = getAI(ai);
      if (el && def && el.value.length === def.minLength) {
        issues.push(
          issue(
            "AI_DIGSIG_REQUIRES_SERIAL",
            `AI (${ai}) ${def.title} must include its serial component when used with AI (8030)`,
            { ai },
          ),
        );
      }
    }
  }

  return issues;
}
