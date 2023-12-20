/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import notifee, {EventType} from '@notifee/react-native';
import {DisplayNotification} from './src/firebaseFns';
// import {PermissionsAndroid} from 'react-native';
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    await notifee.cancelNotification(notification.id);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  DisplayNotification(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
