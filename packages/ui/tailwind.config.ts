// tailwind config is required for editor support
import sharedConfig from "@wprdc/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
