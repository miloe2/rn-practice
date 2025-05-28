import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import { Stack, Link } from 'expo-router';
import { Foundation } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';

const AuthLayout = () => {
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
        name="index"
        options={{
          title: '로그인',
          headerShown: true,
          headerLeft: () => (
            <Pressable
              onPress={() => router.replace('/')}
              style={{
                flex: 1,
                // paddingLeft: 10,
              }}
            >
              <Foundation
                name="home"
                size={28}
                color={'black'}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: '이메일 로그인',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: '회원가입',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
