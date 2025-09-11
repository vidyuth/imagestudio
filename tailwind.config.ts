import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      // Custom font size scale
      xs: ".75rem",  /* 12px */
      sm: ".875rem", /* 14px */
      base: "1rem",  /* 16px */
      lg: "1.125rem",/* 18px */
      xl: "1.25rem", /* 20px */
      "2xl": "1.5rem",/* 24px */
      "3xl": "1.875rem",/* 30px */
      "4xl": "2.25rem",/* 36px */
      "5xl": "3rem",  /* 48px */
      "6xl": "4rem",  /* 64px */
    },
      extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      colors: {
        // Flat / base colors (regular buttons) - Updated for OKLCH
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
          border: "var(--card-border)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
          border: "var(--popover-border)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
          border: "var(--destructive-border)",
        },
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          ring: "var(--sidebar-ring)",
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          border: "var(--sidebar-border)",
        },
        "sidebar-primary": {
          DEFAULT: "var(--sidebar-primary)",
          foreground: "var(--sidebar-primary-foreground)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "var(--sidebar-accent)",
          foreground: "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
