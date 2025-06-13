import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '@/components/CustomInput';
import { useCreatePost } from '@/hooks/queries/useCreatePost';
import { ImageUri } from '@/types';
import CustomButton from '@/components/CustomButton';
import { useNavigation } from 'expo-router';
import PostWriterFooter from '@/components/PostWriterFooter';
import ImagePreviewList from '@/components/ImagePreviewList';

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

const PostWriteScreen = () => {
  const createPost = useCreatePost();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
    },
  });
  const onSubmit = (formValues: FormValues) => {
    const { title, description, imageUris } = formValues;
    createPost.mutate(formValues);
  };

  console.log('postForm', postForm.watch().imageUris)

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
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
        <ImagePreviewList imageUris={postForm.watch().imageUris} />
      </KeyboardAwareScrollView>
      <PostWriterFooter />
    </FormProvider>
  );
};

export default PostWriteScreen;

const styles = StyleSheet.create({});
