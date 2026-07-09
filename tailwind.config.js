/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05060A",
        ink: "#0B0D14",
        bone: "#EDEAE3",
        mist: "#8A8FA3",
        champagne: "#C9A96A",
        iris: "#7A6CFF",
        teal: "#4FD1C5",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Instrument Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
