import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0c11",
        ink2: "#1f1d26",
        purple: "#6c3cff",
        lavender: "#efeef4",
        mist: "#aaa7b4",
        slate: "#5d5a67",
      },
      fontFamily: {
        display: ["'Gabarito'", "'Arial Black'", "Arial", "sans-serif"],
        body: ["'Onest'", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "28px",
      },
    },
  },
  plugins: [],
} satisfies Config;
