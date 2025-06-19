import AuthRoute from '@/components/AuthRoute';
import useAuth from '@/hooks/queries/useAuth';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { BASE_URL } from '@/api/axios';
import { COLORS } from '@/constants';
import Tab from '@/components/Tab';
import { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
export default function MyScreen() {
  const { auth } = useAuth();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handlePressTab = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <AuthRoute>
      <View style={styles.header}>
        <Image
          source={
            auth.imageUri
              ? { uri: `${BASE_URL}/${auth.imageUri}` }
              : require('@/assets/images/react-logo.png')
          }
          style={styles.avatar}
        />
        <CustomButton
          size="medium"
          label="프로필 편집"
          variant="outline"
          onPress={() => {}}
          style={{ position: 'absolute', right: 16, bottom: 16 }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{auth.nickname}</Text>
          <Text style={styles.introduce}>{auth.introduce}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive={currentIndex === 0} onPress={() => handlePressTab(0)}>
          게시물
        </Tab>
        <Tab isActive={currentIndex === 1} onPress={() => handlePressTab(1)}>
          좋아요 게시물
        </Tab>
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.ORANGE_200,
    height: 154,
    position: 'relative',
  },
  avatar: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    top: 77,
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
