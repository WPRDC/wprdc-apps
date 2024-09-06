import type { Options } from "tsup";
import { defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  minify: false,
  clean: false,
  ...options,
}));
