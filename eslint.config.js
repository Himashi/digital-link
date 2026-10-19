import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/coverage/**", "**/docs-api/**", "**/node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  { languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } } },
  {
    files: ["**/test/**/*.ts"],
    rules: { "@typescript-eslint/no-non-null-assertion": "off" },
  },
  {
    files: ["**/scripts/**/*.mjs", "**/test/**/*.{mjs,cjs}"],
    languageOptions: {
      globals: { console: "readonly", process: "readonly", URL: "readonly", require: "readonly" },
    },
  },
  {
    files: ["**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
);
