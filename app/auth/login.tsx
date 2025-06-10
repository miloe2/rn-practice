import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '@/components/CustomInput';
import useAuth from '@/hooks/queries/useAuth';

const LoginScreen = () => {
  const { loginMutation } = useAuth();
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    loginMutation.mutate({ email, password });
  };
  return (
    <FormProvider {...loginForm}>
      <View style={{ flex: 1, gap: 16, padding: 10 }}>
        <CustomInput
          autoFocus
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          inputMode="email"
          focusItem="password"
          submitBehavior="submit"
          rules={{
            validate: (data) => {
              if (data.length === 0) {
                return '이메일을 입력해주세요.';
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
                console.log(data);
                return '올바른 이메일 형식이 아닙니다.';
              }
            },
          }}
        />
        <CustomInput
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
          submitBehavior="blurAndSubmit"
          returnKeyType='send'
          onSubmitEditing={loginForm.handleSubmit(onSubmit)}
          // rules={{
          //   validate: (data) => {
          //     if (data.length < 8) {
          //       return '8자 이상으로 해주세요.';
          //     }
          //   },
          // }}
        />
      </View>
      <FixedBottomCTA
        label="로그인"
        onPress={loginForm.handleSubmit(onSubmit)}
        // onPress={() => router.push('/auth/signup')}
      />
    </FormProvider>
  );
};

export default LoginScreen;
