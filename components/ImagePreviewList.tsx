import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ImageUri } from '@/types';
import { router } from 'expo-router';
import { BASE_URL } from '@/api/axios';

interface ImagePreviewListProps {
  imageUris: ImageUri[];
}

export default function ImagePreviewList({ imageUris = [] }: ImagePreviewListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${BASE_URL}/${uri}`;
        return (
          <Pressable
            key={uri + index}
            style={styles.imageContainer}
            onPress={() => router.push({ pathname: '/image', params: { uri: imageUri } })}
          >
            <Image source={{ uri: imageUri }} style={styles.image} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
});
