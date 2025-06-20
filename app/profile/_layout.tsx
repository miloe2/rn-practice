import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Stack, Link } from 'expo-router';
import { Feather, Foundation } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants';

function ProfileLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTintColor: COLORS.BLACK,
        contentStyle: { backgroundColor: COLORS.WHITE },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ flex: 1 }}>
              <Feather name="arrow-left" size={28} color={'black'} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTitle: '프로필 편집',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ flex: 1 }}>
              <Feather name="arrow-left" size={28} color={'black'} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

export default ProfileLayout;

const styles = StyleSheet.create({});
