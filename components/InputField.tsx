import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: 'filled' | 'standard' | 'outline';
}

const InputField = ({
  label,
  variant = 'filled',
  ...props
}: InputFieldProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, styles[variant]]}>
        <TextInput
          placeholderTextColor={COLORS.GRAY_500}
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: COLORS.GRAY_100,
  },
  standard: {},
  outline: {},
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 12,
    color: COLORS.GRAY_700,
    marginBottom: 5,
  },
});
