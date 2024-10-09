import type { Config } from "tailwindcss";
import sharedConfig from "@wprdc/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
  plugins: [require("tailwindcss-react-aria-components")],
};

export default config;
