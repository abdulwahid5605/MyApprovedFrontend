/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        "yellow-bg": "#ffbe17",
        "gray-bg": "#f0f0f0",
        "sky-bg": "#eef9ff",
      },
      colors: {
        'dark': "#091E3E",
        'yellow': "#ffbe17",
        "dark-blue": "#061429",
        "2nd-dark-blue": "rgb(0, 88, 162)",
      },
    },
  },
  plugins: [],
};
