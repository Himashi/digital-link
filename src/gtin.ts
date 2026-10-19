import { DigitalLinkError, issue, type ValidationResult } from "./errors.js";

/**
 * Compute the GS1 mod-10 check digit for a string of digits that does not yet
 * include one (GS1 General Specifications §7.9.1).
 *
 * @example gs1CheckDigit("952012345678") // "8"
 */
export function gs1CheckDigit(digits: string): string {
  if (!/^[0-9]+$/.test(digits)) {
    throw new DigitalLinkError([
      issue("GTIN_INVALID", `"${digits}" must contain only digits to compute a check digit`),
    ]);
  }
  let sum = 0;
  // Weights alternate 3, 1, 3… starting from the rightmost digit.
  for (let i = digits.length - 1, w = 3; i >= 0; i--, w = 4 - w) {
    sum += w * (digits.charCodeAt(i) - 48);
  }
  return String((10 - (sum % 10)) % 10);
}

/**
 * Validate a GTIN-8, GTIN-12, GTIN-13 or GTIN-14 and return it as 14 digits,
 * left-padded with zeros (GS1 General Specifications §2.1.1.10; GS1 Digital
 * Link URI Syntax §4.1).
 */
export function validateGtin(gtin: string): ValidationResult<string> {
  const value = gtin.trim();
  if (!/^[0-9]+$/.test(value)) {
    return {
      valid: false,
      issues: [issue("GTIN_INVALID", `GTIN "${gtin}" must contain only digits`)],
    };
  }
  if (![8, 12, 13, 14].includes(value.length)) {
    return {
      valid: false,
      issues: [
        issue(
          "GTIN_INVALID",
          `GTIN "${gtin}" has ${value.length} digits; a GTIN has 8, 12, 13 or 14 digits`,
        ),
      ],
    };
  }
  const expected = gs1CheckDigit(value.slice(0, -1));
  if (value.slice(-1) !== expected) {
    return {
      valid: false,
      issues: [
        issue(
          "GTIN_INVALID",
          `GTIN "${gtin}" has an incorrect check digit (expected ${expected}, found ${value.slice(-1)})`,
        ),
      ],
    };
  }
  return { valid: true, value: value.padStart(14, "0") };
}

/**
 * Normalise a GTIN-8, -12, -13 or -14 to the 14-digit form used in GS1
 * Digital Link URIs. Throws {@link DigitalLinkError} if it is not a valid GTIN.
 *
 * @example normaliseGtin("9520123456788") // "09520123456788"
 */
export function normaliseGtin(gtin: string): string {
  const result = validateGtin(gtin);
  if (!result.valid) throw new DigitalLinkError(result.issues);
  return result.value;
}
