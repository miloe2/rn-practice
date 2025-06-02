import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '@/components/CustomInput';
import { useCreatePost } from '@/hooks/queries/useCreatePost';
import { ImageUri } from '@/types';
import CustomButton from '@/components/CustomButton';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import useGetPost from '@/hooks/queries/useGetPost';
import useUpdatePost from '@/hooks/queries/useUpdatePost';

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isSuccess } = useGetPost(Number(id));
  const updatePost = useUpdatePost();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: post?.title,
      description: post?.description,
      imageUris: post?.imageUris,
    },
  });
  console.log('data', post);

  // post 도착하면 폼에 반영
  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        description: post.description,
        imageUris: post.imageUris,
      });
    }
  }, [post]);

  const onSubmit = (formValues: FormValues) => {
    const { title, description, imageUris } = formValues;
    updatePost.mutate({
      id: Number(id),
      body: formValues,
    }, {
      onSuccess : () => router.back()
    });
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton label="수정" size="medium" variant="standard" onPress={postForm.handleSubmit(onSubmit)} />
      ),
    });
  }, []);
  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, padding: 10 }}>
        {isSuccess && (
          <>
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
          </>
        )}
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

export default PostUpdateScreen;

const styles = StyleSheet.create({});
