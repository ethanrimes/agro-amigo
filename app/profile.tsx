import { View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import { ProfileContent } from '../src/components/Profile/ProfileContent';

export default function ProfilePage() {
  const { currentTheme } = useTheme();

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: currentTheme.background 
    }}>
      <ProfileContent />
    </View>
  );
}
