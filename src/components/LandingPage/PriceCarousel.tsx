import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { PriceCard, PriceCardProps } from './PriceCard';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 160; // Width of each price card
const VISIBLE_ITEMS = Math.floor(SCREEN_WIDTH / ITEM_WIDTH);


const samplePrices = [
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
    {
      id: '4',
      product: 'Aguacate',
      icon: 'package',
      priceRange: { min: 3000, max: 3500 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T09:45:00'),
    },
    {
      id: '5',
      product: 'Zanahoria',
      icon: 'package',
      priceRange: { min: 1500, max: 1800 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T11:15:00'),
    },
    {
      id: '6',
      product: 'Cebolla Roja',
      icon: 'package',
      priceRange: { min: 2200, max: 2600 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:00:00'),
    },
    {
      id: '7',
      product: 'Lechuga',
      icon: 'package',
      priceRange: { min: 900, max: 1100 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:10:00'),
    },
    {
      id: '8',
      product: 'Pepino',
      icon: 'package',
      priceRange: { min: 1000, max: 1300 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T09:50:00'),
    },
    {
      id: '9',
      product: 'Espinaca',
      icon: 'package',
      priceRange: { min: 800, max: 1000 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:40:00'),
    },
    {
      id: '10',
      product: 'Calabacín',
      icon: 'package',
      priceRange: { min: 2000, max: 2500 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T11:05:00'),
    },
    {
      id: '11',
      product: 'Maíz Dulce',
      icon: 'package',
      priceRange: { min: 1500, max: 1800 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T09:55:00'),
    },
    {
      id: '12',
      product: 'Arroz',
      icon: 'package',
      priceRange: { min: 2800, max: 3200 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:30:00'),
    },
    {
      id: '13',
      product: 'Frijol Rojo',
      icon: 'package',
      priceRange: { min: 2200, max: 2700 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:50:00'),
    },
    {
      id: '14',
      product: 'Pechuga de Pollo',
      icon: 'package',
      priceRange: { min: 9500, max: 11000 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:20:00'),
    },
    {
      id: '15',
      product: 'Carne de Res',
      icon: 'package',
      priceRange: { min: 13000, max: 14500 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T11:10:00'),
    },
    {
      id: '16',
      product: 'Pescado',
      icon: 'package',
      priceRange: { min: 15000, max: 17000 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T09:40:00'),
    },
    {
      id: '17',
      product: 'Papas Fritas',
      icon: 'package',
      priceRange: { min: 3500, max: 4000 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T11:30:00'),
    },
    {
      id: '18',
      product: 'Tomate Cherry',
      icon: 'package',
      priceRange: { min: 2000, max: 2500 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T10:35:00'),
    },
    {
      id: '19',
      product: 'Mango',
      icon: 'package',
      priceRange: { min: 3500, max: 4000 },
      trend: 'down',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T11:20:00'),
    },
    {
      id: '20',
      product: 'Fresas',
      icon: 'package',
      priceRange: { min: 4500, max: 5000 },
      trend: 'up',
      market: 'Plaza de Mercado',
      timestamp: new Date('2025-02-15T09:30:00'),
    },
  ];

  export const PriceCarousel: React.FC = () => {
    const flatListRef = useRef<FlatList>(null);
    const [data, setData] = useState<PriceCardProps[]>([]);
    const scrollingRef = useRef(false);
    const currentIndexRef = useRef(0);
    
    // Initialize with triple the data for smooth infinite scrolling
    useEffect(() => {
      const tripleData = [...samplePrices, ...samplePrices, ...samplePrices];
      setData(tripleData as PriceCardProps[]);
      
      // Start at the middle set of data
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: samplePrices.length,
          animated: false
        });
      }, 100);
    }, []);
  
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollingRef.current) return;
  
      const offsetX = event.nativeEvent.contentOffset.x;
      const itemWidth = ITEM_WIDTH + spacing.xs * 2; // Include margins
      currentIndexRef.current = Math.floor(offsetX / itemWidth);
  
      // Check if we're near the start or end
      if (currentIndexRef.current < samplePrices.length) {
        // Near start - jump to middle set
        currentIndexRef.current += samplePrices.length;
        flatListRef.current?.scrollToOffset({
          offset: currentIndexRef.current * itemWidth,
          animated: false
        });
      } else if (currentIndexRef.current >= samplePrices.length * 2) {
        // Near end - jump to middle set
        currentIndexRef.current -= samplePrices.length;
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
        if (!scrollingRef.current && flatListRef.current) {
          scrollingRef.current = true;
          
          // Calculate next index with looping
          const nextIndex = (currentIndexRef.current + 1) % (samplePrices.length * 3);
          const itemWidth = ITEM_WIDTH + spacing.xs * 2;
          
          flatListRef.current.scrollToOffset({
            offset: nextIndex * itemWidth,
            animated: true
          });
          
          currentIndexRef.current = nextIndex;
        }
      }, 1500); // Scroll every 1.5 seconds
  
      return () => clearInterval(interval);
    }, []);
  
    const getItemLayout = (_: any, index: number) => ({
      length: ITEM_WIDTH + spacing.xs * 2,
      offset: (ITEM_WIDTH + spacing.xs * 2) * index,
      index,
    });
  
    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={({ item }) => <PriceCard {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
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
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginVertical: spacing.md,
    },
    carouselContent: {
      paddingHorizontal: spacing.md,
    },
  });