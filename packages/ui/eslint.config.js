/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@wprdc/eslint-config/react.js"].map(require),
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
