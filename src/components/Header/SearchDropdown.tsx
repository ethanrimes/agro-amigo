import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { CategoryType } from '../../types/latestData';
import { useRouter, usePathname } from 'expo-router';

// New interface for items
interface SuggestionItem {
  id: number;
  name: string;
  type: CategoryType;
  category: string;
}

interface SuggestionData {
  icon: string;
  items: SuggestionItem[];
}

interface CategoryData {
  [key: string]: SuggestionData;
}

// Updated suggestions with more data
const ALL_SUGGESTIONS: Record<CategoryType | string, CategoryData> = {
  'Producto': {
    'Verduras': {
      icon: 'leaf-outline',
      items: [
        { id: 1, name: 'Tomate Cherry', type: 'Producto', category: 'Verduras' },
        { id: 2, name: 'Cebolla', type: 'Producto', category: 'Verduras' },
        { id: 3, name: 'Lechuga', type: 'Producto', category: 'Verduras' },
        { id: 4, name: 'Zanahoria', type: 'Producto', category: 'Verduras' },
        { id: 5, name: 'Pimiento', type: 'Producto', category: 'Verduras' },
        { id: 6, name: 'Pepino', type: 'Producto', category: 'Verduras' },
        { id: 7, name: 'Brócoli', type: 'Producto', category: 'Verduras' },
        { id: 8, name: 'Coliflor', type: 'Producto', category: 'Verduras' },
        { id: 9, name: 'Espinaca', type: 'Producto', category: 'Verduras' }
      ]
    },
    'Frutas': {
      icon: 'nutrition-outline',
      items: [
        { id: 10, name: 'Aguacate', type: 'Producto', category: 'Frutas' },
        { id: 11, name: 'Mango', type: 'Producto', category: 'Frutas' },
        { id: 12, name: 'Plátano', type: 'Producto', category: 'Frutas' },
        { id: 13, name: 'Naranja', type: 'Producto', category: 'Frutas' },
        { id: 14, name: 'Manzana', type: 'Producto', category: 'Frutas' },
        { id: 15, name: 'Pera', type: 'Producto', category: 'Frutas' },
        { id: 16, name: 'Piña', type: 'Producto', category: 'Frutas' },
        { id: 17, name: 'Sandía', type: 'Producto', category: 'Frutas' },
        { id: 18, name: 'Uvas', type: 'Producto', category: 'Frutas' }
      ]
    },
    'Granos': {
      icon: 'basket-outline',
      items: [
        { id: 19, name: 'Arroz', type: 'Producto', category: 'Granos' },
        { id: 20, name: 'Frijoles', type: 'Producto', category: 'Granos' },
        { id: 21, name: 'Maíz', type: 'Producto', category: 'Granos' },
        { id: 22, name: 'Lentejas', type: 'Producto', category: 'Granos' },
        { id: 23, name: 'Quinoa', type: 'Producto', category: 'Granos' }
      ]
    }
  },
  'Insumo': {
    'Fertilizantes': {
      icon: 'flask-outline',
      items: [
        { id: 24, name: 'Urea', type: 'Insumo', category: 'Fertilizantes' },
        { id: 25, name: 'NPK', type: 'Insumo', category: 'Fertilizantes' },
        { id: 26, name: 'Nitrato de Potasio', type: 'Insumo', category: 'Fertilizantes' }
      ]
    },
    'Pesticidas': {
      icon: 'water-outline',
      items: [
        { id: 27, name: 'Insecticida Natural', type: 'Insumo', category: 'Pesticidas' },
        { id: 28, name: 'Fungicida Orgánico', type: 'Insumo', category: 'Pesticidas' }
      ]
    }
  },
  'Mercado': {
    'Mercados Mayoristas': {
      icon: 'business-outline',
      items: [
        { id: 29, name: 'Mercado Central', type: 'Mercado', category: 'Mercados Mayoristas' },
        { id: 30, name: 'Terminal Agropecuario', type: 'Mercado', category: 'Mercados Mayoristas' },
        { id: 31, name: 'Mercado Regional', type: 'Mercado', category: 'Mercados Mayoristas' }
      ]
    }
  }
};

interface SearchDropdownProps {
  query: string;
  typeFilter: CategoryType | '';
  onSelect: (item: SuggestionItem) => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ 
  query,
  typeFilter,
  onSelect
}) => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleItemSelect = (item: SuggestionItem) => {
    console.log("handleItemSelect called");
    console.log("pathname:", pathname);
    console.log("item:", item);
    
    onSelect(item);
    
    if (item.type === 'Producto' && pathname !== '/trends') {
      router.push(`/latestdata/${item.id}/deepdive-producto`); 
    }
  };

  const getFilteredSuggestions = () => {
    const filtered: CategoryData = {};
    const typesToSearch = typeFilter 
      ? [typeFilter] 
      : ['Producto', 'Insumo', 'Mercado'] as CategoryType[];

    typesToSearch.forEach(type => {
      const typeData = ALL_SUGGESTIONS[type];
      if (!typeData) return;

      Object.entries(typeData).forEach(([category, data]) => {
        const filteredItems = query
          ? data.items.filter(item =>
              item.name.toLowerCase().includes(query.toLowerCase())
            )
          : data.items;

        if (filteredItems.length > 0) {
          filtered[category] = {
            icon: data.icon,
            items: filteredItems
          };
        }
      });
    });

    return filtered;
  };

  const filteredSuggestions = getFilteredSuggestions();

  return (
    <ScrollView
      style={[styles.dropdown, { backgroundColor: currentTheme.card }]}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      {Object.entries(filteredSuggestions).map(([category, data]) => (
        <View key={category} style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <Ionicons name={data.icon as any} size={16} color={currentTheme.text} />
            <Text style={[styles.categoryTitle, { color: currentTheme.text }]}>
              {category}
            </Text>
          </View>
          {data.items.map((item: SuggestionItem) => (
            <TouchableOpacity
              key={`${category}-${item.id}`}
              style={styles.suggestionItem}
              onPress={() => handleItemSelect(item)}
              activeOpacity={0.7}
            >
              <Text style={[styles.suggestionText, { color: currentTheme.text }]}>
                {item.name}
              </Text>
              <Ionicons name="chevron-forward-outline" size={16} color={currentTheme.text} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    maxHeight: 300,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  categoryContainer: {
    paddingVertical: spacing.xs,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  categoryTitle: {
    ...typography.h3,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  suggestionText: {
    ...typography.body,
    flex: 1,
  },
});
