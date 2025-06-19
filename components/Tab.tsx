import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '@/constants';

interface TabProps {
  isActive: boolean;
  onPress?: () => void;
  children: ReactNode;
}

export default function Tab({ isActive, children, onPress }: TabProps) {
  return (
    <Pressable style={[styles.container, isActive && styles.activeContainer]} onPress={onPress}>
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.WHITE,
    borderBottomWidth: 2,
  },
  activeContainer: {
    borderBottomColor: COLORS.BLACK,
  },
  text: {
    color: COLORS.GRAY_500,
    fontSize: 14,
  },
  activeText: {
    color: COLORS.ORANGE_600,
    fontWeight: 'bold',
  },
});
