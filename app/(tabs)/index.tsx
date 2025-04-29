import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text className="bg-red-500 text-blue-500">test</Text>
        <Text className="bg-red-500">test</Text>
      </View>
    </SafeAreaView>
  );
}
