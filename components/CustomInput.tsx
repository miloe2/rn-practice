import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Controller,
  useFormContext,
} from 'react-hook-form';
import InputField from './InputField';

interface CustomInputProps {
  name: string;
  config: {
    label: string;
    placeholder: string;
  };
}

const CustomInput = ({
  name,
  config,
}: CustomInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          value={value}
          onChangeText={onChange}
          {...config}
        />
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
