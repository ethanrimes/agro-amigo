import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchDropdown } from '../Header/SearchDropdown';
import { useTheme } from '../../../hooks/useTheme';

interface SearchSectionProps {
  onProductoSelect: (producto: string) => void;
  onMercadoSelect: (mercado: string) => void;
}

export const SearchSection = ({ onProductoSelect, onMercadoSelect }: SearchSectionProps) => {
  const { colors, spacing } = useTheme();
  const [productoQuery, setProductoQuery] = useState('');
  const [mercadoQuery, setMercadoQuery] = useState('');
  const [isProductoFocused, setIsProductoFocused] = useState(false);
  const [isMercadoFocused, setIsMercadoFocused] = useState(false);

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { zIndex: 2 }]}>
        <Text style={[styles.label, { color: colors.text }]}>Precios de Producto:</Text>
        <View style={styles.searchWrapper}>
          <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
            <Ionicons name="search" size={14} color="#9ca3af" />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar producto..."
              placeholderTextColor="#9ca3af"
              value={productoQuery}
              onChangeText={setProductoQuery}
              onFocus={() => {
                setIsProductoFocused(true);
                setIsMercadoFocused(false);
              }}
              onBlur={() => setIsProductoFocused(false)}
            />
          </View>
          {isProductoFocused && (
            <View style={styles.dropdownContainer}>
              <SearchDropdown
                query={productoQuery}
                typeFilter="Producto"
                onSelect={(item) => {
                  onProductoSelect(item.name);
                  setProductoQuery('');
                  setIsProductoFocused(false);
                }}
              />
            </View>
          )}
        </View>
      </View>

      <View style={[styles.container, { zIndex: 1 }]}>
        <Text style={[styles.label, { color: colors.text, marginTop: spacing.md }]}>
          En Mercado:
        </Text>
        <View style={styles.searchWrapper}>
          <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
            <Ionicons name="search" size={14} color="#9ca3af" />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar mercado..."
              placeholderTextColor="#9ca3af"
              value={mercadoQuery}
              onChangeText={setMercadoQuery}
              onFocus={() => {
                setIsMercadoFocused(true);
                setIsProductoFocused(false);
              }}
              onBlur={() => setIsMercadoFocused(false)}
            />
          </View>
          {isMercadoFocused && (
            <View style={styles.dropdownContainer}>
              <SearchDropdown
                query={mercadoQuery}
                typeFilter="Mercado"
                onSelect={(item) => {
                  onMercadoSelect(item.name);
                  setMercadoQuery('');
                  setIsMercadoFocused(false);
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    padding: 16,
  },
  container: {
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  searchWrapper: {
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    zIndex: 1000,
  },
});