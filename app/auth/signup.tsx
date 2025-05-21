import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import InputField from '@/components/InputField';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '@/components/CustomInput';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupScreen = () => {
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const [signupValues, setSignupValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const handleSumbit = () => {
    if (signupValues.email.length === 0) {
      setError((prev) => ({
        ...prev,
        email: '이메일을 입력해주세요',
      }));
    }
    console.log('signupValues', signupValues);
  };

  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);
  };

  return (
    <FormProvider {...signupForm}>
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
        <CustomInput
          name="passwordConfirm"
          config={{
            label: '비밀번호 확인',
            placeholder: '비밀번호를 입력해주세요',
          }}
        />
      </View>
      <FixedBottomCTA
        label="회원가입"
        onPress={signupForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fixed: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default SignupScreen;
