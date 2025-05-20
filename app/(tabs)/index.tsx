import {
  Image,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import FeedItem from '@/components/FeedItem';
import FeedList from '@/components/FeedList';
import { COLORS } from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <FeedList />
      {/* <FeedItem post={post} /> */}
      {/* <View>
        <Text className="text-blue-500">'/' 스크린</Text>
        <CustomButton
          label="button입니다"
          size="large"
          variant="filled"
          onPress={() => {
            router.push('/auth');
          }}
        />
      </View> */}
    </SafeAreaView>
  );
}
