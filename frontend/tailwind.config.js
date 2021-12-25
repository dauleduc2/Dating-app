const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        140: "35rem",
        120: "30rem",
        168: "42rem",
        "less1/3": "31%",
      },
      colors: {
        "radical-red": {
          DEFAULT: "#FF4458",
          50: "#FFFCFC",
          100: "#FFE7EA",
          200: "#FFBEC5",
          300: "#FF96A1",
          400: "#FF6D7C",
          500: "#FF4458",
          600: "#FF0C26",
          700: "#D30017",
          800: "#9B0011",
          900: "#63000B",
        },
        "mountain-meadow": {
          DEFAULT: "#21D07C",
          50: "#B5F3D6",
          100: "#A4F1CC",
          200: "#80EBB8",
          300: "#5DE5A4",
          400: "#3AE090",
          500: "#21D07C",
          600: "#19A05F",
          700: "#126F42",
          800: "#0A3F25",
          900: "#020E09",
        },
        shark: {
          DEFAULT: "#21262E",
          50: "#6F7F98",
          100: "#65758D",
          200: "#546175",
          300: "#434D5E",
          400: "#323A46",
          500: "#21262E",
          600: "#0A0B0D",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        sun: {
          DEFAULT: "#F8A81F",
          50: "#FEEDD1",
          100: "#FDE5BD",
          200: "#FCD696",
          300: "#FAC76E",
          400: "#F9B747",
          500: "#F8A81F",
          600: "#D88B07",
          700: "#A26805",
          800: "#6B4503",
          900: "#352202",
        },
      },
      borderWidth: {
        1: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
