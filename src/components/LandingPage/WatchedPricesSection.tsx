import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { PriceCard, PriceCardProps } from './PriceCard';

interface WatchedPricesSectionProps {
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 160;
const VISIBLE_ITEMS = Math.floor(SCREEN_WIDTH / ITEM_WIDTH);

const sampleWatchedPrices = [
  {
    id: '1',
    product: 'Papa Pastusa',
    icon: 'package',
    priceRange: { min: 2500, max: 3200 },
    trend: 'up',
    market: 'Plaza de Mercado',
    timestamp: new Date('2025-02-15T10:30:00'),
  },
  {
    id: '2',
    product: 'Plátano Verde',
    icon: 'package',
    priceRange: { min: 1800, max: 2200 },
    trend: 'down',
    market: 'Plaza de Mercado',
    timestamp: new Date('2025-02-15T10:30:00'),
  },
  {
    id: '3',
    product: 'Tomate',
    icon: 'package',
    priceRange: { min: 1200, max: 1500 },
    trend: 'up',
    market: 'Plaza de Mercado',
    timestamp: new Date('2025-02-15T11:00:00'),
  },
  // Add more sample items as needed
];

export const WatchedPricesSection: React.FC = () => {
  const { colors } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [data, setData] = useState<PriceCardProps[]>(sampleWatchedPrices as PriceCardProps[]);
  const scrollingRef = useRef(false);
  const currentIndexRef = useRef(0);

  // Initialize with triple the data for smooth infinite scrolling
  useEffect(() => {
    const tripleData = [...sampleWatchedPrices, ...sampleWatchedPrices, ...sampleWatchedPrices];
    setData(tripleData as PriceCardProps[]);
  }, []);

  const handleScroll = (event: any) => {
    if (scrollingRef.current) return;

    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = ITEM_WIDTH + spacing.xs * 2;
    currentIndexRef.current = Math.floor(offsetX / itemWidth);

    if (currentIndexRef.current < sampleWatchedPrices.length) {
      currentIndexRef.current += sampleWatchedPrices.length;
      flatListRef.current?.scrollToOffset({
        offset: currentIndexRef.current * itemWidth,
        animated: false
      });
    } else if (currentIndexRef.current >= sampleWatchedPrices.length * 2) {
      currentIndexRef.current -= sampleWatchedPrices.length;
      flatListRef.current?.scrollToOffset({
        offset: currentIndexRef.current * itemWidth,
        animated: false
      });
    }
  };

  const handleMomentumScrollEnd = () => {
    scrollingRef.current = false;
  };

  // Auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollingRef.current && flatListRef.current && data.length > 0) {
        scrollingRef.current = true;
        const nextIndex = (currentIndexRef.current + 1) % (sampleWatchedPrices.length * 3);
        const itemWidth = ITEM_WIDTH + spacing.xs * 2;
        
        flatListRef.current.scrollToOffset({
          offset: nextIndex * itemWidth,
          animated: true
        });
        
        currentIndexRef.current = nextIndex;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [data]);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_WIDTH + spacing.xs * 2,
    offset: (ITEM_WIDTH + spacing.xs * 2) * index,
    index,
  });

  const renderItem = ({ item, index }: { item: PriceCardProps; index: number }) => (
    <View style={styles.cardWrapper}>
      <PriceCard {...item} />
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => {/* Handle remove */}}
      >
        <Feather name="x" size={14} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather name="eye" size={14} color={colors.accent} />
          <Text style={[styles.title, { color: colors.text }]}>
            Precios vigilados
          </Text>
        </View>
      </View>
      
      {data.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyExtractor={(item, index) => `${item.product}-${index}`}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={getItemLayout}
          initialNumToRender={VISIBLE_ITEMS * 3}
          maxToRenderPerBatch={VISIBLE_ITEMS * 3}
          windowSize={5}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
        />
      ) : (
        <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
          <Text style={[styles.emptyStateText, { color: colors.text }]}>
            Agrega productos para vigilar
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.small,
    marginLeft: spacing.xs,
    fontWeight: '500',
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  cardWrapper: {
    marginRight: spacing.md,
    marginVertical: 0,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  emptyState: {
    width: 160,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  emptyStateText: {
    ...typography.small,
    textAlign: 'center',
    opacity: 0.7,
  },
});
