import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

async function saveSecureStore(key: string, value: string) {
  if (isWeb) {
    // UI 확인용: 저장은 하지 않음
    console.log(`[Web] Skipping SecureStore.setItemAsync(${key}, ${value})`);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getSecureStore(key: string) {
  if (isWeb) {
    // 웹에선 항상 null 반환
    console.log(`[Web] Skipping SecureStore.getItemAsync(${key})`);
    return null;
  }
  const storedData = await SecureStore.getItemAsync(key);
  return storedData ?? null;
}

async function deleteSecureStore(key: string) {
  if (isWeb) {
    console.log(`[Web] Skipping SecureStore.deleteItemAsync(${key})`);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export { saveSecureStore, getSecureStore, deleteSecureStore };
