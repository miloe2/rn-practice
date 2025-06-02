import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '@/constants';
interface ProfileProps {
  onPress: () => void;
  imageUri?: string;
  nickname: string;
  createdAt?: string;
  option?: ReactNode;
}

const Profile = ({ onPress, imageUri, nickname, createdAt, option }: ProfileProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressContainer} onPress={onPress}>
        <Image source={imageUri ? imageUri : require('@/assets/images/react-logo.png')} style={styles.avatar} />
        <View style={{ gap: 4 }}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.GRAY_300,
  },
  createdAt: {
    fontSize: 14,
    color: COLORS.GRAY_500,
  },
  nickname: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});
