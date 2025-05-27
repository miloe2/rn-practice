import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );

  function RootNavigator() {
    return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }
}
