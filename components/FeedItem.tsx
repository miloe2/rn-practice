import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import { COLORS } from '@/constants';
import {
  Octicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Post } from '@/types';
import Profile from './Profile';
interface FeedItemProps {
  post: Post;
}

const FeedItem = ({ post }: FeedItemProps) => {
  const isLike = true;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
      <Profile
        nickname={post.author.nickname}
        imageUri={post.author.imageUri}
        createdAt={post.createdAt}
        onPress={() => console.log('hi')}
      />
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Octicons
            name={isLike ? 'heart-fill' : 'heart'}
            size={16}
            color={
              isLike ? COLORS.ORANGE_600 : COLORS.BLACK
            }
          />
          <Text
            style={
              isLike
                ? styles.activeMenuText
                : styles.menuText
            }
          >
            1
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={COLORS.BLACK}
          />
          <Text>1</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Octicons
            name="eye"
            size={16}
            color={COLORS.BLACK}
          />
          <Text>1</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: { padding: 16 },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: COLORS.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.BLACK,
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.BLACK,
    marginBottom: 14,
  },
  menuText: {
    // fontSize: 16,
    color: COLORS.GRAY_700,
  },
  activeMenuText: {
    fontWeight: 700,
    color: COLORS.ORANGE_600,
  },
});

export default FeedItem;
