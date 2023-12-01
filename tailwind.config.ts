import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: "#FAF0E6",
            foreground: "#1A1625",
            primary: {
              DEFAULT: "#9171f8",
              foreground: "#FAF0E6",
              50: "#FAF0E6",
              100: "#E4D4F4",
              200: "#C9A9E9",
              300: "#AE7EDE",
              400: "#9353D3",
              500: "#7828C8",
              600: "#6020A0",
              700: "#481878",
              800: "#1A1625",
            },
            focus: "#9171f8",
          },
        },
        dark: {
          colors: {
            background: "#1A1625",
            foreground: "#FAF0E6",
            primary: {
              DEFAULT: "#9171f8",
              foreground: "#FAF0E6",
              50: "#FAF0E6",
              100: "#E4D4F4",
              200: "#C9A9E9",
              300: "#AE7EDE",
              400: "#9353D3",
              500: "#7828C8",
              600: "#6020A0",
              700: "#481878",
              800: "#1A1625",
            },
            focus: "#9171f8",
          },
        },
      },
    }),
  ],
};
export default config;
