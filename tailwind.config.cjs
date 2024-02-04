/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Neucha: "Neucha",
    },

    extend: {
      backgroundImage: {
        todo: "url('https://images.pexels.com/photos/268966/pexels-photo-268966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
      colors: {
        mainBlue: "#ffa500",
        "main-orange": "#ffa500",
      },
      boxShadow: {
        circle: "0px 0px 17px 1px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
