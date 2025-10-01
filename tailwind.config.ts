import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
  colors: {
    brand: {
      DEFAULT: "#FFA400", // البرتقالي الأساسي
      faint: "#2a2a2a",   // خلفيات hover خفيفة على الداكن
    },
    ink: {
      DEFAULT: "#EDEDED", // نص أساسي على داكن
      soft: "#CFCFCF",    // نص ثانوي
      invert: "#000000",
    },
    grayc: {              // من دليل الألوان
      11: "#414042",
      8:  "#878787",
    },
    paper: "#0F0F0F",     // خلفية عامة داكنة (مسموح true black حسب الدليل)
    panel: "#171717",     // لوح/سايدبار
    border: "#2B2B2B",
  },
  fontFamily: {
    sans: ["Poppins","system-ui","-apple-system","Segoe UI","Roboto","sans-serif"],
  },
  maxWidth: { prose: "72ch" }
}
,
  },
  plugins: [],
};
export default config;
