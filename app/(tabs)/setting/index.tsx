import AuthRoute from '@/components/AuthRoute';
import useAuth from '@/hooks/queries/useAuth';
import { View, Text } from 'react-native';

export default function SettingScreen() {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <View>
        <Text onPress={logout}>로그아웃</Text>
      </View>
    </AuthRoute>
  );
}
