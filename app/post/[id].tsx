import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useGetPost from '@/hooks/queries/useGetPost';
import AuthRoute from '@/components/AuthRoute';
import { COLORS } from '@/constants';
import FeedItem from '@/components/FeedItem';
import InputField from '@/components/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useCreateComment from '@/hooks/queries/useCreateComment';
import CommentItem from '@/components/CommentItem';

function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const [content, setContent] = useState('');
  const createComment = useCreateComment();

  const handleSubmitComment = () => {
    Keyboard.dismiss(); // ✅ 키보드 내리기
    const commentData = {
      content: content,
      postId: Number(post?.id),
    };
    createComment.mutate(commentData, {
      onSuccess: () => setContent(''),
    });
  };

  if (isPending || isError) {
    return <></>;
  }

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail={true} />
              <Text style={styles.commentCount}>댓글 {post.commentCount}개</Text>
            </View>
            {post.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              onChangeText={setContent}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              placeholder="댓글을 남겨보세요"
              rightChild={
                <Pressable
                  style={styles.inputButtonContainer}
                  disabled={!content}
                  onPress={handleSubmitComment}
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.GRAY_200,
  },
  keyboardAwareScrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.GRAY_200,
  },
  commentInputContainer: {
    borderTopColor: COLORS.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.WHITE,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  inputButtonContainer: {
    backgroundColor: COLORS.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
});
