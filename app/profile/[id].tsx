import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { BASE_URL } from '@/api/axios';
import { COLORS } from '@/constants';
import AuthRoute from '@/components/AuthRoute';
import Tab from '@/components/Tab';
import MyFeedList from '@/components/MyFeedList';
import useGetUserProfile from '@/hooks/queries/useGetUserProfile';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Redirect, useNavigation } from 'expo-router';
import useAuth from '@/hooks/queries/useAuth';
import UserFeedList from '@/components/UserFeedList';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { id: userId } = useLocalSearchParams();
  const { data: profile } = useGetUserProfile(Number(userId));
  const { auth } = useAuth();
  const { nickname, introduce, imageUri } = profile || {};

  if (Number(userId) === Number(auth.id)) {
    return <Redirect href={'/my'} />;
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        // backgroundColor: 'red',
        backgroundColor: COLORS.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <AuthRoute>
      <View style={styles.header}>
        <Image
          source={
            imageUri
              ? { uri: `${BASE_URL}/${imageUri}` }
              : require('@/assets/images/react-logo.png')
          }
          style={styles.avatar}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.introduce}>{introduce}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive>게시물</Tab>
      </View>
      <UserFeedList userId={Number(userId)} />
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.ORANGE_200,
    height: 77,
    position: 'relative',
  },
  avatar: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    left: 15,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.GRAY_500,
  },
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  introduce: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
  },
});
