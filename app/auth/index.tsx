import { View, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { router, Link } from 'expo-router';

const AuthScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} />
        </View>
        <View style={{ flex: 1, marginTop: 40 }}>
          <CustomButton label="이메일 로그인" onPress={() => router.push('/auth/login')} />
          <Link
            href="/auth/signup"
            style={{ textDecorationLine: 'underline', textAlign: 'center', marginTop: 20 }}
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
