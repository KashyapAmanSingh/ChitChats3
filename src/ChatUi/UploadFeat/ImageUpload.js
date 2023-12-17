/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {createMessage} from '../../firebaseFns';

const pickImage = async (uuid, ChatId, senderId, receiverId) => {
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
           if (uuid && type && url && ChatId && senderId && receiverId) {
            createMessage(uuid, type, url, ChatId, senderId, receiverId);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export default pickImage;
