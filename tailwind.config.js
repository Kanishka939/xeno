/** @type {import('tailwindcss').Config} */
export default {
  // Add this line
  darkMode: 'class', 
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,css}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 10px 30px rgba(2, 6, 23, 0.08)",
        '3xl': "0 20px 50px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}