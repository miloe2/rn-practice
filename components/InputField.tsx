import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import React, { forwardRef } from 'react';
import { COLORS } from '@/constants/Colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'filled' | 'standard' | 'outline';
}

const InputField = forwardRef<TextInput, InputFieldProps>(({ label, variant = 'filled', error, ...props }, ref) => {
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
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          textAlignVertical='top'
          {...props}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

export default InputField;

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: COLORS.GRAY_200,
  },
  multiline: {
    height: 200,
    paddingVertical: 10,
  },
  standard: {},
  outline: {},
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
