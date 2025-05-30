import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import FeedList from '@/components/FeedList';
import { COLORS } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <FeedList />
      {auth.id && (
        <Pressable style={styles.writeButton} onPress={() => router.push('/post/write')}>
          <Ionicons name="pencil" size={32} color={COLORS.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  writeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: COLORS.ORANGE_600,
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
