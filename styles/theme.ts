import { theme, DefaultTheme } from '@chakra-ui/core'

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Poppins, system-ui, sans-serif',
    heading: 'Poppins, system-ui, sans-serif',
    mono: 'Inconsolata, monospace'
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700
  },
  colors: {
    ...theme.colors,
    orange: {
      ...theme.colors.orange,
      50: '#ffe8e0',
      100: '#ffc2b0',
      200: '#ff9c7f',
      300: '#fe6f47',
      400: '#fd4d1c',
      500: '#e33403',
      600: '#b22801',
      700: '#801b00',
      800: '#4e0f00',
      900: '#1f0300'
    }
  }
}

export default customTheme
