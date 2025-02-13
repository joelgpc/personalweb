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
        corporateBlue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a9f7',
          500: '#0c8ee7',
          600: '#0270c4',
          700: '#0359a0',
          800: '#074b85',
          900: '#0c406e',
        },
        lightBackground: '#ffffff',
        darkBackground: '#0b251c',
        lightText: {
          DEFAULT: '#1a1a1a',
          secondary: '#4a5568',
          accent: '#2d3748',
        },
        darkText: {
          DEFAULT: '#ffffff',
          secondary: '#e2e8f0',
          accent: '#f7fafc',
        },
        progressBar: {
          light: {
            bg: '#e2e8f0',
            fill: 'linear-gradient(to right, #0c8ee7, #0270c4)',
          },
          dark: {
            bg: '#2d3748',
            fill: 'linear-gradient(to right, #36a9f7, #0c8ee7)',
          },
        },
      },
      keyframes: {
        'bounce-x': {
          '0%, 100%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'gradientFlow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fadeOut': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'expandWidth': {
          '0%': { width: '0%', filter: 'blur(4px)' },
          '100%': { width: '100%', filter: 'blur(0)' },
        },
        'floatAnimation': {
          '0%, 100%': { 
            transform: 'translateY(0) translateX(0)',
            filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))'
          },
          '50%': { 
            transform: 'translateY(-10px) translateX(5px)',
            filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))'
          },
        },
        'glowPulse': {
          '0%, 100%': { 
            opacity: '0.5',
            filter: 'blur(10px) brightness(1)'
          },
          '50%': { 
            opacity: '1',
            filter: 'blur(15px) brightness(1.2)'
          },
        },
        'slideUp': {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0',
            filter: 'blur(5px)'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1',
            filter: 'blur(0)'
          },
        },
        'drawLine': {
          '0%': { 
            strokeDashoffset: '1000',
            opacity: '0'
          },
          '100%': { 
            strokeDashoffset: '0',
            opacity: '1'
          },
        },
        'radialProgress': {
          '0%': { 
            background: 'conic-gradient(var(--progress-color) 0deg, transparent 0deg)'
          },
          '100%': { 
            background: 'conic-gradient(var(--progress-color) var(--progress), transparent var(--progress))'
          },
        },
        'bounceButton': {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          },
          '50%': { 
            transform: 'translateY(-3px) scale(1.02)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          },
        },
        'emphasizeText': {
          '0%, 100%': { 
            textShadow: '0 0 0 rgba(12, 142, 231, 0)'
          },
          '50%': { 
            textShadow: '0 0 10px rgba(12, 142, 231, 0.3)'
          },
        }
      },
      animation: {
        'bounce-x': 'bounce-x 1s infinite',
        'gradientFlow': 'gradientFlow 8s ease infinite',
        'fadeOut': 'fadeOut 0.5s ease-out forwards',
        'expandWidth': 'expandWidth 1.2s ease-out forwards',
        'float': 'floatAnimation 6s ease-in-out infinite',
        'glow': 'glowPulse 3s ease-in-out infinite',
        'slideUp': 'slideUp 0.6s ease-out forwards',
        'drawLine': 'drawLine 1.5s ease-out forwards',
        'radialProgress': 'radialProgress 1.5s ease-out forwards',
        'bounceButton': 'bounceButton 1s ease-in-out infinite',
        'emphasizeText': 'emphasizeText 2s ease-in-out infinite'
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.025em' }],
      },
      boxShadow: {
        'floating': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 25px rgba(12, 142, 231, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'cardHover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'progress': '0 0 10px rgba(12, 142, 231, 0.2)',
        'ctaHover': '0 15px 30px -5px rgba(12, 142, 231, 0.4)',
        'portraitEdge': '0 0 30px rgba(0, 0, 0, 0.1)',
      },
      filter: {
        'portrait': 'blur(30px) brightness(1.1)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover'],
      textColor: ['active', 'group-hover'],
      opacity: ['disabled', 'group-hover'],
      scale: ['group-hover', 'hover'],
      transform: ['group-hover', 'hover'],
      blur: ['hover', 'group-hover'],
      boxShadow: ['hover', 'group-hover'],
      translate: ['group-hover', 'hover'],
      width: ['group-hover'],
      height: ['group-hover'],
      backgroundImage: ['hover', 'group-hover'],
      textShadow: ['hover', 'group-hover'],
    },
  },
}
