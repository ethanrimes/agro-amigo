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
  icon: string;
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
  icon,
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
      <View style={styles.header}>
        <Feather name={icon as any} size={24} color={currentTheme.accent} />
        <Text style={[styles.product, { color: currentTheme.text }]}>{product}</Text>
      </View>
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
    padding: spacing.md,
    borderRadius: 12,
    margin: spacing.xs,
    width: 160,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  product: {
    ...typography.body,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
  priceRange: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketInfo: {
    ...typography.tiny,
    marginLeft: spacing.xs,
    opacity: 0.7,
  },
});
