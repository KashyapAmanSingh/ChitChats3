/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const CallingBtn = ({userID, userName}) => {
  return (
    <View style={styles.container}>
      <View style={styles.Btncontainer}>
        <ZegoSendCallInvitationButton
          invitees={[{userID: userID, userName: userName}]}
          isVideoCall={false}
          resourceID={'ChitChat_Zego'}
        />
        <ZegoSendCallInvitationButton
          invitees={[{userID: userID, userName: userName}]}
          isVideoCall={true}
          resourceID={'ChitChat_Video_Call'}
        />
      </View>
    </View>
  );
};

export default CallingBtn;

const styles = StyleSheet.create({
  Btncontainer: {flexDirection: 'row'},
  container: {
    backgroundColor: '#474FB600',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});
