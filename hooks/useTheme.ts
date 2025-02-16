import { useColorScheme } from 'react-native';
import { theme } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { typography } from '../src/theme/typography';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const colors = theme[colorScheme ?? 'light'];

  return {
    colors,
    spacing,
    typography,
  };
};