import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignupScreen = () => {
  return (
    <>
      <View style={{ flex: 1, gap: 16}}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요"
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
        />
      </View>
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
