import { deletePost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

function useDeletePost() {
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      router.replace('/');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export { useDeletePost };
