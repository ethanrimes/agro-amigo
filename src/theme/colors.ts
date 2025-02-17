import { Theme } from "../types/theme";

export const theme: Theme = {
  light: {
    primary: '#2d4c2d',    // dark green for headers
    secondary: '#e7f4e4',  // light green background
    accent: '#1a2e19',     // darker green for emphasis
    background: '#e7f4e4', // light green background
    searchBackground: '#2d4c2d', // dark green for search
    card: '#ffffff',       // white for cards
    text: '#1a2e19',       // dark green text
    textSecondary: '#2d4c2d', // medium green text
    textTertiary: '#4a7c4a',  // lighter green text
    border: '#a3c9a3'      // light green borders
  },
  dark: {
    primary: '#854d0e',    // amber-800: maintain brand consistency
    secondary: '#27180c',  // custom dark brown
    accent: '#84cc16',     // lime-500: fresh accent against earthy tones
    background: '#1c1917', // stone-900: warm dark background
    searchBackground: '#854d0e', // amber-800: matches primary
    card: '#292524',       // stone-800: slightly lighter warm background
    text: '#fef3c7',       // amber-100: warm light text
    textSecondary: '#fde68a', // amber-200: slightly darker text
    textTertiary: '#fcd34d',  // amber-300: tertiary text
    border: '#92400e'      // amber-900: rich borders in dark mode
  }
};