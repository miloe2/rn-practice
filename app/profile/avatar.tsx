import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import useGetAvatarItems from '@/hooks/queries/useGetAvatarItems';
import Tab from '@/components/Tab';
import PagerView from 'react-native-pager-view';
import { BASE_URL } from '@/api/axios';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import AvatarItem from '@/components/AvatarItem';
import useAuth from '@/hooks/queries/useAuth';
import { useNavigation } from 'expo-router';
import { COLORS } from '@/constants';
import Toast from 'react-native-toast-message';

export default function AvatarScreen() {
  const navigation = useNavigation();
  const pagerRef = useRef<PagerView | null>(null);
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [currentTab, setCurrentTab] = useState(0);
  const { auth, profileMutation } = useAuth();
  const [avatarItem, setAvatarItem] = useState({
    hatId: auth?.hatId ?? '',
    faceId: auth?.faceId ?? '',
    topId: auth?.topId ?? '',
    bottomId: auth?.bottomId ?? '',
    handId: auth?.handId ?? '',
    skinId: auth?.skinId ?? '',
  });

  const itemObject = [
    {
      data: hats,
      name: 'hatId',
      id: avatarItem.hatId,
    },
    {
      data: faces,
      name: 'faceId',
      id: avatarItem.faceId,
    },
    {
      data: tops,
      name: 'topId',
      id: avatarItem.topId,
    },
    {
      data: bottoms,
      name: 'bottomId',
      id: avatarItem.bottomId,
    },
    {
      data: hands,
      name: 'handId',
      id: avatarItem.handId,
    },
    {
      data: skins,
      name: 'skinId',
      id: avatarItem.skinId,
    },
  ];

  const getImageId = (url: string) => {
    const filename = url.split('/').pop() ?? '';
    const [id] = filename.split('.');
    return id;
  };

  const handlePressItem = (name: string, item: string) => {
    setAvatarItem((prev) => ({ ...prev, [name]: getImageId(item) }));
  };
  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  const handleSaveAvatar = () => {
    profileMutation.mutate(avatarItem, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: '저장되었습니다.',
        });
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {['모자', '얼굴', '상의', '하의', '손', '피부'].map((tab, index) => (
            <Tab key={index} isActive={currentTab === index} onPress={() => handlePressTab(index)}>
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          {itemObject.map((part, index) => (
            <FlatList
              key={index}
              data={part.data}
              keyExtractor={(item, index) => String(index)}
              numColumns={3}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <AvatarItem
                  uri={item}
                  isSelected={getImageId(item) === part.id}
                  onPress={() => handlePressItem(part.name, item)}
                />
              )}
            />
          ))}
        </PagerView>
      </View>

      <FixedBottomCTA label="저장" onPress={handleSaveAvatar} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: 'center',
  },
});
