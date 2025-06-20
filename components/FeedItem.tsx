import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Octicons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { Post } from '@/types';
import Profile from './Profile';
import useAuth from '@/hooks/queries/useAuth';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDeletePost } from '@/hooks/queries/useDeletePost';
import { router } from 'expo-router';
import ImagePreviewList from './ImagePreviewList';
import Vote from './Vote';
import useLikePost from '@/hooks/queries/useLikePost';

interface FeedItemProps {
  post: Post;
  isDetail: boolean;
}

const FeedItem = ({ post, isDetail = false }: FeedItemProps) => {
  const { auth } = useAuth();
  const likeUsers = post.likes?.map((like) => Number(like.userId));
  const isLiked = likeUsers?.includes(Number(auth.id));
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();
  const likePost = useLikePost();

  const handlePressOption = () => {
    const options = ['삭제', '수정', '취소'];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 0;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            console.log('삭제');
            deletePost.mutate(post.id, {
              onSuccess: () => isDetail && router.back(),
            });
            break;
          case 1:
            console.log('수정');
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex:
            console.log('취소');
            break;
          default:
            console.log('defaulst');
            break;
        }
      }
    );
  };
  const handlePressFeed = () => {
    if (!isDetail) {
      router.push({
        pathname: '/post/[id]',
        params: { id: String(post.id) },
      });
    }
  };

  const handlePressLike = () => {
    if (!auth.id) return router.push('/auth');
    if (!isDetail) return router.push(`/post/${post.id}`);
    likePost.mutate(post.id);
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          imageUri={post.author.imageUri}
          createdAt={post.createdAt}
          onPress={() => {
            router.push({
              pathname: '/profile/[id]',
              params: { id: String(post.author.id) },
            });
          }}
          option={
            auth.id === post.author.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={COLORS.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
        <ImagePreviewList imageUris={post.imageUris} />
        {!isDetail && post.hasVote && (
          <View style={styles.voteContainer}>
            <View style={styles.voteTextContainer}>
              <MaterialCommunityIcons name="vote" size={24} color={COLORS.ORANGE_600} />
              <Text style={styles.voteCountText}>투표</Text>
            </View>
            <Text style={styles.voteText}>{post.voteCount}명 참여중...</Text>
          </View>
        )}
        {isDetail && post.hasVote && (
          <Vote postId={post.id} postVotes={post.votes ?? []} voteCount={post.voteCount} />
        )}
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu} onPress={handlePressLike}>
          <Octicons
            name={isLiked ? 'heart-fill' : 'heart'}
            size={16}
            color={isLiked ? COLORS.ORANGE_600 : COLORS.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length === 0 ? '좋아요' : post.likes.length}
          </Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={handlePressFeed}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={COLORS.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || '댓글'}</Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={handlePressFeed}>
          <Octicons name="eye" size={16} color={COLORS.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
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
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.ORANGE_600,
    backgroundColor: COLORS.ORANGE_100,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  voteTextContainer: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.ORANGE_600,
  },
  voteCountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});

export default FeedItem;
