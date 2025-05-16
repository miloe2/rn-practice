import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '@/constants/Colors';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'medium' | 'large';
  variant?: 'filled' | 'outline';
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
          ]}
        >
          <Text style={styles[variant]}>{label}</Text>
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
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  outline: {
    backgroundColor: COLORS.GRAY_100,
    borderColor: COLORS.ORANGE_600,
    // borderWidth: 1,
    fontSize: 14,
  },
  large: {
    // width: '100%',
    height: 44,
  },
  medium: {
    // width: '100%',
    height: 32,
  },
  pressed: {
    opacity: 0.9,
    // transform: [{ scale: 0.98 }],
  },
});

export default CustomButton;
