import {
  Image,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import FeedItem from '@/components/FeedItem';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FeedItem/>
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
