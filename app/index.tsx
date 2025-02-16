import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ThemeProvider } from '../src/context/ThemeContext';
import { ThemeToggle } from '../src/components/LandingPage/ThemeToggle';
import { Header } from '../src/components/LandingPage/Header';
import { WatchedPricesSection } from '../src/components/LandingPage/WatchedPricesSection';
import { PriceCarousel } from '../src/components/LandingPage/PriceCarousel';
import { InsightCard } from '../src/components/LandingPage/InsightCard';
import { BottomNav } from '../src/components/BottomNav';
import { useTheme } from '../src/context/ThemeContext';

const AppContent: React.FC = () => {
  const { currentTheme } = useTheme();
  
  // Sample data for watched prices - you'll want to replace this with real data
  const watchedPrices = [
    { id: '1',
      product: "Tomate Cherry",
      icon: "box",
      priceRange: { min: 2000, max: 2500 },
      trend: "up" as const,
      market: "Plaza de Mercado",
      timestamp: new Date(),
    },
    // Add more sample data as needed
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <ThemeToggle />
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <WatchedPricesSection 
            watchedPrices={watchedPrices}
            onAddWatchedPrice={() => {
              console.log('Add watched price clicked');
            }}
          />
          <PriceCarousel />
          <InsightCard />
          {/* Add padding at bottom to account for BottomNav */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomPadding: {
    height: 80, // Adjust this value based on your BottomNav height
  },
  headerContainer: {
    zIndex: 1000, // Add this to ensure header and dropdown are above other elements
    elevation: 1000, // For Android
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}