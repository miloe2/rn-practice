import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';

interface VoteInputProps {
  index: number;
  onRemove: () => void;
}

export default function VoteInput({ index, onRemove }: VoteInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={`voteOptions.${index}.content`}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return '내용을 입력해주세요.';
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          variant="standard"
          value={value}
          onChangeText={onChange}
          error={error?.message}
          rightChild={
            <Pressable>
              <Ionicons name="close" size={20} color={COLORS.BLACK} onPress={onRemove} />
            </Pressable>
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
