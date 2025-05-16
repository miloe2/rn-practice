import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
