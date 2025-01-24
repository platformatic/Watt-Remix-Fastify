import { resolve } from "node:path";

export default {
  plugins: {
    tailwindcss: {
      content: [
        resolve(
          import.meta.dirname,
          "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"
        ),
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: [
              "Inter",
              "ui-sans-serif",
              "system-ui",
              "sans-serif",
              "Apple Color Emoji",
              "Segoe UI Emoji",
              "Segoe UI Symbol",
              "Noto Color Emoji",
            ],
          },
        },
      },
      plugins: [],
    },
    autoprefixer: {},
  },
};
