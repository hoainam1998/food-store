// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "fm",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/no-inputs-metadata-property": "off",
      "semi": "error",
      "max-len": [2, 120, 2],
      "no-console": "off",
      "prefer-promise-reject-errors": "off",
      "camelcase": "error",
      "no-unused-vars": "off",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-use-before-define": "error",
      "valid-typeof": "error",
      "quotes": ["error", "single"],
    },
  },
  {
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/label-has-associated-control": "off",
    },
  }
);
