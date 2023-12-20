/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Navigator from './src/Navigator/Navigator';

import messaging from '@react-native-firebase/messaging';
import {DisplayNotification, requestPermission} from './src/firebaseFns';

const App = () => {
  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      DisplayNotification(remoteMessage);
    });

    const handleNotificationOpenedApp = remoteMessage => {
      DisplayNotification(remoteMessage);
    };

    const handleInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
      const remoteMessage = initialNotification;
      if (initialNotification) {
        DisplayNotification(remoteMessage);
      }
    };

    handleInitialNotification();

    messaging().onNotificationOpenedApp(handleNotificationOpenedApp);

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
