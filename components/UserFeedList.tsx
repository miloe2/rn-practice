import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import FeedItem from './FeedItem';
import { COLORS } from '@/constants';
import { useScrollToTop } from '@react-navigation/native';
import useGetInfiniteMyPosts from '@/hooks/queries/useGetInfinitieMyPosts';
import useGetInfiniteUserPosts from '@/hooks/queries/useGetInfiniteUserPosts';
interface UserFeedListProps {
  userId: number;
}

function UserFeedList({ userId }: UserFeedListProps) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteUserPosts(userId);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} isDetail={false} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>작성하신 글이 없습니다. </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: COLORS.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    alignItems: 'center',
  },
});

export default UserFeedList;
