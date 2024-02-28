// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "@wprdc/tailwind-config/tailwind.config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
