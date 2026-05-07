import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLastScreen = async (
  screen: string,
  params?: any
) => {
  await AsyncStorage.setItem(
    'lastScreen',
    JSON.stringify({
      screen,
      params,
    })
  );
};

export const getLastScreen = async () => {
  const data = await AsyncStorage.getItem(
    'lastScreen'
  );

  if (!data) return null;

  return JSON.parse(data);
};

export const clearLastScreen = async () => {
  await AsyncStorage.removeItem('lastScreen');
};