import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../../hooks/useTheme';

type CategoryPathProps = {
  categories: string[];
  icon?: string;
  danecode?: string;
  cpccode?: string;
};

export default function CategoryPath({ 
  categories, 
  icon = '🍎', 
  danecode = '0123',
  cpccode = '4567'
}: CategoryPathProps) {
  const router = useRouter();
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={[styles.backButton, { marginRight: spacing.sm }]}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[typography.h3, styles.mainTitle, { color: colors.text }]}>
          Manzanas {icon}
        </Text>
        <Text style={[typography.body, styles.subText, { color: colors.textSecondary }]}>
          {categories.join(' > ')}
        </Text>
        <Text style={[typography.body, styles.subText, { color: colors.textSecondary }]}>
          Código DANE {danecode} • Código CPC {cpccode}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  textContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    marginBottom: 4,
  },
  subText: {
    marginBottom: 2,
  },
}); 