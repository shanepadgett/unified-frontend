import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
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
      colors: {
        dark: {
          900: '#121212',  // Very dark background
          800: '#1E1E1E',  // Card background
          700: '#2D2D2D',  // Slightly lighter background elements
          600: '#3D3D3D',  // Border colors
        },
        primary: {
          600: '#5E5CE6',  // Primary color
          700: '#4F4DD6',  // Hover state
        },
        badge: {
          dev: '#1E293B',     // Development badge background
          team: '#4F46E5',    // Team badge background
          rollout: '#166534', // Rollout percentage badge background
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
