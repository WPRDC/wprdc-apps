// Lets side-effect CSS imports (e.g. `import "./styles.css"`) type-check;
// TypeScript 6 errors on side-effect imports it can't resolve.
declare module "*.css";
