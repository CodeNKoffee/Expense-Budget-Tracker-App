/** @type {import("tailwindcss").Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "budget-midnight": "#000000",
        "budget-charcoal": "#101010",
        "budget-steel": "#2A2A2A",
        "budget-silver": "#ACACAC",
        "budget-cloud": "#F5F5F5",
        "budget-snow": "#FEFEFE",
        "budget-tangerine": "#F76D35",
        "budget-expense": "#FF1919",
        "budget-income": "#00B232",
      }
    },
  },
  plugins: [],
}