/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const ShowImage = ({route}) => {
  const imageUrl = route.params.url;
  // Alert.alert(`Show ${imageUrl}`);
  return (
    <View>
      <Image
        resizeMode="contain"
        style={styles.showImageContainer}
        source={{uri: imageUrl}}
      />
    </View>
  );
};

export default ShowImage;

const styles = StyleSheet.create({
  showImageContainer: {
    height: '100%',
    width: '100%',
  },
});
