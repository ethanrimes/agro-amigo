import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { CategoryType } from '../../types/latestData';

interface TypeSelectorProps {
  selectedType: CategoryType;
  onTypeChange: (type: CategoryType) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  const { colors, typography, spacing } = useTheme();
  const types: CategoryType[] = ['Producto', 'Insumo', 'Mercado'];
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.background,
        padding: spacing.xs,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        marginBottom: spacing.xs,
      }
    ]}>
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.button,
            { 
              backgroundColor: selectedType === type ? colors.card : 'transparent',
              flex: 1,
              paddingVertical: spacing.md,
            }
          ]}
          onPress={() => onTypeChange(type)}
        >
          <Text style={[
            typography.body,
            { 
              color: selectedType === type ? colors.text : colors.textSecondary,
              textAlign: 'center',
              fontWeight: selectedType === type ? '700' : '500',
            }
          ]}>
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  button: {
    borderRadius: 12,
  },
});