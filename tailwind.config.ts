import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   // 👈 IMPORTANT (catch-all)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
