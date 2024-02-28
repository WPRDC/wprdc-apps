import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Omit<Config, "content"> = {
  // content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#FCEC52",
        secondary: colors.cyan,
        background: colors.neutral["100"],
        backgroundSecondary: colors.white,
        backgroundDark: colors.stone[900],
        backgroundSecondaryDark: colors.black,
        focused: colors.cyan,
        error: colors.red,
        warning: colors.orange,
        text: colors.slate["700"],
        textDark: colors.slate["200"],
        textSecondary: "#404040",
        textSecondaryDark: "#a3a3a3",
        border: colors.stone["700"],
        borderDark: colors.stone["300"],
      },
      maxHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      boxShadow: {
        sm: "2px 2px 0 #4b5563",
        DEFAULT: "3px 3px 0 #4b5563",
        md: "4px 4px 0 #4b5563",
        lg: "5px 5px 0 #4b5563",
        xl: "6px 6px 0 #4b5563",
        "2xl": "8px 8px 0 #4b5563",
        "sm-reverse": "-2px -2px 0 #4b5563",
        reverse: "-3px -3px 0 #4b5563",
        "md-reverse": "-4px -4px 0 #4b5563",
        "lg-reverse": "-5px -5px 0 #4b5563",
        "xl-reverse": "-6px -6px 0 #4b5563",
        "2xl-reverse": "-8px -8px 0 #4b5563",
        inner: "2px 2px 0 #cbd5e1 inset",
        none: "none",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
