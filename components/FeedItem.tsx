import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Octicons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { COLORS } from '@/constants';
import { Post } from '@/types';
import Profile from './Profile';
import useAuth from '@/hooks/queries/useAuth';
interface FeedItemProps {
  post: Post;
}

dayjs.extend(relativeTime);
dayjs.locale('ko');

const FeedItem = ({ post }: FeedItemProps) => {
  const { auth } = useAuth();
  const isLiked = post?.likes.some((userId) => post.userId === Number(userId));

  const handlePressOption = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          imageUri={post.author.imageUri}
          createdAt={dayjs(post.createdAt).fromNow()}
          onPress={() => console.log('hi')}
          option={
            auth.id === post.author.id && (
              <Ionicons name="ellipsis-vertical" size={24} color={COLORS.BLACK} onPress={handlePressOption} />
            )
          }
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Octicons
            name={isLiked ? 'heart-fill' : 'heart'}
            size={16}
            color={isLiked ? COLORS.ORANGE_600 : COLORS.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length === 0 ? '좋아요' : post.likes.length}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <MaterialCommunityIcons name="comment-processing-outline" size={16} color={COLORS.BLACK} />
          <Text style={styles.menuText}>{post.commentCount || '댓글'}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Octicons name="eye" size={16} color={COLORS.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
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
    marginLeft: 4,
    // fontSize: 16,
    color: COLORS.GRAY_700,
  },
  activeMenuText: {
    marginLeft: 4,
    fontWeight: 700,
    color: COLORS.ORANGE_600,
  },
});

export default FeedItem;
