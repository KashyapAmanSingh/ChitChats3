/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Navigator from './src/Navigator/Navigator';
import notifee from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const App = () => {
  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('🦻🦻🦻🦻 remoteMessage', JSON.stringify(remoteMessage));
      if (remoteMessage) {
        DisplayNotification(remoteMessage);
      }
      console.log('🦽 🦽 🦽 🦽 🦽 🦽🦽After 🦽 remoteMessage');

      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('🦻🦻remoteMessage', JSON.stringify(remoteMessage));
      if (remoteMessage) {
        DisplayNotification(remoteMessage);
      }
      console.log('🦽 🦽 🦽 🦽 🦽 🦽🦽After 🦽 remoteMessage');

      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const requestPermission = async () => {
    await messaging().requestPermission();
  };

  async function DisplayNotification(remoteMessage) {
    Alert.alert('🦻Display Notification🦻', JSON.stringify(remoteMessage));
    console.log(JSON.stringify(remoteMessage), '🦻🦻🦻🦻🦻🦻🦻🦻🦻🦻🦻🦻🦻🦻');
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        color: '#4caf50',
        actions: [
          {
            title: '<h6>Mark as Read</h6> &#x2714 ',
            pressAction: {id: 'Read'},
          },
          {
            title: '<h6 style="color:#8B4513;"> View  &#128065;</h6>',
            pressAction: {id: 'View'},
          },
        ],
      },
    });
  }

  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
