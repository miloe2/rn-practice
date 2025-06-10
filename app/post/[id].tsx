import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { Fragment, useRef, useState } from 'react';
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
  const createComment = useCreateComment();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const [content, setContent] = useState('');
  const [parentCommentId, setParenetCommentId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  const handleSubmitComment = () => {
    const commentData = {
      content: content,
      postId: Number(post?.id),
    };
    if (parentCommentId) {
      createComment.mutate(
        { parentCommentId, ...commentData },
        {
          onSuccess: () => {
            setContent('');
            handleCancelReply();
          },
        }
      );
      return;
    }

    createComment.mutate(commentData, {
      onSuccess: () => {
        setContent('');
        setTimeout(() => {
          scrollRef.current?.scrollToEnd();
        }, 500);
      },
    });
  };

  const handleReply = (commentId: number) => {
    setParenetCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParenetCommentId(null);
    Keyboard.dismiss();
  };

  if (isPending || isError) {
    return <></>;
  }

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardAwareScrollViewContainer}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail={true} />
              <Text style={styles.commentCount}>댓글 {post.commentCount}개</Text>
            </View>
            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  key={comment.id}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  comment={comment}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              onChangeText={setContent}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              placeholder={
                parentCommentId ? `'답글 남기는 중...'${parentCommentId}` : '댓글을 남겨보세요'
              }
              rightChild={
                <Pressable
                  style={styles.inputButtonContainer}
                  disabled={!content}
                  onPress={() => {
                    handleSubmitComment();
                  }}
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
    padding: 16,
    borderRadius: 5,
  },
  inputButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
});
