import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import useUploadImages from '@/hooks/queries/useUploadImages';
import { getFormDataImages } from '@/utils/images';

const PostWriterFooter = () => {
  const inset = useSafeAreaInsets();
  const uploadImages = useUploadImages();

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
        console.log(data);
      },
    });
  };
  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePick}>
        <Ionicons name="camera" size={20} color={COLORS.BLACK} />
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
