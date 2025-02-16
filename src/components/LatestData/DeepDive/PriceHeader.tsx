import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../../hooks/useTheme';

type PriceHeaderProps = {
  priceRange: {
    min: number;
    max: number;
  };
  timestamp: string;
  market: string;
  trend: 'up' | 'down';
};

export default function PriceHeader({ priceRange, timestamp, market, trend }: PriceHeaderProps) {
  const { colors, typography, spacing } = useTheme();
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.xs }]}>
        Últimos precios locales
      </Text>
      <Text style={[typography.h1, styles.priceText, { color: colors.text }]}>
        ${priceRange.min.toLocaleString('es-CO')} - ${priceRange.max.toLocaleString('es-CO')}
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={[typography.small, { color: colors.textSecondary }]}>
          {timestamp} • {market}
        </Text>
        {trend === 'up' ? (
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Ionicons name="arrow-up-circle" size={20} color="#22c55e" />
          </Animated.View>
        ) : (
          <Ionicons name="arrow-down-circle" size={20} color="#ef4444" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
}); 