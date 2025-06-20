import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useAuth from '@/hooks/queries/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { BASE_URL } from '@/api/axios';
import { COLORS } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import Toast from 'react-native-toast-message';

type FormValue = {
  nickname: string;
  introduce: string;
};

export default function ProfileUpdateScreen() {
  const { auth, profileMutation } = useAuth();
  const profileForm = useForm({
    defaultValues: {
      nickname: auth.nickname,
      introduce: auth.introduce,
      imageUri: auth.imageUri,
    },
  });

  const onSubmit = (formValue: FormValue) => {
    profileMutation.mutate(formValue, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: '저장되었습니다',
        });
      },
    });
  };
  return (
    <FormProvider {...profileForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              auth.imageUri
                ? { uri: `${BASE_URL}/${auth.imageUri}` }
                : require('@/assets/images/react-logo.png')
            }
            style={styles.avatar}
          />
          <CustomButton
            size="medium"
            label="아바타 변경"
            variant="outline"
            style={{ position: 'absolute', right: 0, bottom: 0 }}
            onPress={() => router.push('/profile/avatar')}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            inputMode="text"
            focusItem="introduce"
            submitBehavior="submit"
            rules={{
              validate: (data) => {
                if (data.length < 2) {
                  return '닉네임 2자 이상을 입력해주세요.';
                }
              },
            }}
          />
          <CustomInput
            name="introduce"
            label="소개"
            placeholder="소개를 입력해주세요"
            inputMode="text"
            submitBehavior="blurAndSubmit"
          />
        </View>
        <FixedBottomCTA label="저장" onPress={profileForm.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 16,
    position: 'relative',
  },
  avatar: {
    backgroundColor: COLORS.WHITE,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.GRAY_500,
  },
  inputContainer: {
    gap: 16,
  },
});
