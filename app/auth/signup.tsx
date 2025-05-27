import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import CustomInput from '@/components/CustomInput';
import useAuth from '@/hooks/queries/useAuth';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupScreen = () => {
  const { signupMutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { control } = signupForm;
  const password = useWatch({ control, name: 'password' });

  const onSubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    console.log(formValues);
    signupMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...signupForm}>
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
                return '올바른 이메일 형식이 아닙니다.';
              }
            },
          }}
        />
        <CustomInput
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          textContentType="oneTimeCode"
          focusItem="passwordConfirm"
          submitBehavior="submit"
          secureTextEntry
          // rules={{
          //   validate: (data) => {
          //     if (data.length < 8) {
          //       return '비밀번호는 8글자 이상이여야합니다.';
          //     }
          //   },
          // }}
        />
        <CustomInput
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          textContentType="oneTimeCode"
          submitBehavior="blurAndSubmit"
          secureTextEntry
          rules={{
            validate: (data) => {
              if (password !== data) {
                return '비밀번호가 일치하지 않습니다';
              }
            },
          }}
        />
      </View>
      <FixedBottomCTA label="회원가입" onPress={signupForm.handleSubmit(onSubmit)} />
    </FormProvider>
  );
};

const styles = StyleSheet.create({});

export default SignupScreen;
