/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Design tokens — use these everywhere ──────────────
        accent:      "#2563eb",  // blue-600  — primary CTA / links
        "accent-lt": "#eff6ff",  // blue-50   — light tint
        "accent-md": "#dbeafe",  // blue-100  — medium tint
        "accent-dk": "#1d4ed8",  // blue-700  — hover state
        brand:       "#0ea5e9",  // sky-500   — keep for canvas/particles
        navy:        "#0f172a",  // slate-900 — footer/dark
        // Emerald stays for WhatsApp / availability only
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        "glow": "0 0 40px rgba(37,99,235,0.20)",
        "glow-sm": "0 0 20px rgba(37,99,235,0.15)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow":  "spin 20s linear infinite",
        "float":      "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
