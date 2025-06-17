import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'medium' | 'large';
  variant?: 'filled' | 'outline' | 'standard';
}

const CustomButton = ({
  label,
  size = 'large',
  variant = 'filled',
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            styles[variant],
            styles[size],
            pressed && styles.pressed,
            props.disabled && styles.disabled,
          ]}
        >
          <Text style={styles[`text_${variant}`]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: COLORS.ORANGE_600,
  },
  outline: {
    backgroundColor: COLORS.GRAY_100,
    borderColor: COLORS.ORANGE_600,
    borderWidth: 1,
  },
  standard: {},
  text_standard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.ORANGE_600,
  },
  text_outline: {
    fontSize: 14,
  },
  text_filled: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  large: {
    height: 44,
  },
  medium: {
    height: 32,
  },
  pressed: {
    opacity: 0.9,
    // transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: COLORS.GRAY_300,
  },
});

export default CustomButton;
