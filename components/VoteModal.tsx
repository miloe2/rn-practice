import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { COLORS } from '@/constants';
import { Feather } from '@expo/vector-icons';
import VoteInput from './VoteInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { VoteOption } from '@/types';

export default function VoteModal() {
  const { control, setValue } = useFormContext();
  const [isVoteOpen, voteOptions] = useWatch({ control, name: ['isVoteOpen', 'voteOptions'] });
  const { fields, append, remove } = useFieldArray({ control, name: 'voteOptions' });
  const handleAppendVote = () => {
    const priorites = voteOptions.map((vote: VoteOption) => vote.displayPriority);
    const nextPriority = Math.max(...priorites);
    append({ displayPriority: nextPriority + 1, content: '' });
    console.log('clicked', fields);
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert('투표 항목을 2개 이상 추가해주세요.', '');
      return;
    }

    setValue('isVoteAttached', true);
    setValue('isVoteOpen', false);
    console.log('투표 추가 완료');
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.headerLeft} onPress={() => setValue('isVoteOpen', false)}>
            <Feather name="arrow-left" size={28} color={COLORS.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={{ gap: 12, padding: 16 }}>
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => {
                  remove(index);
                  console.log('삭제');
                }}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>+ 항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.GRAY_500,
    textAlign: 'center',
  },
});
