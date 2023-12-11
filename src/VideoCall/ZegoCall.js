/* eslint-disable prettier/prettier */
// App.js
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {StyleSheet, Text, View} from 'react-native';

import React, {Component} from 'react';
// import RNEncryptedStorage from 'your-encrypted-storage-library';

import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';

const uuid = uuidv4();
const userConectionID = uuid;
// Initialize RNEncryptedStorage
// RNEncryptedStorage.initialize(options);

// // Initialize ZegoUIKitPrebuiltCall
// ZegoUIKitPrebuiltCall.initialize(options);

const ZegoCall = ({props}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {callId} = route.params;
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={2029420731}
        appSign={
          '829be4b899a40cf3eb365864f74fae5ecd8493e46f55dc05d4295bf68a82bcc0'
        }
        userID={userConectionID} // userID can be something like a phone number or the user id on your own user system.
        userName={`User${userConectionID}`}
        callID={callId}
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // navigation.navigate('AloneCaller');
            navigation.goBack();
          },
          onHangUp: () => {
            // navigation.navigate('AloneCaller');
            navigation.goBack();
          },
        }}
      />
    </View>
  );
};

export default ZegoCall;

const styles = StyleSheet.create({
  container: {
    color: 'red',
    backgroundColor: 'purple',
    flex: 1,
  },
});
