/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121212',  // Very dark background from image
          800: '#1E1E1E',  // Card background from image
          700: '#2D2D2D',  // Slightly lighter background elements
          600: '#3D3D3D',  // Border colors
        },
        primary: {
          600: '#5E5CE6',  // Toggle switch active color from image
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
}
