import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import React, { forwardRef, ReactNode } from 'react';
import { COLORS } from '@/constants';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'filled' | 'standard' | 'outline';
  rightChild?: ReactNode;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, variant = 'filled', error, rightChild = null, ...props }, ref) => {
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.container,
            styles[variant],
            props.multiline ? styles.multiline : null,
            error ? styles.errorInput : null,
          ]}
        >
          <TextInput
            ref={ref}
            placeholderTextColor={COLORS.GRAY_500}
            style={[styles.input, styles[`${variant}Text`]]}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textAlignVertical="top"
            {...props}
          />
          {rightChild}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiline: {
    height: 200,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  filled: {
    backgroundColor: COLORS.GRAY_100,
  },
  standard: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.ORANGE_600,
  },
  filledText: {
    color: COLORS.BLACK,
  },
  standardText: {
    color: COLORS.BLACK,
  },
  outlineText: {
    color: COLORS.ORANGE_600,
    fontWeight: 'bold',
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  errorInput: {
    backgroundColor: COLORS.RED_100,
  },
  label: {
    fontSize: 12,
    color: COLORS.GRAY_700,
    marginBottom: 5,
  },
  error: {
    fontSize: 12,
    marginTop: 10,
    color: COLORS.RED_500,
  },
});
