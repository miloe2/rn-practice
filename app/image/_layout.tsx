import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants';

const ImageLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: COLORS.BLACK,
        contentStyle: { backgroundColor: COLORS.WHITE },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '회원가입',
          headerShown: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
};

export default ImageLayout;

const styles = StyleSheet.create({});
