import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '@/components/CustomInput';

const LoginScreen = () => {
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log(email, password);
  };
  return (
    <FormProvider {...loginForm}>
      <View style={{ flex: 1, gap: 16, padding: 10 }}>
        <CustomInput
          name="email"
          config={{
            label: '이메일',
            placeholder: '이메일을 입력해주세요',
          }}
        />
        <CustomInput
          name="password"
          config={{
            label: '비밀번호',
            placeholder: '비밀번호를 입력해주세요',
          }}
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
