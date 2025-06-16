import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import InputField from './InputField';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';

export default function VoteAttached() {
  const { control, setValue, resetField, watch } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ['isVoteAttached'] });
  return (
    <>
      {isVoteAttached && (
        <InputField
          variant="outline"
          editable={false}
          value="투표가 첨부되었습니다."
          rightChild={
            <Pressable
              onPress={() => {
                setValue('isVoteAttached', false);
                resetField('voteOptions');
                console.log('x버튼 누름', watch('voteOptions'));
              }}
            >
              <Ionicons name="close" size={20} color={COLORS.BLACK} />
            </Pressable>
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
