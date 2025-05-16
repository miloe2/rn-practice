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

const LoginScreen = () => {
  return (
    <>
      <View style={{ flex: 1, gap: 16 }}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요"
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
        />
      </View>
      <FixedBottomCTA
        label="회원가입"
        onPress={() => router.push('/auth/signup')}
      />
    </>
  );
};

export default LoginScreen;
