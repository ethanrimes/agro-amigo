import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type Frequency = 'daily' | 'weekly' | 'monthly';
type PriceType = 'max' | 'avg' | 'min';
type Presentation = 'Bulto' | 'Caja' | 'Kilo' | 'Unidad';

interface GraphControlsProps {
  selectedFrequency: Frequency;
  selectedPriceTypes: PriceType[];
  presentation: Presentation;
  onFrequencyChange: (freq: Frequency) => void;
  onPriceTypeChange: (types: PriceType[]) => void;
  onPresentationChange: (pres: Presentation) => void;
}

export const GraphControls = ({
  selectedFrequency,
  selectedPriceTypes,
  presentation,
  onFrequencyChange,
  onPriceTypeChange,
  onPresentationChange,
}: GraphControlsProps) => {
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const { colors } = useTheme();
  
  const frequencies: Frequency[] = ['daily', 'weekly', 'monthly'];
  const priceTypes: PriceType[] = ['max', 'avg', 'min'];
  const presentations: Presentation[] = ['Bulto', 'Caja', 'Kilo', 'Unidad'];
  
  const frequencyLabels = {
    daily: 'Diario',
    weekly: 'Semanal',
    monthly: 'Mensual',
  };

  const priceLabels = {
    max: 'Máx',
    avg: 'Prom',
    min: 'Mín',
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Rango:</Text>
          <View style={styles.optionsRow}>
            {priceTypes.map((type) => (
              <Pressable
                key={type}
                onPress={() => {
                  const newTypes = selectedPriceTypes.includes(type)
                    ? selectedPriceTypes.filter(t => t !== type)
                    : [...selectedPriceTypes, type];
                  onPriceTypeChange(newTypes);
                }}
              >
                <Text
                  style={[
                    styles.option,
                    {
                      color: selectedPriceTypes.includes(type) ? colors.primary : colors.text,
                      opacity: selectedPriceTypes.includes(type) ? 1 : 0.5,
                    },
                  ]}
                >
                  {priceLabels[type]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Frecuencia:</Text>
          <View style={styles.optionsRow}>
            {frequencies.map((freq) => (
              <Pressable
                key={freq}
                onPress={() => onFrequencyChange(freq)}
              >
                <Text
                  style={[
                    styles.option,
                    {
                      color: selectedFrequency === freq ? colors.primary : colors.text,
                      opacity: selectedFrequency === freq ? 1 : 0.5,
                    },
                  ]}
                >
                  {frequencyLabels[freq]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.presentationSection}>
        <View style={styles.presentationRow}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Presentación:</Text>
          <Pressable
            style={[styles.presentationSelector, { backgroundColor: colors.card }]}
            onPress={() => setShowPresentationModal(true)}
          >
            <Text style={[styles.presentationText, { color: colors.text }]}>{presentation}</Text>
            <Ionicons name="chevron-down" size={16} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <Modal
        visible={showPresentationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPresentationModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowPresentationModal(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            {presentations.map((pres) => (
              <Pressable
                key={pres}
                style={styles.presentationOption}
                onPress={() => {
                  onPresentationChange(pres);
                  setShowPresentationModal(false);
                }}
              >
                <View style={styles.radioButton}>
                  {presentation === pres && (
                    <View style={[styles.radioButtonInner, { backgroundColor: colors.primary }]} />
                  )}
                </View>
                <Text style={[styles.presentationOptionText, { color: colors.text }]}>{pres}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  presentationSection: {
    marginTop: 8,
  },
  presentationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  presentationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 8,
  },
  presentationText: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 16,
  },
  presentationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  presentationOptionText: {
    fontSize: 14,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
}); 