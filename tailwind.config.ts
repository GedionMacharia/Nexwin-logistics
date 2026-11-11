import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { navy: "#0B1730", gold: "#D9AE58", cream: "#F7F5F0" }, boxShadow: { soft: "0 18px 55px rgba(11,23,48,.10)" } } },
  plugins: []
};
export default config;