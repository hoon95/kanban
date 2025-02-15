import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-600"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
