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
import { SvgUri } from 'react-native-svg';

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
    skinId: auth?.skinId ?? '01',
  });

  const itemObject = [
    {
      data: hats,
      category: 'hats',
      name: 'hatId',
      id: avatarItem.hatId,
      zIndex: 70,
    },
    {
      data: faces,
      category: 'faces',
      name: 'faceId',
      id: avatarItem.faceId,
      zIndex: 60,
    },
    {
      data: tops,
      category: 'tops',
      name: 'topId',
      id: avatarItem.topId,
      zIndex: 50,
    },
    {
      data: bottoms,
      category: 'bottoms',
      name: 'bottomId',
      id: avatarItem.bottomId,
      zIndex: 40,
    },
    {
      data: hands,
      category: 'hands',
      name: 'handId',
      id: avatarItem.handId,
      zIndex: 10,
    },
    {
      data: skins,
      category: 'skins',
      name: 'skinId',
      id: avatarItem.skinId,
      zIndex: 20,
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

  const getAvatarItemUrl = (category: string, id: string) => {
    return `${BASE_URL}/items/${category}/${id}.svg`;
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
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <SvgUri uri={`${BASE_URL}/default/frame.svg`} style={[styles.avatar, { zIndex: 30 }]} />
            {itemObject.map(
              (item, index) =>
                item.id && (
                  <SvgUri
                    key={index}
                    uri={getAvatarItemUrl(item.category, item.id)}
                    style={[styles.avatar, { zIndex: item.zIndex }]}
                  />
                )
            )}
          </View>
        </View>
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
  headerContainer: {
    height: 115,
    // width: '100%',
    backgroundColor: COLORS.ORANGE_200,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 115,
  },
  avatarContainer: {
    width: 220,
    height: 220,
    borderRadius: 220,
    borderWidth: 1,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY_200,
  },
  avatar: {
    width: 220,
    height: 220,
    position: 'absolute',
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
