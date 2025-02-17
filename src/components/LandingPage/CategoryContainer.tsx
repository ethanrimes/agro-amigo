import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PriceCard } from './PriceCard';
import { useTheme } from '../../../hooks/useTheme';
import { spacing } from '../../theme/spacing';

type CategoryItem = {
  id: string;
  name: string;
  icon: string;
  priceRange: {
    min: number;
    max: number;
  };
  trend: 'up' | 'down' | 'stable';
  market: string;
  timestamp: Date;
};

type CategoryContainerProps = {
  category: string;
  icon: string;
  items: CategoryItem[];
  totalItems: number;
  onViewAll: () => void;
};

export const CategoryContainer: React.FC<CategoryContainerProps> = ({
  category,
  icon,
  items,
  totalItems,
  onViewAll,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Feather name="box" size={20} color={colors.primary} />
          <Text style={[styles.categoryTitle, { color: colors.text }]}>
            {category}
          </Text>
        </View>
        <Text style={[styles.totalItems, { color: colors.textSecondary }]}>
          {totalItems} productos
        </Text>
      </View>

      <View style={styles.grid}>
        {items.slice(0, 4).map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <PriceCard
              id={item.id}
              product={item.name}
              priceRange={item.priceRange}
              trend={item.trend}
              market={item.market}
              timestamp={item.timestamp}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.viewAllButton} 
        onPress={onViewAll}
      >
        <Text style={[styles.viewAllText, { color: colors.primary }]}>
          Ver todos los precios
        </Text>
        <Feather name="chevron-right" size={14} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalItems: {
    fontSize: 11,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  gridItem: {
    width: '50%',
    padding: spacing.xs,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: spacing.xs,
  },
}); 