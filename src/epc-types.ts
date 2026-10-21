// Shapes of the generated EPC tables (src/generated/epc-table.ts).

/** A field of an EPC binary encoding, in bit order. */
export interface EpcField {
  readonly name: string;
  /**
   * `int`: unsigned binary integer, written in decimal; `chars`: characters
   * of `chars` bits each; `date`: YYMMDD in 16 bits.
   */
  readonly kind: "int" | "chars" | "date";
  readonly chars?: 6 | 7 | 8;
  /** For `int`: decimal digits, zero-padded on the left. */
  readonly length?: number;
  readonly min?: string;
  readonly max?: string;
}

/** A TDT rule: `out = fn(args…)`. Args are field names, digits or `'literal'`. */
export interface EpcRule {
  readonly out: string;
  readonly fn: "SUBSTR" | "CONCAT" | "GS1CHECKSUM" | "URLENCODE";
  readonly args: readonly string[];
}

/** One binary layout of a scheme, e.g. one GS1 Company Prefix partition. */
export interface EpcOption {
  readonly key: string;
  /** Regular expression over the bit string; group n is field n. */
  readonly pattern: string;
  readonly fields: readonly EpcField[];
  /**
   * TDT GS1_DIGITAL_LINK grammar after the URI stem: `'literal'` tokens such
   * as `'/01/'` or `'?17='` that start an AI, other literals, and field names.
   */
  readonly grammar: readonly string[];
  /** TDS 2.x schemes: AIs whose values follow the fields, Table F encoded. */
  readonly encodedAI?: readonly { readonly ai: string; readonly name: string }[];
}

export interface EpcScheme {
  readonly name: string;
  /** 8-bit EPC header. */
  readonly header: string;
  /** True if the option key is the GS1 Company Prefix length. */
  readonly optionIsGcpLength?: boolean;
  readonly options: readonly EpcOption[];
  /** Rules run on the decoded binary fields. */
  readonly extract: readonly EpcRule[];
  /** Rules that derive the GS1_DIGITAL_LINK fields. */
  readonly format: readonly EpcRule[];
}

/** One component of an AI value in TDT Table F. */
export interface TableFComponent {
  /** Encoding method, by TDS 2.2 section, e.g. `"14.5.6"`. */
  readonly method: string;
  /** Fixed length in characters. */
  readonly chars?: number;
  /** Fixed length in bits. */
  readonly bits?: number;
  /** Bits in the length indicator. */
  readonly lenBits?: number;
  /** Maximum length in characters. */
  readonly max?: number;
}
