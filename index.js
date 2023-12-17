/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import notifee, {EventType} from '@notifee/react-native';
// import {PermissionsAndroid} from 'react-native';
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

// Display a notification

AppRegistry.registerComponent(appName, () => App);
