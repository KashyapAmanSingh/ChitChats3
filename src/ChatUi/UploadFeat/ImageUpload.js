/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {createMessage} from '../../firebaseFns';

const useImageUploader = (uuid, ChatId, senderId, receiverId) => {
  const [imageData, setImageData] = useState(null);
  const [fullImgRefPath, setFullImgRefPath] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  const pickImage = async () => {
    Alert.alert('pickImage successfully called bro');
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

        uploadImage(response.type);
        setImageData(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async types => {
    try {
      const response = storage().ref(`/messageImages/${imageData.name}`);
      const put = await response.putFile(imageData.fileCopyUri);

      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();
      setImgDownloadUrl(url);
      // Assuming you have a createMessage function
      if (uuid && types && url && ChatId && senderId && receiverId) {
        createMessage(uuid, types, url, ChatId, senderId, receiverId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {pickImage, uploadImage, imageData, fullImgRefPath, imgDownloadUrl};
};

export default useImageUploader;
