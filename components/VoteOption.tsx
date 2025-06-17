import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PostVoteOption } from '@/types';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '@/constants';

interface VoteOptionProps {
  option: PostVoteOption;
  totalCount: number;
  isVoted: boolean;
  isSelected: boolean;
  onSelectOption: () => void;
}

export default function VoteOption({
  option,
  totalCount,
  isVoted,
  isSelected,
  onSelectOption,
}: VoteOptionProps) {
  const percent = option.userVotes.length
    ? Math.floor((option.userVotes.length / totalCount) * 100)
    : 0;
  return (
    <>
      {isVoted ? (
        <View style={styles.votedContainer}>
          <View style={[styles.percent, { width: `${percent}%` }]} />
          <Text style={styles.percentText}>{option.content}</Text>
          <Text style={styles.percentText}>
            {percent}% / ({option.userVotes.length})
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={onSelectOption}
          style={isSelected ? styles.selectedContainer : styles.container}
        >
          <Text style={styles.content}>{option.content}</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.ORANGE_600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignItems: 'center',
  },
  container: {
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignItems: 'center',
  },
  content: {
    marginLeft: 10,
  },
  votedContainer: {
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.ORANGE_200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignItems: 'center',
  },
  percent: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: COLORS.ORANGE_300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentText: {
    marginRight: 10,
    fontWeight: 500,
  },
});
