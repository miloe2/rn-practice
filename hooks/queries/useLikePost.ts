import { likePost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { Post, Profile } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        // 혹시 다른데서 요청될까봐 요청 취소함
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      const user = queryClient.getQueryData<Profile>([queryKeys.AUTH, queryKeys.GET_ME]); // 사용자 아이디 호출
      const userId = Number(user?.id);
      const previousPost = queryClient.getQueryData<Post>([
        // 호출되기 전에 기존 캐싱된 데이터를 가져옴
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);
      const newPost = { ...previousPost }; // 기존 데이터를 newPost로 일단 저장
      // 내가 만약 좋아요를 눌렀다면, 좋아요를 취소/ 좋아요가 없다면 좋아요 하기
      const likedIndex = previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;
      likedIndex >= 0 ? newPost.likes?.splice(likedIndex, 1) : newPost.likes?.push({ userId });

      // 기존 쿼리를 newPost로 바꾸기 (좋아요 액션을 한상태임)
      queryClient.setQueryData([queryKeys.POST, queryKeys.GET_POST, postId], newPost);

      return { previousPost, newPost }; // 좋아요 액션 전 , 좋아요 액션 후를 반환
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context],
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
    },
  });
}
