/* eslint-disable prettier/prettier */
import React from 'react';
import * as Progress from 'react-native-progress';
import {StyleSheet, View} from 'react-native';

const UploadProgressStateComponent = ({uploadProgresState}) => {
  return (
    <View style={styles.UploadProgressStateContainer}>
      <Progress.Circle
        progress={uploadProgresState / 100}
        size={100}
        thickness={8}
        indeterminate={false}
        color={'#474FB6'}
        borderWidth={1}
        borderColor={'white'}
        animated={true}
        showsText={true}
        unfilledColor="white"
        formatText={() => `${uploadProgresState}%`} // Pass the function as a prop
      />
    </View>
  );
};

export default UploadProgressStateComponent;

const styles = StyleSheet.create({
  UploadProgressStateContainer: {
    borderWidth: 1,
    borderColor: '#E6E7ECED',
    height: 130,
    width: 130,
    borderRadius: 10,
    backgroundColor: '#5775EC30',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
