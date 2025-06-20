import { Dimensions, Image, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BASE_URL } from '@/api/axios';
import { COLORS } from '@/constants';
interface AvatarItemProps extends PressableProps {
  uri: string;
  isSelected: boolean;
}

export default function AvatarItem({ uri, isSelected, ...props }: AvatarItemProps) {
  return (
    <Pressable {...props} style={[styles.container, isSelected && styles.selectedContainer]}>
      <Image source={{ uri: `${BASE_URL}/${uri}` }} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: Dimensions.get('window').width / 3 - 15,
    height: Dimensions.get('window').width / 3 - 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.GRAY_200,
  },
  selectedContainer: {
    borderColor: COLORS.ORANGE_600,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
