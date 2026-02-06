/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#E30613",
        "primary-hover": "#d00e0e",
        "primary-light": "#fde8e8",
        "audit-primary": "#135bec",
        "background-light": "#f8f6f6",
        "background-dark": "#1a1a1a",
        "surface-light": "#ffffff",
        "surface-dark": "#2d1a1a",
        "text-main": "#181111",
        "text-muted": "#896161",
        "border-light": "#f4f0f0",
        "border-dark": "#3d2b2b",
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "display": ["Inter", "sans-serif"],
        "manrope": ["Manrope", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
