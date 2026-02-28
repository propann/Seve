import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0B",
        seve: "#2ECC71",
        bark: "#1A1A1A",
        textMain: "#E0E0E0",
        amberGlow: "#F59E0B",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(46, 204, 113, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(46, 204, 113, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
