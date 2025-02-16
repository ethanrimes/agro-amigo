import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const insights = [
  "Los precios de las papas han subido un 15% esta semana debido a las lluvias en la región.",
  "Se espera que los precios del plátano se estabilicen en los próximos días.",
  "Nuevos productores de yuca se unen al mercado local.",
];

export const InsightCard: React.FC = () => {
  const { currentTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const animateSlide = (nextIndex: number) => {
    slideAnimation.setValue(0);
    
    Animated.sequence([
      // Slide current text up and fade out
      Animated.timing(slideAnimation, {
        toValue: -1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Reset position for next text
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      // Slide new text in from bottom
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % insights.length;
      animateSlide(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const translateY = slideAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-contentHeight, 0, contentHeight],
  });

  const opacity = slideAnimation.interpolate({
    inputRange: [-1, -0.5, 0, 0.5, 1],
    outputRange: [0, 0.5, 1, 0.5, 0],
  });

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.card }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Datos clave</Text>
      <View 
        style={styles.contentWrapper}
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
      >
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          <Text 
            style={[styles.text, { color: currentTheme.text }]}
            numberOfLines={2}
          >
            {insights[currentIndex]}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.xs,
    padding: spacing.sm,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    ...typography.h2,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  contentWrapper: {
    height: 50, // Reduced fixed height
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    ...typography.body,
    fontSize: 14,
  },
});