import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { CategoryType } from '../../types/latestData';
import { useRouter } from 'expo-router';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: CategoryType;
  onTypeSelect: (type: CategoryType) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeSelect,
}) => {
  const { colors, spacing } = useTheme();
  const router = useRouter();

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.accent }]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={[styles.searchBar, { backgroundColor: colors.searchBackground }]}
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Feather name="search" size={20} color={colors.card} />
          <TextInput
            style={[styles.searchInput, { color: colors.card }]}
            placeholder="Buscar productos..."
            placeholderTextColor={colors.border}
            value={searchQuery}
            onChangeText={onSearchChange}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        <View style={styles.typeFilter}>
          {['Producto', 'Insumo', 'Mercado'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                selectedType === type && [
                  styles.filterButtonActive,
                  { borderBottomColor: colors.card }
                ]
              ]}
              onPress={() => onTypeSelect(type as CategoryType)}
            >
              <Text style={[
                styles.filterText,
                { 
                  color: selectedType === type 
                    ? colors.card 
                    : colors.border 
                }
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  searchContainer: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 20,
    marginBottom: 4,
    height: 36,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    padding: 0,
  },
  typeFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
  },
  filterButtonActive: {
    borderBottomWidth: 2,
  },
  filterText: {
    fontSize: 14,
  },
});
