import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import useUploadImages from '@/hooks/queries/useUploadImages';
import { getFormDataImages } from '@/utils/images';
import { useFormContext, useWatch } from 'react-hook-form';

const PostWriterFooter = () => {
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ['imageUris'] });
  const uploadImages = useUploadImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개 입니다.');
      return;
    }
    setValue('imageUris', [...imageUris, ...uris.map((uri) => ({ uri: uri }))]);
  };

  const handleOpenImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return;
    }
    const formData = getFormDataImages('images', result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data) => {
        addImageUris(data);
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePick}>
        <Ionicons name="camera" size={20} color={COLORS.BLACK} />
      </Pressable>
      <Pressable
        style={styles.footerIcon}
        onPress={() => {
          setValue('isVoteOpen', true);
        }}
      >
        <MaterialCommunityIcons name="vote" size={20} color={COLORS.BLACK} />
      </Pressable>
    </View>
  );
};

export default PostWriterFooter;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.GRAY_300,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    gap: 10,
  },
  footerIcon: {
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 5,
    padding: 10,
  },
});
