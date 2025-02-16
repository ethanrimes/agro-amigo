import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';

type MarketPrice = {
  market: string;
  price: number;
};

type BoxWhiskerPlotProps = {
  marketPrices: MarketPrice[];
};

export default function BoxWhiskerPlot({ marketPrices }: BoxWhiskerPlotProps) {
  const { colors, typography, spacing } = useTheme();
  const [selectedMarket, setSelectedMarket] = useState<MarketPrice | null>(null);

  // Add timeout effect for selected market
  useEffect(() => {
    if (selectedMarket) {
      const timeout = setTimeout(() => {
        setSelectedMarket(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [selectedMarket]);

  // Sort prices to find min, max, and average
  const sortedPrices = [...marketPrices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0];
  const highestPrice = sortedPrices[sortedPrices.length - 1];
  const averagePrice = sortedPrices[Math.floor(sortedPrices.length / 2)];

  const priceRange = highestPrice.price - lowestPrice.price;
  
  return (
    <View style={[styles.container, { marginVertical: spacing.md }]}>
      <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
        Precios por Mercado
      </Text>
      
      <View style={styles.plotContainer}>
        {/* Price line with dots */}
        <View style={[styles.priceLine, { backgroundColor: colors.border }]} />
        
        {/* Connecting lines for extremes */}
        <View 
          style={[
            styles.connectingLine,
            { 
              left: '0%',
              backgroundColor: colors.textSecondary,
            }
          ]} 
        />
        <View 
          style={[
            styles.connectingLine,
            { 
              left: '100%',
              backgroundColor: colors.textSecondary,
            }
          ]} 
        />

        {marketPrices.map((market, index) => {
          const position = ((market.price - lowestPrice.price) / priceRange) * 100;
          return (
            <Pressable
              key={index}
              style={[
                styles.priceDot,
                {
                  left: `${position}%`,
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedMarket(market)}
            />
          );
        })}
        
        {/* Selected market popup */}
        {selectedMarket && (
          <View 
            style={[
              styles.popup,
              { 
                left: `${((selectedMarket.price - lowestPrice.price) / priceRange) * 100}%`,
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text style={[typography.tiny, { color: colors.text }]}>
              {selectedMarket.market}
              {'\n'}
              ${selectedMarket.price.toLocaleString()}
            </Text>
          </View>
        )}

        {/* Axis with ticks and values */}
        <View style={[styles.axis, { backgroundColor: colors.border }]} />
        {[0, 25, 50, 75, 100].map((percent) => (
          <React.Fragment key={percent}>
            <View style={[styles.tick, { left: `${percent}%` }]} />
            <Text 
              style={[
                typography.tiny, 
                styles.tickLabel, 
                { 
                  left: `${percent}%`,
                  color: colors.textSecondary 
                }
              ]}
            >
              ${Math.round(lowestPrice.price + (priceRange * (percent / 100))).toLocaleString()}
            </Text>
          </React.Fragment>
        ))}
      </View>

      {/* Remove the stats container since we moved it to callouts */}
      <View style={styles.averageContainer}>
        <View style={styles.statItem}>
          <Text style={[typography.tiny, { color: colors.textSecondary }]}>
            Más bajo:
          </Text>
          <Text style={[typography.tiny, { color: colors.text }]}>
            {lowestPrice.market}
            {'\n'}
            ${lowestPrice.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[typography.tiny, { color: colors.textSecondary }]}>
            Promedio nacional:
          </Text>
          <Text style={[typography.tiny, { color: colors.text }]}>
            {averagePrice.market}
            {'\n'}
            ${averagePrice.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[typography.tiny, { color: colors.textSecondary }]}>
            Más alto:
          </Text>
          <Text style={[typography.tiny, { color: colors.text }]}>
            {highestPrice.market}
            {'\n'}
            ${highestPrice.price.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',  // Add this line to center the container
  },
  plotContainer: {
    height: 40,
    width: '100%',
    position: 'relative',
  },
  priceLine: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: 1,
  },
  priceDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: '50%',
    transform: [{ translateY: -4 }],
  },
  popup: {
    position: 'absolute',
    padding: 8,
    borderRadius: 4,
    top: -40,
    transform: [{ translateX: -50 }],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  connectingLine: {
    position: 'absolute',
    width: 1,
    height: 24,
    top: '50%',
  },
  axis: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 1,
  },
  tick: {
    position: 'absolute',
    bottom: 0,
    width: 1,
    height: 4,
    backgroundColor: '#666',
    transform: [{ translateX: -0.5 }],
  },
  axisLabel: {
    position: 'absolute',
    bottom: -20,
    right: 0,
  },
  tickLabel: {
    position: 'absolute',
    bottom: -24,
    transform: [{ translateX: -25 }],
  },
  statCallout: {
    position: 'absolute',
    padding: 8,
    borderRadius: 4,
    minWidth: 120,
    alignItems: 'center',
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
}); 