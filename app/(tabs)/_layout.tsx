import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { COLORS } from '@/constants/Colors';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.ORANGE_600,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '마이',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? 'person-sharp' : 'person-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: '설정',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? 'settings' : 'settings-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
