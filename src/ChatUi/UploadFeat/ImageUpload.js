/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {createMessage} from '../../firebaseFns';

export const pickImage = async () => {
  try {
    const response = await DocumentPicker.pickSingle({
      type: [
        DocumentPicker.types.images,
        DocumentPicker.types.audio,
        DocumentPicker.types.zip,
        DocumentPicker.types.doc,
        DocumentPicker.types.pdf,
        DocumentPicker.types.ppt,
      ],
      copyTo: 'cachesDirectory',
    });

    if (response) {
      const fileUploadSize = response.size / 1024 / 1024;

      if (fileUploadSize > 50) {
        Alert.alert(`File Size more than ${fileUploadSize} Mb`);
        return;
      }
      const name = response.name || '';
      const fileCopyUri = response.fileCopyUri || '';
      const type = response.type || '';
      if (type && name && fileCopyUri) {
        try {
          const reference = storage().ref(`/messageImages/${name}`);
          const put = await reference.putFile(fileCopyUri);

          const url = await reference.getDownloadURL();
          if (url) return url;
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadImageMessage = (
  uuid,
  type,
  ChatId,
  senderId,
  receiverId,
) => {
  const url = pickImage();
  if (uuid && type && ChatId && senderId && receiverId && url) {
    createMessage(uuid, type, url, ChatId, senderId, receiverId);
  }
};





// if (uuid && type && url && ChatId && senderId && receiverId) {
//   uploadImageMessage(uuid, type, url, ChatId, senderId, receiverId);
// }
export default pickImage;
