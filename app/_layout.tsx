import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';
import { View } from 'react-native';
import { BottomNav } from '../src/components/BottomNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <Stack 
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' }
            }}
          />
          <BottomNav />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}