import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { Category } from '../../types/latestData';

interface CategoryHeaderProps {
  category: Category;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[
      styles.header,
      { 
        borderBottomColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginTop: spacing.md,
      }
    ]}>
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: colors.background,
          padding: spacing.xs,
        }
      ]}>
        <MaterialCommunityIcons 
          name={category.icon as any} 
          size={28} 
          color={colors.text} 
        />
      </View>
      <Text style={[
        typography.h2,
        styles.headerText,
        { 
          color: colors.text,
          marginLeft: spacing.sm,
        }
      ]}>
        {category.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: '700',
  },
  iconContainer: {
    borderRadius: 100,
  },
});
