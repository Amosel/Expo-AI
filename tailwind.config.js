// const { platformSelect } = require("nativewind");

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // light: '#eee',
        // dark: 'rgba(255,255,255,0.5)',
        // link: '#2e78b7',
        // white: '#FFFFFF',
        // lightWhite: '#F5FCFF',
        black: '#222222',
        pitchBlack: '#000000',
        // primary: '#007260',
        // secondary: '#39B68D',
        grey: '#CCCCCC',
        // error: platformSelect({
        //   ios: '#D8000C',
        //   android: '#D8000C'
        // })
      },
    },
  },
  plugins: [],
}

