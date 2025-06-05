import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import useGetPost from '@/hooks/queries/useGetPost';
import AuthRoute from '@/components/AuthRoute';
import { COLORS } from '@/constants';
import FeedItem from '@/components/FeedItem';
import InputField from '@/components/InputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));

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
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              rightChild={
                <Pressable style={styles.inputButtonContainer}>
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
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
});
