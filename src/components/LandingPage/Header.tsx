import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { SearchDropdown } from '../Header/SearchDropdown';

export const Header: React.FC = () => {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <View style={[
      styles.container, 
      { backgroundColor: currentTheme.primary },
      // isSearching && styles.fixedHeader
    ]}>
      <Text style={[styles.slogan, { 
        color: currentTheme.card,
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4
      }]}>
        El precio correcto aquí
      </Text>
      <View style={[
        styles.searchContainer, 
        { backgroundColor: currentTheme.card },
        isSearching && styles.expandedSearchContainer
      ]}>
        <Ionicons name="search" size={isSearching ? 18 : 14} color="#9ca3af" />
        <TextInput
          style={[
            styles.searchInput, 
            { color: currentTheme.text },
            isSearching && styles.expandedSearchInput
          ]}
          placeholder="Buscar productos agrícolas..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
          onFocus={() => {
            setIsSearching(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsSearching(false);
              setSearchQuery('');
            }, 200);
          }}
        />
        <Ionicons name="mic" size={isSearching ? 18 : 14} color="#9ca3af" />
      </View>
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
            typeFilter=""
            onSelect={(item) => {
              setSearchQuery(item.name);
            }}
          />
        </View>
      )}
      <View style={styles.location}>
        <Ionicons 
          name="location-outline" 
          size={10} 
          color={currentTheme.card}
          style={{ opacity: 0.8 }}
        />
        <Text style={[styles.locationText, { 
          color: currentTheme.card,
          opacity: 0.8 
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
  slogan: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
    transform: [{ scale: 1 }],
  },
  expandedSearchContainer: {
    paddingVertical: spacing.sm,
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    ...typography.body,
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  expandedSearchInput: {
    fontSize: 16,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});