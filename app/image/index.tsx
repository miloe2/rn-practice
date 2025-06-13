import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants';

export default function ImageZoomScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: inset.top + 10}]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={28} color={'white'} />
      </Pressable>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{ width: Dimensions.get('window').width, height: '100%', backgroundColor: '' }}
      />
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    backgroundColor: COLORS.BLACK,
    width: 40,
    height: 40,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});
