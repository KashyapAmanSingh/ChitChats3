/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const storeId = async ({key, id}) => {
  console.log(
    ' storeId storeId storeId storeId storeId storeId storeId storeIdstoreId storeIdstoreId storeIdstoreId storeIdstoreId storeId',
    key,
    id,
  );
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
      console.log('from get id found from getId', key);
      return id;
    } else {
      console.log('No id found for this key:', key);
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
