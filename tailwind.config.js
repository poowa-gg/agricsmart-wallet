/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: "#001F3F", // Climatovate Navy
          gold: "#FFD700",
          blue: "#003366",
        }
      }
    },
  },
  plugins: [],
}
