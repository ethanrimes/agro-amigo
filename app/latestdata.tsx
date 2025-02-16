import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import { BrowseContent } from '../src/components/LatestData/BrowseContent';
import { LatestDataSearchHeader } from '../src/components/LatestData/LatestDataSearchHeader';
import { spacing } from '../src/theme/spacing';
import { CategoryType } from '../src/types/latestData';

export default function LatestDataPage() {
  const { currentTheme } = useTheme();
  const [selectedType, setSelectedType] = useState<CategoryType>('Producto');

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <LatestDataSearchHeader 
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="normal"
      >
        <BrowseContent selectedType={selectedType} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});