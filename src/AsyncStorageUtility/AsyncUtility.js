/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeId = async ({key, id}) => {
  try {
    if (id && key) {
      await AsyncStorage.setItem(key, id);
    }
  } catch (error) {
    console.error('Error storing id:', error);
  }
};

export const getId = async key => {
  try {
    const id = await AsyncStorage.getItem(key);
    if (id !== null) {
      return id;
    } else {
      console.log('No id found for key:', key);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving id:', error);
    return null;
  }
};
export const removeId = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Id removeItem successfully:');
  } catch (error) {
    console.error('Error removeItem id:', error);
    return null;
  }
};
