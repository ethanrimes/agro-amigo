import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WatchedPricesSection } from '../src/components/LandingPage/WatchedPricesSection';
import { CategoryContainer } from '../src/components/LandingPage/CategoryContainer';
import { CategoryType } from '../src/types/latestData';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../src/theme/spacing';
import { SearchHeader } from '../src/components/LandingPage/SearchHeader';

const AppContent: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedType, setSelectedType] = useState<CategoryType>('Producto');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for categories
  const categories = [
    {
      category: 'Verduras',
      icon: '/path/to/icon',
      items: [
        {
          id: '1',
          name: 'Tomate',
          icon: '/path/to/tomato',
          priceRange: { min: 2.30, max: 2.70 },
          trend: 'up' as const,
          market: 'Mercado Central',
          timestamp: new Date(),
        },
        {
          id: '2',
          name: 'Cebolla',
          icon: '/path/to/onion',
          priceRange: { min: 1.45, max: 2.05 },
          trend: 'down' as const,
          market: 'Mercado Central',
          timestamp: new Date(),
        },
        {
          id: '3',
          name: 'Pimiento',
          icon: '/path/to/pepper',
          priceRange: { min: 3.10, max: 3.50 },
          trend: 'up' as const,
          market: 'Mercado Central',
          timestamp: new Date(),
        },
        {
          id: '4',
          name: 'Zanahoria',
          icon: '/path/to/carrot',
          priceRange: { min: 1.90, max: 2.30 },
          trend: 'stable' as const,
          market: 'Mercado Central',
          timestamp: new Date(),
        },
      ],
      totalItems: 12
    },
    // Add more categories as needed
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Top Bar */}
        <View style={[styles.topBar, { backgroundColor: colors.accent }]}>
          <Text style={[styles.brandName, { color: colors.card }]}>Finkra</Text>
        </View>

        {/* Watched Prices Section */}
        <WatchedPricesSection />

        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Category Containers */}
          {categories.map((category, index) => (
            <CategoryContainer
              key={index}
              {...category}
              onViewAll={() => {
                // Handle view all action
                console.log(`View all for ${category.category}`);
              }}
            />
          ))}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  bottomPadding: {
    height: 80,
  },
});

export default function App() {
  return (
    <AppContent />
  );
}