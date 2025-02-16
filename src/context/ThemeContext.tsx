import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeColors } from '../types/theme';
import { theme } from '../theme/colors';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  currentTheme: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
