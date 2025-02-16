import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { SearchDropdown } from '../Header/SearchDropdown';
import { CategoryType } from '../../types/latestData';

interface LatestDataSearchHeaderProps {
  selectedType: CategoryType;
  onTypeChange: (type: CategoryType) => void;
}

export const LatestDataSearchHeader: React.FC<LatestDataSearchHeaderProps> = ({
  selectedType,
  onTypeChange
}) => {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const types: CategoryType[] = ['Producto', 'Insumo', 'Mercado'];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.primary }]}>
      {/* Type Selector Tabs */}
      <View style={styles.tabsContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.tab,
              selectedType === type && styles.selectedTab,
              { backgroundColor: selectedType === type ? currentTheme.card : 'transparent' }
            ]}
            onPress={() => onTypeChange(type)}
          >
            <Text style={[
              styles.tabText,
              { 
                color: selectedType === type ? currentTheme.text : currentTheme.card,
                opacity: selectedType === type ? 1 : 0.7
              },
              selectedType === type && styles.selectedTabText
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={[
        styles.searchContainer, 
        { backgroundColor: currentTheme.card }
      ]}>
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          style={[styles.searchInput, { color: currentTheme.text }]}
          placeholder={`Buscar en ${selectedType.toLowerCase()}...`}
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setIsSearching(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsSearching(false);
              setSearchQuery('');
            }, 200);
          }}
        />
        <Ionicons name="mic" size={18} color="#9ca3af" />
      </View>

      {/* Search Dropdown */}
      {searchQuery && (
        <View style={[styles.dropdownContainer, { 
          backgroundColor: currentTheme.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }]}>
          <SearchDropdown 
            query={searchQuery}
            typeFilter={selectedType}
            onSelect={(item) => {
              setSearchQuery(item.name);
            }}
          />
        </View>
      )}

      {/* Location */}
      <View style={styles.location}>
        <Ionicons 
          name="location-outline" 
          size={10} 
          color={currentTheme.card}
          style={{ opacity: 0.6 }}
        />
        <Text style={[styles.locationText, { 
          color: currentTheme.card,
          opacity: 0.6
        }]}>
          Popayán, Cauca
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    marginBottom: spacing.md,
    zIndex: 1,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedTab: {
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabText: {
    ...typography.body,
    fontWeight: '500',
  },
  selectedTabText: {
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  searchInput: {
    ...typography.body,
    flex: 1,
    marginHorizontal: spacing.xs,
    fontSize: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    ...typography.small,
    marginLeft: spacing.xs,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: spacing.sm,
    right: spacing.sm,
    borderRadius: 12,
    zIndex: 2000,
    elevation: 2000,
    marginTop: spacing.xs,
  },
});
