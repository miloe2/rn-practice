import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';
import useAuth from '@/hooks/queries/useAuth';
import '../global.css';
import queryClient from '@/api/queryClient';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      <Toast />
    </QueryClientProvider>
  );

  function RootNavigator() {
    const { auth } = useAuth();

    useEffect(() => {
      auth.id &&
        Toast.show({
          type: 'success',
          text1: `${auth.nickname ?? '회원'}님 안녕하세요.`,
          text2: 'ㅎㅇㅎㅇ',
        });
    }, [auth.id]);
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="post" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }
}
