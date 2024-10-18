import type { Config } from "tailwindcss";

import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const SHADOW_COLOR = "#6b7280";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "16/10": "16 / 10",
      },
      colors: {
        primary: "#FCEC52",
        secondary: colors.cyan,
        background: colors.neutral["100"],
        backgroundSecondary: colors.white,
        backgroundDark: colors.stone[900],
        backgroundSecondaryDark: colors.black,
        focused: colors.cyan["400"],
        error: colors.red,
        warning: colors.orange,
        text: colors.slate["700"],
        textDark: colors.slate["200"],
        textSecondary: colors.stone["600"],
        textSecondaryDark: "#A3A3A3",
        border: colors.stone["700"],
        borderDark: colors.stone["300"],
        wprdc: {
          "50": "#FEFDE8",
          "100": "#FEFDC3",
          "200": "#FDF68B",
          "300": "#FCEC52", // primary color
          "400": "#F9DA16",
          "500": "#E9C109",
          "600": "#C99705",
          "700": "#A06C08",
          "800": "#84550F",
          "900": "#704513",
          "950": "#422406",
        },
      },
      fontFamily: {
        mono: [
          "var(--font-jetbrains-mono)",
          "JetBrains Mono",
          ...defaultTheme.fontFamily.mono,
        ],
      },
      maxHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      boxShadow: {
        sm: `2px 2px 0 ${SHADOW_COLOR}`,
        DEFAULT: `3px 3px 0 ${SHADOW_COLOR}`,
        md: `4px 4px 0 ${SHADOW_COLOR}`,
        lg: "5px 5px 0 #4b5563",
        xl: `6px 6px 0 ${SHADOW_COLOR}`,
        "2xl": `8px 8px 0 ${SHADOW_COLOR}`,
        "sm-reverse": `-2px -2px 0 ${SHADOW_COLOR}`,
        reverse: `-3px -3px 0 ${SHADOW_COLOR}`,
        "md-reverse": `-4px -4px 0 ${SHADOW_COLOR}`,
        "lg-reverse": `-5px -5px 0 ${SHADOW_COLOR}`,
        "xl-reverse": `-6px -6px 0 ${SHADOW_COLOR}`,
        "2xl-reverse": `-8px -8px 0 ${SHADOW_COLOR}`,
        inner: "2px 2px 0 #cbd5e1 inset",
        none: "none",
      },
    },
  },
  plugins: [
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
  ],
  darkMode: "class",
};
export default config;
