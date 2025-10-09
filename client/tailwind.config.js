/** @type {import("tailwindcss").Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        foreground: "#1f2937",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b",
          foreground: "#f1f5f9",
        },
        muted: {
          DEFAULT: "#e5e7eb",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#facc15",
          foreground: "#1f2937",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#d1d5db",
        input: "#f3f4f6",
        ring: "#3b82f6",
        chart: {
          1: "#f97316",
          2: "#10b981",
          3: "#0ea5e9",
          4: "#8b5cf6",
          5: "#ec4899",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
