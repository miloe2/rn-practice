import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CustomButtonProps {
  label: string;
  size?: 'medium' | 'large';
  intent?: 'filled' | 'outline';
  onPress?: () => void;
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  filledButton: {
    backgroundColor: Colors.ORANGE_600,
  },
  filledText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: Colors.ORANGE_600,
  },
  outlineText: {
    color: Colors.BLACK,
  },
  large: {
    height: 32,
  },
  medium: {
    height: 24,
  },
  pressStyle: {
    opacity: 0.7,
  },
});

const buttonStyleMap = {
  filled: {
    container: styles.filledButton,
    text: styles.filledText,
  },
  outline: {
    container: styles.outlineButton,
    text: styles.outlineText,
  },
};

const CustomButton = ({
  label,
  size = 'large',
  intent = 'filled',
  onPress,
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[size],
        buttonStyleMap[intent].container,
        pressed && styles.pressStyle,
      ]}
      onPress={onPress}
    >
      <Text style={buttonStyleMap[intent].text}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
