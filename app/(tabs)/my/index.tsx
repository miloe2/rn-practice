import { router, useFocusEffect } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
} from 'react-native';


export default function MyScreen() {
  useFocusEffect(() => {
    router.replace('/auth');
  })
  return (
    <SafeAreaView>
      <View>
        <Text>마이 스크린</Text>
      </View>
    </SafeAreaView>
  );
}
