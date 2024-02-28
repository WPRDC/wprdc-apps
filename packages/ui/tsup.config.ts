import type { Options } from "tsup";
import { defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  minify: false,
  clean: true,
  sourcemap: true,
  external: ["react"],
  ...options,
}));
