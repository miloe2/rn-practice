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

const SignupScreen = () => {
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
  const handleChangeInput = (
    text: string,
    name: string
  ) => {
    setSignupValues((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  return (
    <>
      <View style={{ flex: 1, gap: 16, padding: 10 }}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요"
          value={signupValues.email}
          onChangeText={(text) =>
            handleChangeInput(text, 'email')
          }
          error={error.email}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          onChangeText={(text) =>
            handleChangeInput(text, 'password')
          }
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          onChangeText={(text) =>
            handleChangeInput(text, 'passwordConfirm')
          }
        />
      </View>
      <FixedBottomCTA
        label="회원가입"
        onPress={handleSumbit}
      />
    </>
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
