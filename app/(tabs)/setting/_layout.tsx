import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function SettingLayout() {
  return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
      </Stack>
  );
}
