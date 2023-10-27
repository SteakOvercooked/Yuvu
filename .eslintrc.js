module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "prettier",
  ],
  rules: {
    "no-trailing-spaces": 2,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
      ],
      env: {
        browser: true,
      },
    },
    {
      files: ["*.js"],
      env: {
        node: true,
      },
    },
  ],
};
