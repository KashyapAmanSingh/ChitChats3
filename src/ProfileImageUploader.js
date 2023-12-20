/* eslint-disable prettier/prettier */
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import pickImage from './ChatUi/UploadFeat/ImageUpload';

const ProfileImageUploader = ({setProfileImageUrl, profileImageUrl}) => {
  const uploadImagehandler = async () => {
    const url = await pickImage();
    if (url) {
      setProfileImageUrl(url);
    }
  };
   return (
    <TouchableOpacity onPressOut={uploadImagehandler}>
      {profileImageUrl !== '' ? (
        <Image style={styles.ProfileImage} source={{uri: profileImageUrl}} />
      ) : (
        <Image
          style={styles.ProfileImagedummy}
          resizeMode="cover"
          source={require('./assets/ProfilePictureDummy.png')}
        />
      )}

      {/* <Button title="uploadImagehandler" onPress={uploadImagehandler} /> */}
    </TouchableOpacity>
  );
};

export default ProfileImageUploader;

const styles = StyleSheet.create({
  ProfileImage: {
    height: '98%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  ProfileImagedummy: {
    height: '104.5%',
    width: '109%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
