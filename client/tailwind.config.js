/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "50rem",
        120: "40rem",
        118: "40rem",
      },
      backgroundImage: {
        mail: "url('/sendMail.jpg')",
      },
    },
  },
  plugins: [],
};
