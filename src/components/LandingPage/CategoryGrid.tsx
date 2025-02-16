import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const categories = [
  'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Meat',
  'Herbs', 'Seeds', 'Tools', 'Feed', 'Equipment',
  'Organic', 'Local', 'Seasonal', 'Crafts', 'Community'
];

const numColumns = 5;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - (spacing.md * 2) - (spacing.sm * (numColumns - 1))) / numColumns;

export const CategoryGrid: React.FC = () => {
  const { currentTheme } = useTheme();

  const renderItem = ({ item }: { item: string }) => (
    <View 
      style={[
        styles.categoryItem, 
        { 
          backgroundColor: currentTheme.secondary,
          width: itemWidth,
        }
      ]}
    >
      <View style={[styles.categoryIcon, { backgroundColor: currentTheme.accent }]} />
      <Text style={[typography.tiny, { color: currentTheme.text, textAlign: 'center' }]}>
        {item}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.card }]}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        numColumns={numColumns}
        keyExtractor={(item) => item}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  categoryItem: {
    aspectRatio: 1,
    margin: spacing.xs,
    borderRadius: 8,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: spacing.xs,
  },
});