import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '@/components/CustomInput';

type FormValues = {
  title: string;
  description: string;
};

const PostWriteScreen = () => {
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  return (
    <FormProvider {...postForm}>
      <View style={{ flex: 1, padding: 10 }}>
        <CustomInput
          name="title"
          label="제목"
          placeholder="제목을 입력해주세요"
          focusItem="description"
          rules={{
            validate: (data) => {
              if (data.length === 0) {
                return '제목을 입력해주세요';
              }
            },
          }}
        />
        <CustomInput
          name="description"
          label="내용"
          placeholder="내용을 입력해주세요"
          multiline
          rules={{
            validate: (data) => {
              if (data.length === 0) {
                return '내용을 입력해주세요';
              }
            },
          }}
        />
      </View>
    </FormProvider>
  );
};

export default PostWriteScreen;

const styles = StyleSheet.create({});
