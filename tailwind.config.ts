import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ocean: "#4dc7e6",
        lagoon: "#77e4d4",
        coral: "#ff7b72",
        mango: "#ffca57",
        leaf: "#4dbb72",
        twilight: "#213454",
        shell: "#fff7ef",
        ink: "#16304a"
      },
      boxShadow: {
        float: "0 28px 50px rgba(15, 45, 70, 0.16)",
        island: "0 18px 40px rgba(20, 54, 80, 0.18)"
      },
      backgroundImage: {
        "sea-glow":
          "radial-gradient(circle at top, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 35%), linear-gradient(180deg, #7ee4ff 0%, #44cce1 42%, #139ec4 100%)"
      },
      animation: {
        bob: "bob 6s ease-in-out infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        drift: "drift 14s linear infinite"
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        sparkle: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.82" }
        },
        drift: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(14px)" },
          "100%": { transform: "translateX(0px)" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
