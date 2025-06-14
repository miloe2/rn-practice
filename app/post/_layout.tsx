import { StyleSheet, Pressable, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Feather, Foundation } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants';

const PostLayout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTintColor: COLORS.BLACK,
        contentStyle: { backgroundColor: COLORS.WHITE },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: '글쓰기',
          headerShown: true,
          // headerBackButtonDisplayMode: 'minimal',
          headerLeft: () => (
            <Pressable onPress={() => router.replace('/')}>
              <Feather name="arrow-left" size={28} color={'black'} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: '수정',
          headerShown: true,
          // headerBackButtonDisplayMode: 'minimal',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={'black'} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerShown: true,
          // headerBackButtonDisplayMode: 'minimal',
          headerLeft: () => (
            <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
              <Feather name="arrow-left" size={28} color={'black'} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default PostLayout;

const styles = StyleSheet.create({});
