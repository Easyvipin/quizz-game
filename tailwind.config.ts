import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "soft-elevated":
          "0 4px 6px -1px rgba(168, 85, 247,0.1), 0 2px 4px -1px rgba(168, 85, 247,0.6)",
        "neon-glow":
          "0 0 10px rgba(168, 85, 247,0.5), 0 0 20px rgba(168, 85, 247,0.3), 0 0 30px rgba(168, 85, 247,0.2), 0 0 40px rgba(168, 85, 247,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
