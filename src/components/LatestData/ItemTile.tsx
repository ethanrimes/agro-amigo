import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Item } from '../../types/latestData';
import { Feather } from '@expo/vector-icons';

interface ItemTileProps {
  item: Item;
  onPress: (item: Item) => void;
}

export const ItemTile: React.FC<ItemTileProps> = ({ item, onPress }) => {
  const { colors, typography, spacing } = useTheme();
  const currentTime = new Date(item.timestamp).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <TouchableOpacity 
      style={[
        styles.tile, 
        { 
          backgroundColor: colors.card,
          margin: spacing.xs,
          padding: spacing.sm,
        }
      ]} 
      onPress={() => onPress(item)}
    >
      <Text style={[typography.subtitle, { color: colors.text, marginBottom: spacing.xs }]}>
        {item.name}
      </Text>
      <Text style={[typography.small, { color: colors.text, marginBottom: spacing.xs }]}>
        {item.prices}
      </Text>
      <View style={styles.footer}>
        <Feather 
          name={item.trendUp ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={item.trendUp ? '#22c55e' : '#ef4444'} 
        />
        <View style={styles.marketInfo}>
          <Text style={[typography.small, { color: colors.textSecondary }]}>
            {item.market}
          </Text>
          <Text style={[typography.tiny, { color: colors.textTertiary }]}>
            {currentTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: '47%',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  marketInfo: {
    flex: 1,
  },
});