/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';

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
export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem('userIDZego');
    await AsyncStorage.removeItem('userNameZego');
    console.log(
      '-----------------------Removed user zego user removed successfully----------------------------',
    );
  } catch (e) {
    return undefined;
  }
};

export const onUserLogin = async (userIDZego, userNameZego) => {
  console.log(
    'onUserLogin--------------==============,userNameZego🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑',
    userIDZego,
    userNameZego,
  );
  return ZegoUIKitPrebuiltCallService.init(
    2029420731, // You can get it from ZEGOCLOUD's console
    '829be4b899a40cf3eb365864f74fae5ecd8493e46f55dc05d4295bf68a82bcc0', // You can get it from ZEGOCLOUD's console
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
        channelID: 'ChitChat_Video_Call',
        channelName: 'ChitChat_Video_Call',
      },
    },
  );
};

export const onUserLogout = async () => {
  return ZegoUIKitPrebuiltCallService.uninit();
};
