/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui/src/theming/themes");

module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyui["[data-theme=light]"],
          primary: "#0EF195",
          "--card": "yellow",
          "primary-content": "#000",
          secondary: "#6E7271",
          "--icon-secondary": "#6E7271",
          "--danger": "#CC3904",
          "secondary-content": "#ffffff",
          "--primary": "#7767F6",
          "--btn-text-case": "none",
          "--neutral-bold": "#111014",
          "--neutral-reverse": "#F3F3F3",
          "--neutral-secondary": "#707072",
          "--bg-card": "#ffffff",
          "--bg-header": "#ffffff",
          "--bg-body": "#F7F7F7",
          "--label-active": "#0E1412",
          "--label-unactive": "#6E7271",
          "--disabled-color": "#9FA1A0",
          "--border-color": "#E7E7E8",
          "--primary-thin": "#F1F0FE",
          "--shadow": "#F3F3F3",
          "--stroke-default": "#E7E8E8",
          "--chart-up": "#008550",
          "--oncard-bg-default": "#F3F3F3",
        },
      },
      {
        dark: {
          ...daisyui["[data-theme=dark]"],
          primary: "#0EF195",
          "--card": "red",
          "primary-content": "#fff",
          secondary: "#9FA1A0",
          "--icon-secondary": "#6E7271",
          "--danger": "#CC3904",
          "secondary-content": "#ffffff",
          "--primary": "#7767F6",
          "--btn-text-case": "none",
          "--neutral-bold": "#F3F3F3",
          "--neutral-reverse": "#111014",
          "--neutral-secondary": "#A0A0A1",
          "--bg-header": "#1A201E",
          "--bg-card": "#28282C",
          "--bg-body": "#0E1412",
          "--disabled-color": "#404043",
          "--border-color": "#404043",
          "--primary-thin": "#7767F626",
          "--shadow": "#272C2A",
          "--label-active": "#F3F3F3",
          "--label-unactive": "#6E7271",
          "--chart-up": "#008550",
          "--oncard-bg-default": "#272C2A",
        },
      },
    ],
  },
};
