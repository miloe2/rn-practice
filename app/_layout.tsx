import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import 'react-native-reanimated';
import useAuth from '@/hooks/queries/useAuth';
import '../global.css';
import queryClient from '@/api/queryClient';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
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
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="post" options={{ headerShown: false }} />
        <Stack.Screen name="image" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }
}
