import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useRouter } from 'expo-router';

export interface PriceCardProps {
  id: string;
  product: string;
  priceRange: {
    min: number;
    max: number;
  };
  trend: 'up' | 'down' | 'stable';
  market: string;
  timestamp: Date;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  id,
  product,
  priceRange,
  trend,
  market,
  timestamp,
}) => {
  const { currentTheme } = useTheme();
  const router = useRouter();

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP',
      maximumFractionDigits: 0 
    }).format(price);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePress = () => {
    console.log('PriceCard pressed');
    router.push(`/latestdata/${id}/deepdive-producto`);
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={[styles.card, { backgroundColor: currentTheme.card }]}
    >
      <Text style={[styles.product, { color: currentTheme.text }]}>{product}</Text>
      <Text style={[styles.priceRange, { color: currentTheme.text }]}>
        {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
      </Text>
      <View style={styles.footer}>
        <Feather 
          name={trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'minus'} 
          size={12} 
          color={trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : currentTheme.text} 
        />
        <Text style={[styles.marketInfo, { color: currentTheme.text }]}>
          {market} • {formatTime(timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.sm,
    borderRadius: 12,
    margin: spacing.xs,
    width: 160,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  product: {
    ...typography.small,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  priceRange: {
    ...typography.body,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketInfo: {
    ...typography.tiny,
    marginLeft: spacing.xs,
    opacity: 0.6,
  },
});
