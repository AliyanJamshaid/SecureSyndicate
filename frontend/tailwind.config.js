/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "google-blue": "rgba(66, 133, 244, 0.04)",
        "blue-secondary": "#76dcfb",
        "blue-primary": "#389ee8",
      },
      boxShadow: {
        "blue-primary": "0 1px 10px rgba(127, 119, 241, 0.05)",
      },
    },
  },
  plugins: [],
};
