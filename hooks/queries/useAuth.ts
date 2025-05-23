import { postLogin, postSignup } from '@/api/auth';
import { setHeader } from '@/utils/header';
import { saveSecureStore } from '@/utils/secureStore';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await saveSecureStore('accessToken', accessToken);
    },
  });
}
function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace('/auth/login'),
    onError: () => {},
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  return { loginMutation, signupMutation };
}

export default useAuth;
