import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import FeedItem from './FeedItem';
import { COLORS } from '@/constants/Colors';

const dummy = [
  {
    id: 1,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 3,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 4,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 5,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 6,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 7,
    userId: 1,
    title: '더미 제목입니다!',
    description:
      '피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다! 피드의 내용입니다!피드의 내용입니다!',
    createdAt: '',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: true,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

const FeedList = () => {
  return (
    <FlatList
      data={dummy}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: COLORS.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
