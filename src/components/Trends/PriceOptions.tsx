import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Checkbox, RadioButton } from 'react-native-ui-lib';

type PriceType = 'max' | 'avg' | 'min';
type Presentation = 'caja' | 'bulto' | '30 uds.';

interface PriceOptionsProps {
  selectedPriceTypes: PriceType[];
  selectedPresentation: Presentation;
  onPriceTypeChange: (types: PriceType[]) => void;
  onPresentationChange: (presentation: Presentation) => void;
}

export const PriceOptions = ({
  selectedPriceTypes,
  selectedPresentation,
  onPriceTypeChange,
  onPresentationChange,
}: PriceOptionsProps) => {
  const { colors, typography, spacing } = useTheme();

  const priceTypes: { value: PriceType; label: string }[] = [
    { value: 'max', label: 'Máximo' },
    { value: 'avg', label: 'Promedio' },
    { value: 'min', label: 'Mínimo' },
  ];

  const presentations: Presentation[] = ['caja', 'bulto', '30 uds.'];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[typography.subtitle, { color: colors.text }]}>
          Rango de precio
        </Text>
        {priceTypes.map((type) => (
          <Checkbox
            key={type.value}
            label={type.label}
            value={selectedPriceTypes.includes(type.value)}
            onValueChange={(checked) => {
              const newTypes = checked
                ? [...selectedPriceTypes, type.value]
                : selectedPriceTypes.filter((t) => t !== type.value);
              onPriceTypeChange(newTypes);
            }}
            color={colors.primary}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[typography.subtitle, { color: colors.text }]}>
          Presentación
        </Text>
        {presentations.map((pres) => (
          <RadioButton
            key={pres}
            label={pres}
            value={pres}
            selected={selectedPresentation === pres}
            onPress={() => onPresentationChange(pres)}
            color={colors.primary}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
    gap: 8,
  },
}); 