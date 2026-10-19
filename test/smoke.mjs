// Loads the built ESM bundle. Run after `pnpm build`.
import assert from "node:assert/strict";
import { build, parse } from "../dist/index.js";

const uri = build({ gtin: "5012345678900", batch: "ABC123" }, "id.brand.co.uk");
assert.equal(uri, "https://id.brand.co.uk/01/05012345678900/10/ABC123");
assert.equal(parse(uri).batch, "ABC123");
console.log("ESM OK");
