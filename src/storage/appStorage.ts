import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PhotoLog, SavedItem} from '../types';

const keys = {
  onboarding: '@DeepSharkSignals:onboardingSeen',
  saved: '@DeepSharkSignals:savedItems',
  photos: '@DeepSharkSignals:photoLogs',
};

export async function loadOnboardingSeen() {
  return (await AsyncStorage.getItem(keys.onboarding)) === 'true';
}

export async function saveOnboardingSeen() {
  await AsyncStorage.setItem(keys.onboarding, 'true');
}

export async function loadSavedItems(): Promise<SavedItem[]> {
  const value = await AsyncStorage.getItem(keys.saved);
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSavedItems(items: SavedItem[]) {
  await AsyncStorage.setItem(keys.saved, JSON.stringify(items));
}

export async function loadPhotoLogs(): Promise<PhotoLog[]> {
  const value = await AsyncStorage.getItem(keys.photos);
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function savePhotoLogs(items: PhotoLog[]) {
  await AsyncStorage.setItem(keys.photos, JSON.stringify(items));
}
