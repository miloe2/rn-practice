import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

const FixedBottomCTA = ({
  label,
  onPress,
}: FixedBottomCTAProps) => {
  const inset = useSafeAreaInsets();
  return (
    <>
      <View
        style={[
          styles.fixed,
          { paddingBottom: inset.bottom || 12 },
        ]}
      >
        <CustomButton label={label} onPress={onPress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fixed: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default FixedBottomCTA;
