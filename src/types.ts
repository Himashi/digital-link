/** Character set of an AI component, as named in the GS1 General Specifications. */
export type CharacterSet =
  /** Digits 0-9. */
  | "N"
  /** GS1 AI encodable character set 82. */
  | "X"
  /** GS1 AI encodable character set 39. */
  | "Y"
  /** GS1 AI encodable character set 64 (file-safe / URI-safe base64). */
  | "Z";

/** One component of an AI's data field. */
export interface ComponentSpec {
  readonly cset: CharacterSet;
  readonly min: number;
  readonly max: number;
  readonly optional: boolean;
  /** Names of GS1 reference linters applied to this component. */
  readonly linters: readonly string[];
}

/**
 * One entry (single AI or AI range) from the GS1 Barcode Syntax Dictionary.
 * @internal
 */
export interface AIRangeSpec {
  readonly from: string;
  readonly to: string;
  readonly predefinedLength: boolean;
  readonly dataAttribute: boolean;
  readonly components: readonly ComponentSpec[];
  /** Each inner array is a "req=" attribute: a list of alternative AI groups. */
  readonly req: readonly (readonly (readonly string[])[])[];
  readonly ex: readonly string[];
  /** Alternative ordered qualifier sequences, if this AI is a Digital Link primary key. */
  readonly dlpkey?: readonly (readonly string[])[];
  /** Qualifiers that must always follow this primary key in a Digital Link URI path. */
  readonly dlpkeyMandatory?: readonly string[];
  readonly title: string;
}

/** Definition of a single GS1 Application Identifier. */
export interface AIDefinition {
  /** The AI, e.g. `"01"`. */
  readonly ai: string;
  /** Short title from the GS1 Barcode Syntax Dictionary, e.g. `"GTIN"`. */
  readonly title: string;
  /**
   * True if the AI has a predefined length and so needs no FNC1 / GS
   * separator in an element string.
   */
  readonly predefinedLength: boolean;
  /** True if the AI may appear as a data attribute in a Digital Link query string. */
  readonly dataAttribute: boolean;
  /** True if the AI may be a Digital Link primary key. */
  readonly primaryKey: boolean;
  /** For primary keys: the alternative ordered sequences of key qualifiers. */
  readonly qualifiers: readonly (readonly string[])[];
  readonly components: readonly ComponentSpec[];
  readonly minLength: number;
  readonly maxLength: number;
  /** @internal */
  readonly spec: AIRangeSpec;
}

/** An AI and its value, e.g. `{ ai: "10", value: "ABC123" }`. */
export interface Element {
  readonly ai: string;
  readonly value: string;
}
