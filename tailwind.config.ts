import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "washi-white": "#F5F3EF",
        "concrete-grey": "#E8E4DF",
        "brick-white": "#FAF8F5",
        "charcoal-black": "#2C2C2C",
        "decay-wood": "#8B7355",
        "rust-iron": "#5A5A5A",
        "light-copper": "#C9A96E",
        "brass-gold": "#D4AF37",
        "red-copper": "#B87333",
        "celadon-blue": "#7A9E9F",
      },
      fontFamily: {
        "serif-jp": ["var(--font-noto-serif-jp)", "Noto Serif JP", "serif"],
        "sans-jp": ["var(--font-noto-sans-jp)", "Noto Sans JP", "sans-serif"],
        "mono-data": ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        building: "0 20px 60px rgba(44, 44, 44, 0.15)",
        "card-hover": "0 8px 30px rgba(201, 169, 110, 0.12)",
        "inner-light": "inset 0 0 40px rgba(201, 169, 110, 0.08)",
        "subtle-line": "0 1px 0 rgba(44, 44, 44, 0.08)",
      },
      spacing: {
        section: "120px",
      },
      screens: {
        mobile: "375px",
        tablet: "768px",
        desktop: "1440px",
        wide: "1920px",
      },
    },
  },
};

export default config;
