import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDarkTheme, toggleTheme, currentTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.toggleButton, { backgroundColor: currentTheme.accent }]}
      onPress={toggleTheme}
    >
      <Feather 
        name={isDarkTheme ? "sun" : "moon"} 
        size={16} 
        color="white" 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
  },
});