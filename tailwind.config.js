/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background, 40 20% 98%))',
        foreground: 'hsl(var(--foreground, 100 100% 10%))',
        card: {
          DEFAULT: 'hsl(var(--card, 0 0% 100%))',
          foreground: 'hsl(var(--card-foreground, 100 100% 10%))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 0 0% 100%))',
          foreground: 'hsl(var(--popover-foreground, 100 100% 10%))',
        },
        primary: {
          DEFAULT: '#163300',
          foreground: '#dcff85',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 85 45% 92%))',
          foreground: 'hsl(var(--secondary-foreground, 100 100% 10%))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 80 15% 94%))',
          foreground: 'hsl(var(--muted-foreground, 100 20% 40%))',
        },
        accent: {
          DEFAULT: '#dcff85',
          foreground: '#163300',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84.2% 60.2%))',
          foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))',
        },
        border: 'hsl(var(--border, 100 20% 88%))',
        input: 'hsl(var(--input, 100 20% 88%))',
        ring: 'hsl(var(--ring, 100 100% 10%))',
        lime: {
          500: '#dcff85',
        },
        forest: {
          900: '#163300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['DM Sans', 'Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius, 1rem)',
        md: 'calc(var(--radius, 1rem) - 2px)',
        sm: 'calc(var(--radius, 1rem) - 4px)',
      },
    },
  },
  plugins: [],
};
