/* eslint-disable prettier/prettier */
 
import {Alert, Text, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {createMessage, updateMessage} from '../../firebaseFns';
 
export const pickImage = async () => {
  try {
    const response = await DocumentPicker.pickSingle({
      type: [
        DocumentPicker.types.images,
        DocumentPicker.types.audio,
        DocumentPicker.types.video,
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
      const fileType = response.type || '';
      if (fileType && name && fileCopyUri) {
        let updatedProgress;
        try {
          const reference = storage().ref(`/messageImages/${name}`);
          const task = reference.putFile(fileCopyUri);

          const uploadTask = task;

          const url = await reference.getDownloadURL();
          if (url) return {url, fileType, updatedProgress, uploadTask};
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadImageMessage = async (
  uuid,
  ChatId,
  senderId,
  receiverId,
  setuploadProgresState,
) => {
  const {url, fileType, uploadTask} = await pickImage();
  uploadTask && uploadProgress(uploadTask, setuploadProgresState);
  const type = fileType.slice(0, fileType.indexOf('/'));

  if (uuid && type && ChatId && senderId && receiverId && url) {
    createMessage(uuid, type, url, ChatId, senderId, receiverId);
  }
};
let updatedProgress;
const uploadProgress = (uploadTask, setuploadProgresState) => {
  if (uploadTask) {
    uploadTask.on('state_changed', taskSnapshot => {
      const progress =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      const percentage = Math.round(progress);
      updatedProgress = percentage > 100 ? 99 : percentage;

      setuploadProgresState(updatedProgress);
    });
  }
};

export default pickImage;
