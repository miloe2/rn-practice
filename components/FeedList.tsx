import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import FeedItem from './FeedItem';
import { COLORS } from '@/constants';
import { useGetInfinitePosts } from '@/hooks/queries/useGetInfinitePosts';
import { useScrollToTop } from '@react-navigation/native';

const FeedList = () => {
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetInfinitePosts();
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
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
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
