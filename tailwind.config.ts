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
          primary: "#7767F6",
          "--card": "yellow",
          "primary-content": "#ffffff",
          secondary: "#5d6ccf",
          "secondary-content": "#ffffff",
          "--primary": "#7767F6",
          "--btn-text-case": "none",
          "--neutral-bold": "#111014",
          "--neutral-reverse": "#F3F3F3",
          "--neutral-secondary": "#707072",
          "--bg-card": "#ffffff",
          "--bg-body": "#F8F7FA",
          "--disabled-color": "#E7E7E8",
          "--border-color": "#E7E7E8",
          "--primary-thin": "#F1F0FE",
        },
      },
      {
        dark: {
          ...daisyui["[data-theme=dark]"],
          primary: "#7767F6",
          "--card": "red",
          "primary-content": "#ffffff",
          secondary: "#5d6ccf",
          "secondary-content": "#ffffff",
          "--primary": "#7767F6",
          "--btn-text-case": "none",
          "--neutral-bold": "#F3F3F3",
          "--neutral-reverse": "#111014",
          "--neutral-secondary": "#A0A0A1",
          "--bg-card": "#28282C",
          "--bg-body": "#111014",
          "--disabled-color": "#404043",
          "--border-color": "#404043",
          "--primary-thin": "#7767F626",
        },
      },
    ],
  },
};
