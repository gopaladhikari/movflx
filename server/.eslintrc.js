module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
  ],

  overrides: [
    {
      env: {
        node: true,
      },

      files: [".eslintrc.{js,cjs}"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },

      parserOptions: {
        sourceType: "script",
      },
    },
  ],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["@typescript-eslint"],

  ignorePatterns: ["*.ejs"],

  rules: {
    "node/no-unsupported-features/es-syntax": 0,
    "node/no-missing-import": 0,
    "node/file-extension-in-import": 0,
    "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
    "no-process-exit": 0,
  },
};
