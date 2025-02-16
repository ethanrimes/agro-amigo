import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme/spacing';
import { CategoryType, Category } from '../../types/latestData';
import { ItemTile } from './ItemTile';
import { CategoryHeader } from './CategoryHeader';
import { TypeSelector } from './TypeSelector';
import { useRouter } from 'expo-router';

export const sampleData: Record<CategoryType, Category[]> = {
  Producto: [
    {
      name: 'Carnes',
      icon: 'food-drumstick',
      items: [
        { 
          id: '1', 
          name: 'Carne de Res', 
          type: 'Producto', 
          subCategory: 'Carnes',
          prices: '12,000 - 15,000',
          trendUp: true,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
        { 
          id: '2', 
          name: 'Pollo Entero', 
          type: 'Producto', 
          subCategory: 'Carnes',
          prices: '8,000 - 10,000',
          trendUp: false,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
        { 
          id: '3', 
          name: 'Cerdo', 
          type: 'Producto', 
          subCategory: 'Carnes',
          prices: '14,000 - 16,000',
          trendUp: true,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
        { 
          id: '4', 
          name: 'Pescado', 
          type: 'Producto', 
          subCategory: 'Carnes',
          prices: '18,000 - 22,000',
          trendUp: false,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
      ]
    },
    {
      name: 'Verduras y Hortalizas',
      icon: 'leaf',
      items: [
        { 
          id: '5', 
          name: 'Tomate', 
          type: 'Producto', 
          subCategory: 'Verduras y Hortalizas',
          prices: '2,000 - 3,000',
          trendUp: true,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
        { 
          id: '6', 
          name: 'Cebolla', 
          type: 'Producto', 
          subCategory: 'Verduras y Hortalizas',
          prices: '1,500 - 2,500',
          trendUp: false,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
        { 
          id: '7', 
          name: 'Zanahoria', 
          type: 'Producto', 
          subCategory: 'Verduras y Hortalizas',
          prices: '2,000 - 2,800',
          trendUp: true,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
        { 
          id: '8', 
          name: 'Lechuga', 
          type: 'Producto', 
          subCategory: 'Verduras y Hortalizas',
          prices: '1,800 - 2,200',
          trendUp: false,
          market: 'Plaza de Mercado',
          timestamp: new Date().toISOString()
        },
      ]
    },
  ],
  Mercado: [
    {
      name: 'Bogotá',
      icon: 'flag',
      items: [
        { 
          id: '9', 
          name: 'Corabastos', 
          type: 'Mercado', 
          subCategory: 'Bogotá',
          prices: '43 precios',
          trendUp: true,
          market: 'Bogotá Central',
          timestamp: new Date().toISOString()
        },
        { 
          id: '10', 
          name: 'Plaza Samper Mendoza', 
          type: 'Mercado', 
          subCategory: 'Bogotá',
          prices: '43 precios',
          trendUp: true,
          market: 'Bogotá Central',
          timestamp: new Date().toISOString()
        },
      ]
    },
    {
      name: 'Medellín',
      icon: 'flag',
      items: [
        { 
          id: '11', 
          name: 'Plaza Minorista', 
          type: 'Mercado', 
          subCategory: 'Medellín',
          prices: '43 precios',
          trendUp: true,
          market: 'Medellín Central',
          timestamp: new Date().toISOString()
        },
        { 
          id: '12', 
          name: 'Central Mayorista', 
          type: 'Mercado', 
          subCategory: 'Medellín',
          prices: '43 precios',
          trendUp: true,
          market: 'Medellín Central',
          timestamp: new Date().toISOString()
        },
      ]
    },
  ],
  Insumo: [] // Empty for now, but structure ready for future use
};

// Update the component props interface
interface BrowseContentProps {
  selectedType: CategoryType;
}

export const BrowseContent: React.FC<BrowseContentProps> = ({ selectedType }) => {
  const { currentTheme } = useTheme();
  const router = useRouter();

  const handleItemPress = (item: any) => {
    if (item.type === 'Producto') {
      router.push(`/latestdata/${item.id}/deepdive-producto`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {sampleData[selectedType].map((category) => (
          <View key={category.name}>
            <CategoryHeader category={category} />
            <View style={styles.itemsGrid}>
              {category.items.map((item) => (
                <ItemTile
                  key={item.id}
                  item={item}
                  onPress={handleItemPress}
                />
              ))}
            </View>
          </View>
        ))}
        <View style={styles.bottomPadding} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  content: {
    flex: 1,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: spacing.xs, // Small gap after category header
    marginBottom: spacing.sm, // Gap before next category
  },
  bottomPadding: {
    height: 80,
  },
});