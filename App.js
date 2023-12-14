/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Navigator from './src/Navigator/Navigator';

const App = () => {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <Navigator/>
    </NavigationContainer>
  );
};

export default App;
