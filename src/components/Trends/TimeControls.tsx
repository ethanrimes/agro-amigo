import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

type TimeHorizon = '1M' | '6M' | '1YR' | '2YR' | '5YR' | 'ALL';
type Frequency = 'daily' | 'weekly' | 'monthly';

interface TimeControlsProps {
  selectedHorizon: TimeHorizon;
  selectedFrequency: Frequency;
  onHorizonChange: (horizon: TimeHorizon) => void;
  onFrequencyChange: (frequency: Frequency) => void;
}

export const TimeControls = ({
  selectedHorizon,
  selectedFrequency,
  onHorizonChange,
  onFrequencyChange,
}: TimeControlsProps) => {
  const { colors, typography } = useTheme();

  const horizons: TimeHorizon[] = ['1M', '6M', '1YR', '2YR', '5YR', 'ALL'];

  return (
    <View style={styles.container}>
      <View style={styles.horizonContainer}>
        {horizons.map((horizon) => (
          <Pressable
            key={horizon}
            style={[styles.horizonButton]}
            onPress={() => onHorizonChange(horizon)}
          >
            <Text
              style={[
                styles.horizonText,
                {
                  color: selectedHorizon === horizon ? colors.primary : colors.text,
                  opacity: selectedHorizon === horizon ? 1 : 0.5,
                  backgroundColor: selectedHorizon === horizon ? colors.card : 'transparent',
                },
              ]}
            >
              {horizon}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  horizonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizonButton: {
    padding: 4,
  },
  horizonText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
}); 