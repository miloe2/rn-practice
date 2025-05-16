import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { router, Link } from 'expo-router';

const AuthScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View className=" px-4 flex-1">
        <View
          className="justify-center items-center"
          style={{ flex: 2 }}
        >
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={styles.logo}
          />
        </View>
        <View className="mt-10" style={{ flex: 1 }}>
          <CustomButton
            label="이메일 로그인"
            onPress={() => router.push('/auth/login')}
          />
          <Link
            href="/auth/signup"
            className="underline text-center mt-5"
          >
            이메일로 가입하기
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: 'pink',
  },
});

export default AuthScreen;
