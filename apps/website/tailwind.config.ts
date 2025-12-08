import type { Config } from "tailwindcss";
import sharedConfig from "@wprdc/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins" | "theme"> = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // fixme: parcels-n-at doesn't need this - whats going on here?
    "../../packages/ui/src/**/*.tsx",
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      backgroundImage: {

      },
    },
  },
};

export default config;
