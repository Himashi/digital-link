/** Machine-readable codes for every problem this library reports. */
export type IssueCode =
  // URI structure
  | "URI_ILLEGAL_CHARACTER"
  | "URI_ILLEGAL_SCHEME"
  | "URI_MISSING_HOST"
  | "URI_ILLEGAL_HOST_CHARACTER"
  | "URI_NO_PRIMARY_KEY"
  | "URI_TRAILING_SLASH"
  | "URI_EMPTY_PATH_VALUE"
  | "URI_EMPTY_QUERY_VALUE"
  | "URI_NUL_CHARACTER"
  | "URI_INVALID_KEY_QUALIFIER_SEQUENCE"
  | "URI_UNKNOWN_AI_IN_QUERY"
  | "URI_AI_NOT_DATA_ATTRIBUTE"
  | "URI_AI_SHOULD_BE_IN_PATH"
  | "URI_DUPLICATE_AI"
  // Element strings
  | "ELEMENT_STRING_EMPTY"
  | "ELEMENT_STRING_MALFORMED"
  | "ELEMENT_STRING_UNKNOWN_AI"
  | "ELEMENT_STRING_VALUE_TOO_LONG"
  | "ELEMENT_STRING_REPEATED_AI_DIFFERENT_VALUE"
  // AI values
  | "AI_UNKNOWN"
  | "AI_VALUE_EMPTY"
  | "AI_VALUE_TOO_SHORT"
  | "AI_VALUE_TOO_LONG"
  | "AI_VALUE_INVALID"
  // AI relationships (GS1 General Specifications §4.13)
  | "AI_INVALID_PAIR"
  | "AI_REQUIRES_ASSOCIATION"
  | "AI_DIGSIG_REQUIRES_SERIAL"
  // Build input
  | "BUILD_NO_PRIMARY_KEY"
  | "BUILD_INVALID_STEM"
  // GTIN
  | "GTIN_INVALID"
  // EPC binary strings (Tag Data Standard)
  | "EPC_INVALID_ENCODING"
  | "EPC_UNKNOWN_SCHEME"
  | "EPC_NOT_GS1_KEY"
  | "EPC_MALFORMED"
  | "EPC_UNSUPPORTED";

/** A single, human-readable validation problem. */
export interface Issue {
  readonly code: IssueCode;
  /** Plain-English description, suitable for showing to a user. */
  readonly message: string;
  /** The AI concerned, when there is one. */
  readonly ai?: string;
  /**
   * For value errors, the GS1 reference linter error name, e.g.
   * `"INCORRECT_CHECK_DIGIT"`.
   */
  readonly linterError?: string;
  /** For value errors, offset of the offending characters within the AI value. */
  readonly position?: number;
  /** For value errors, number of offending characters. */
  readonly length?: number;
}

/** Thrown by functions that do not return a validation result. */
export class DigitalLinkError extends Error {
  override readonly name = "DigitalLinkError";
  readonly issues: readonly Issue[];

  constructor(issues: readonly Issue[]) {
    super(issues.map((i) => i.message).join("; "));
    this.issues = issues;
  }
}

/** Result of a `validate*` function: either a value or a non-empty list of issues. */
export type ValidationResult<T> =
  | { readonly valid: true; readonly value: T }
  | { readonly valid: false; readonly issues: readonly Issue[] };

/** @internal */
export function issue(
  code: IssueCode,
  message: string,
  extra?: Omit<Issue, "code" | "message">,
): Issue {
  return { code, message, ...extra };
}
