import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SearchDropdown } from '../src/components/Header/SearchDropdown';
import { useTheme } from '../hooks/useTheme';
import { CategoryType } from '../src/types/latestData';
import { spacing } from '../src/theme/spacing';

export default function SearchPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<CategoryType>('');

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (item: any) => {
    // Handle selection
    router.push(`/latestdata/${item.id}/deepdive-producto`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={[styles.searchContainer, { backgroundColor: colors.searchBackground }]}>
          <Ionicons name="search" size={20} color={colors.card} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.card }]}
            placeholder="Buscar producto..."
            placeholderTextColor={colors.border}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </View>

      {/* Search results */}
      <View style={styles.resultsContainer}>
        <SearchDropdown
          query={searchQuery}
          typeFilter={selectedType}
          onSelect={handleSelect}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    gap: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    height: 36,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  resultsContainer: {
    flex: 1,
    position: 'relative',
  },
}); 