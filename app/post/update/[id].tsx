import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '@/components/CustomInput';
import { useCreatePost } from '@/hooks/queries/useCreatePost';
import { ImageUri } from '@/types';
import CustomButton from '@/components/CustomButton';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import useGetPost from '@/hooks/queries/useGetPost';

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data } = useGetPost(Number(id));
  const createPost = useCreatePost();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
    },
  });
  // console.log('data', data, id);
  const onSubmit = (formValues: FormValues) => {
    const { title, description, imageUris } = formValues;
    createPost.mutate(formValues);
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton label="저장" size="medium" variant="standard" onPress={postForm.handleSubmit(onSubmit)} />
      ),
    });
  }, []);
  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, padding: 10 }}>
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
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

export default PostUpdateScreen;

const styles = StyleSheet.create({});
