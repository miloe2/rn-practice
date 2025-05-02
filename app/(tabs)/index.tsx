import {
  Image,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import CustomButton from '@/components/CustomButton';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text className="bg-red-500 text-blue-500">
          '/' 스크린
        </Text>
        <CustomButton label="button입니다" size='large' intent='filled'/>
        <CustomButton label="button입니다22" size='medium' intent='outline' onPress={() => {console.log('clicked')}}/>
      </View>
    </SafeAreaView>
  );
}
