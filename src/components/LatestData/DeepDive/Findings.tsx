import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';

type Finding = {
  text: string;
  number: string;
  trend: 'up' | 'down';
};

type FindingsProps = {
  findings: Finding[];
};

export default function Findings({ findings }: FindingsProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginVertical: spacing.md }]}>
      <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
        Hallazgos
      </Text>
      {findings.map((finding, index) => (
        <View key={index} style={[styles.findingRow, { marginBottom: spacing.sm }]}>
          <Text style={[typography.small, { color: colors.textTertiary }]}>•</Text>
          <Text style={[typography.small, { color: colors.text }]}>
            {finding.text}:{' '}
            <Text style={{ 
              color: finding.trend === 'up' ? '#22c55e' : '#ef4444'
            }}>
              {finding.number}
            </Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  findingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
}); 