// Loads the built CommonJS bundle. Run after `pnpm build`.
const assert = require("node:assert/strict");
const { build, parse } = require("../dist/index.cjs");

const uri = build({ gtin: "5012345678900", batch: "ABC123" }, "id.brand.co.uk");
assert.equal(uri, "https://id.brand.co.uk/01/05012345678900/10/ABC123");
assert.equal(parse(uri).batch, "ABC123");
console.log("CJS OK");
