/* eslint-disable prettier/prettier */
// App.js
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {StyleSheet, Text, View} from 'react-native';

import React, {Component, useRef} from 'react';
// import RNEncryptedStorage from 'your-encrypted-storage-library';

import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';

const uuid = uuidv4();
const userConectionID = uuid;

const ZegoCall = ({props}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userID, userName, callType} = route.params;
  const prebuiltRef = useRef();
  const getCallingTypeConfig = () => {
    if (callType === 'Voice Call') {
      return ONE_ON_ONE_VOICE_CALL_CONFIG;
    } else {
      return ONE_ON_ONE_VIDEO_CALL_CONFIG;
    }
  };
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        ref={prebuiltRef}
        appID={2029420731}
        appSign={
          '829be4b899a40cf3eb365864f74fae5ecd8493e46f55dc05d4295bf68a82bcc0'
        }
        userID={userID}
        userName={userName}
        callID="rn12345678"
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...getCallingTypeConfig(),
          onOnlySelfInRoom: () => {
            // navigation.goBack();
          },
          onHangUp: () => {
            //  navigation.navigate('AloneCaller');
            navigation.goBack();
          },
          durationConfig: {
            isVisible: true,
            onDurationUpdate: duration => {
              if (duration === 10 * 60) {
                prebuiltRef.current.hangUp();
              }
            },
          },
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton],
          },
          onWindowMinimized: () => {
            navigation.navigate('HomePage');
          },
          onWindowMaximized: () => {
            navigation.navigate('ZegoCall', {
              userID,
              userName,
              callID: 'rn12345678',
            });
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
