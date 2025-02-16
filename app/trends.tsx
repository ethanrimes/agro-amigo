import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SearchSection } from '../src/components/Trends/SearchSection';
import { TimeControls } from '../src/components/Trends/TimeControls';
import { GraphControls } from '../src/components/Trends/GraphControls';
import { TrendsHeader } from '../src/components/Trends/TrendsHeader';
import Plotly from 'react-native-plotly';

type TimeHorizon = '1M' | '6M' | '1YR' | '2YR' | '5YR' | 'ALL';
type Frequency = 'daily' | 'weekly' | 'monthly';
type PriceType = 'max' | 'avg' | 'min';
type Presentation = 'Bulto' | 'Caja' | 'Kilo' | 'Unidad';

export default function TrendsPage() {
  const { colors, typography } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('1M');
  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [selectedPriceTypes, setSelectedPriceTypes] = useState<PriceType[]>(['avg']);
  const [presentation, setPresentation] = useState<Presentation>('Bulto');
  const [contentHeight, setContentHeight] = useState(0);
  
  const windowDimensions = Dimensions.get('window');
  const windowHeight = windowDimensions.height;
  const windowWidth = windowDimensions.width;

  // Calculate minimum content height (1.2x screen height to ensure scrollability)
  const minContentHeight = Math.max(windowHeight * 1.2, contentHeight);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const GraphSection = () => {
    const data = [{
      x: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      y: [20, 45, 28, 80, 99, 43],
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: colors.primary,
        width: 2
      },
      marker: {
        color: colors.primary,
        size: 8
      }
    }];

    const layout = {
      title: '',
      plot_bgcolor: colors.background,
      paper_bgcolor: colors.background,
      font: {
        color: colors.text
      },
      xaxis: {
        gridcolor: colors.border,
        showgrid: true
      },
      yaxis: {
        gridcolor: colors.border,
        showgrid: true
      },
      margin: {
        l: 40,
        r: 20,
        t: 20,
        b: 40
      }
    };

    return (
      <View style={styles.graphContainer}>
        <Plotly
          data={data}
          layout={layout}
          style={{
            width: windowWidth,
            height: 300,
          }}
          config={{
            displayModeBar: false,
            responsive: true
          }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.pageContainer, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { minHeight: minContentHeight }
        ]}
      >
        <View style={styles.headerSection}>
          <TrendsHeader />
          
          <SearchSection
            onProductoSelect={setSelectedProduct}
            onMercadoSelect={setSelectedMarket}
          />
        </View>
        
        <View 
          style={styles.graphSection}
          onLayout={handleContentLayout}
        >
          <Text style={[typography.h2, styles.graphTitle, { color: colors.text }]}>
            {`Comportamiento ${selectedProduct || 'Producto'} en ${selectedMarket || 'Mercado'}`}
          </Text>
          
          <TimeControls
            selectedHorizon={timeHorizon}
            selectedFrequency={frequency}
            onHorizonChange={setTimeHorizon}
            onFrequencyChange={setFrequency}
          />

          <GraphSection />

          <GraphControls
            selectedFrequency={frequency}
            selectedPriceTypes={selectedPriceTypes}
            presentation={presentation}
            onFrequencyChange={setFrequency}
            onPriceTypeChange={setSelectedPriceTypes}
            onPresentationChange={setPresentation}
          />

          <View style={styles.observationsSection}>
            <Text style={[styles.observationsTitle, { color: colors.text }]}>
              Observaciones Principales
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={[styles.bullet, { color: colors.text }]}>• Tendencia alcista en los últimos 3 meses</Text>
              <Text style={[styles.bullet, { color: colors.text }]}>• Precio máximo histórico alcanzado en Mayo</Text>
              <Text style={[styles.bullet, { color: colors.text }]}>• Volatilidad reducida en el último mes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  headerSection: {
    width: '100%',
  },
  graphSection: {
    padding: 0,
    flex: 1,
  },
  graphTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  graphContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  observationsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  observationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bulletPoints: {
    gap: 8,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
  },
});