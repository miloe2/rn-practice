import { getLikedPosts, getUserPosts } from '@/api/post';
import { queryKeys } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetInfiniteUserPosts(userId: number) {
  return useInfiniteQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS, userId],
    queryFn: ({ pageParam }) => getUserPosts(userId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfiniteUserPosts;
