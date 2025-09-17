const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        'sakura': {
          'light': '#FCE4EC',
          'pink': '#E91E63',
          'dark': '#AD1457',
        },
        'warm': {
          'orange': '#FF9800',
          'dark': '#F57C00',
        },
        'elegant': {
          'grey': '#78909C',
          'dark': '#455A64',
        },
        'pure': {
          'white': '#FFFFFF',
          'charcoal': '#263238',
        }
      }
    },
    container: {
      center: true,
      padding: {
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },

  plugins: [],
}

module.exports = config
