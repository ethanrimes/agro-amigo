import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../hooks/useTheme';
import PriceHeader from '../../../src/components/LatestData/DeepDive/PriceHeader';
import Findings from '../../../src/components/LatestData/DeepDive/Findings';
import CategoryPath from '../../../src/components/LatestData/DeepDive/CategoryPath';
import BoxWhiskerPlot from '../../../src/components/LatestData/DeepDive/BoxWhiskerPlot';

// Window data
const { height: windowHeight } = Dimensions.get('window');

export default function DeepDiveProducto() {
  const { colors, typography, spacing } = useTheme();
  const { artiId } = useLocalSearchParams<{ artiId: string }>();

  // Update the mock data to use the artiId
  const priceData = {
    priceRange: {
      min: 23000,
      max: 27000
    },
    timestamp: "2024-02-16 14:30",
    market: "Mercado Central",
    trend: "up" as const,
    daneCode: artiId, // Using the dynamic ID here
    cpcCode: artiId,  // Using the dynamic ID here
    findings: [
      { text: "Los precios subieron", number: "+15%", trend: "up" as const },
      { text: "El inventario bajó", number: "-25%", trend: "down" as const },
      { text: "La demanda aumentó", number: "+30%", trend: "up" as const }
    ],
    marketPrices: [
      { market: "Mercado Central", price: 25000 },
      { market: "Plaza Minorista", price: 23000 },
      { market: "Corabastos", price: 27000 },
      { market: "Plaza La Perseverancia", price: 24500 },
      { market: "Central de Abastos", price: 26000 },
      { market: "Mercado Municipal", price: 24000 },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.header, { 
          backgroundColor: colors.card,
          padding: spacing.md,
          shadowColor: colors.text,
        }]}>
          <CategoryPath 
            categories={['Alimentos', 'Frutas', 'Manzanas']}
            icon="🍎"
            danecode={priceData.daneCode}
            cpccode={priceData.cpcCode}
          />
        </View>

        <View style={[styles.content, { padding: spacing.md }]}>
          <PriceHeader {...priceData} />
          
          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <BoxWhiskerPlot marketPrices={priceData.marketPrices} />
          
          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <Findings findings={priceData.findings} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      height: windowHeight,
    },
    scrollView: {
      height: windowHeight,
    },
    scrollViewContent: {
      minHeight: windowHeight,
    },
    content: {
      minHeight: windowHeight * 1, // 80% of screen height to leave some space for header
    },
    header: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    separator: {
      height: 1,
      marginVertical: 16,
    },
  });