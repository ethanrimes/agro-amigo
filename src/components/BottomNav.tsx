import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const navItems = [
  { icon: 'home', label: 'Inicio', href: '/' },
  { icon: 'bar-chart', label: 'Últimos Datos', href: '/latestdata' },
  { icon: 'trending-up', label: 'Tendencias', href: '/trends' },
  { icon: 'user', label: 'Perfil', href: '/profile' },
];

export const BottomNav: React.FC = () => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { 
      backgroundColor: currentTheme.card,
      borderTopColor: currentTheme.border
    }]}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.href as any)}
            style={({ pressed }) => [
              styles.navItem,
              pressed && styles.pressed,
              isActive && styles.activeItem,
            ]}
          >
            <Feather 
              name={item.icon as any} 
              size={24} 
              color={isActive ? currentTheme.primary : currentTheme.text} 
            />
            <Text 
              style={[
                styles.navLabel, 
                { 
                  color: isActive ? currentTheme.primary : currentTheme.text 
                }
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    padding: spacing.xs,
    borderRadius: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
  activeItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  navLabel: {
    ...typography.tiny,
    marginTop: spacing.xs,
  },
});
