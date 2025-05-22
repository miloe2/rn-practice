import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import {
  Controller,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import InputField from './InputField';

interface CustomInputProps extends TextInputProps {
  name: string;
  label: string;
  focusItem?: string;
  rules?: RegisterOptions;
}

const CustomInput = ({
  name,
  label,
  focusItem,
  rules,
  ...rest
}: CustomInputProps) => {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
      }) => (
        <InputField
          ref={ref}
          value={value}
          label={label}
          onChangeText={onChange}
          error={error?.message}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => {
            setFocus('password');
          }}
          {...rest}
        />
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
