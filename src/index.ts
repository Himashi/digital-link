/**
 * Parse, build and validate GS1 Digital Link URIs and GS1 element strings.
 *
 * Implements GS1 Digital Link Standard: URI Syntax 1.7.0, with AI rules
 * generated from the GS1 Barcode Syntax Dictionary.
 *
 * @packageDocumentation
 */

export {
  parse,
  validate,
  build,
  toCanonical,
  isDigitalLink,
  CANONICAL_STEM,
  type DigitalLink,
  type ParseOptions,
  type BuildOptions,
  type GtinInput,
  type KeyInput,
} from "./uri.js";
export {
  parseElementString,
  validateElementString,
  formatElementString,
  GS,
  type ElementStringOptions,
} from "./element-string.js";
export { normaliseGtin, validateGtin, gs1CheckDigit } from "./gtin.js";
export {
  decodeEpc,
  decompressEpcUri,
  isEpcCompressedUri,
  type EpcIdentifier,
  type EpcEncoding,
} from "./epc.js";
export { getAI, listAIs, validateElement } from "./ai.js";
export { CSET82, CSET39, CSET64 } from "./charsets.js";
export { DigitalLinkError, type Issue, type IssueCode, type ValidationResult } from "./errors.js";
export { SYNTAX_DICTIONARY_RELEASE, URI_SYNTAX_VERSION } from "./generated/ai-table.js";
export { TDT_VERSION } from "./generated/epc-table.js";
export type { AIDefinition, ComponentSpec, CharacterSet, Element } from "./types.js";
