import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const ProfileContent: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: currentTheme.text }]}>
        Perfil
      </Text>
      <Text style={[styles.subtitle, { color: currentTheme.text }]}>
        Próximamente: Información del perfil del usuario
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
});
