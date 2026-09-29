/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      maxWidth: {
        'screen-2xl': '1400px',
        'custom-1200': '1200px',
        'custom-900': '900px',
      },
      colors: {
        cream: {
          DEFAULT: '#F7F2E9',
          soft: '#FBF8F2',
          deep: '#F0E8D8',
        },
        ink: {
          DEFAULT: '#18140F',
          soft: '#3A342C',
          muted: '#6B6459',
        },
        plum: {
          DEFAULT: '#5A1B31',
          light: '#7A2A45',
          dark: '#3B1020',
          50: '#F6E9ED',
        },
        sand: {
          DEFAULT: '#E7DCC6',
          light: '#F1E9D8',
          dark: '#CBB98F',
        },
        sage: {
          DEFAULT: '#4C6B4F',
          light: '#E4EBE0',
        },
        rust: {
          DEFAULT: '#A64A2E',
          light: '#F3E3DA',
        },
        line: '#E1D7C3',

        // legacy keys kept so any un-migrated className still resolves
        'primary': '#5A1B31',
        'primary-dark': '#3B1020',
        'primary-light': '#F6E9ED',
        'text-dark': '#18140F',
        'text-light': '#6B6459',
        'extra-light': '#FBF8F2',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(24,20,15,0.04), 0 12px 32px -16px rgba(24,20,15,0.18)',
        card: '0 1px 0 rgba(24,20,15,0.04)',
      },
      borderRadius: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn .4s ease forwards',
        'slide-up': 'slideUp .35s ease forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
