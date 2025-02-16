import { Theme } from '../types/theme';

export const theme: Theme = {
  light: {
    primary: '#15803d',    // green-700
    secondary: '#16a34a',  // green-600
    accent: '#92400e',     // amber-800
    background: '#fefce8',  // amber-50
    card: '#ffffff',       // white
    text: '#1f2937',       // gray-800
    textSecondary: '#4b5563', // gray-600
    textTertiary: '#6b7280',  // gray-500
    border: '#166534'      // green-800
  },
  dark: {
    primary: '#14532d',    // green-900
    secondary: '#166534',  // green-800
    accent: '#78350f',     // amber-900
    background: '#111827', // gray-900
    card: '#1f2937',      // gray-800
    text: '#e5e7eb',      // gray-200
    textSecondary: '#9ca3af', // gray-400
    textTertiary: '#6b7280',  // gray-500
    border: '#15803d'      // green-700
  }
};
