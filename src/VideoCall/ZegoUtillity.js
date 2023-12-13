/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export const storeUserInfo = async info => {
  await AsyncStorage.setItem('userIDZego', info.userIDZego);
  await AsyncStorage.setItem('userNameZego', info.userNameZego);
};

export const getUserInfo = async () => {
  try {
    const userIDZego = await AsyncStorage.getItem('userIDZego');
    const userNameZego = await AsyncStorage.getItem('userNameZego');
    if (userIDZego == undefined) {
      return undefined;
    } else {
      return {userIDZego, userNameZego};
    }
  } catch (e) {
    return undefined;
  }
};

export const onUserLogin = async (userIDZego, userNameZego) => {
  return ZegoUIKitPrebuiltCallService.init(
    yourAppID, // You can get it from ZEGOCLOUD's console
    yourAppSign, // You can get it from ZEGOCLOUD's console
    userIDZego,
    userNameZego,
    [ZIM, ZPNs],
    {
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
    },
  );
};

export const onUserLogout = async () => {
  return ZegoUIKitPrebuiltCallService.uninit();
};
