import AuthRoute from '@/components/AuthRoute';
import { SafeAreaView, View, Text } from 'react-native';

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <View>
          <Text>마이 스크린</Text>
        </View>
      </SafeAreaView>
    </AuthRoute>
  );
}
