import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { PriceCard, PriceCardProps } from './PriceCard';

interface WatchedPricesSectionProps {
  watchedPrices: PriceCardProps[];
  onAddWatchedPrice: () => void;
}

export const WatchedPricesSection: React.FC<WatchedPricesSectionProps> = ({
  watchedPrices,
  onAddWatchedPrice,
}) => {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather name="eye" size={20} color={currentTheme.accent} />
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Precios vigilados
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: currentTheme.accent }]}
          onPress={onAddWatchedPrice}
        >
          <Feather name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {watchedPrices.map((price, index) => (
          <View 
            key={`${price.product}-${index}`}
            style={[
              styles.cardWrapper,
              { backgroundColor: currentTheme.card }
            ]}
          >
            <PriceCard {...price} />
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => {/* Handle remove */}}
            >
              <Feather name="x" size={16} color={currentTheme.text} />
            </TouchableOpacity>
          </View>
        ))}
        {watchedPrices.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.emptyStateText, { color: currentTheme.text }]}>
              Agrega productos para vigilar sus precios
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  cardWrapper: {
    marginRight: spacing.md,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    padding: spacing.xs,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  emptyState: {
    width: 200,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  emptyStateText: {
    ...typography.body,
    textAlign: 'center',
    opacity: 0.7,
  },
});
