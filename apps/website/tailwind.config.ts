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
        cartographer: "url('/images/backgrounds/cartographer.png')",
        diagmonds: "url('/images/backgrounds/diagmonds.png')",
        "diagmonds-light": "url('/images/backgrounds/diagmonds-light.png')",
        "diagonal-striped-brick":
          "url('/images/backgrounds/diagonal-striped-brick.png')",
        escheresque: "url('/images/backgrounds/escheresque.png')",
        "escheresque-dark": "url('/images/backgrounds/escheresque-dark.png')",
        graphy: "url('/images/backgrounds/graphy.png')",
        "graphy-dark": "url('/images/backgrounds/graphy-dark.png')",
        "gun-metal": "url('/images/backgrounds/gun-metal.png')",
        hexabump: "url('/images/backgrounds/hexabump.png')",
        "maze-black": "url('/images/backgrounds/maze-black.png')",
        "real-carbon-fibre": "url('/images/backgrounds/real-carbon-fibre.png')",
        "use-your-illusion": "url('/images/backgrounds/use-your-illusion.png')",
        vaio: "url('/images/backgrounds/vaio.png')",
        "zig-zag": "url('/images/backgrounds/zig-zag.png')",
      },
    },
  },
};

export default config;
