/* eslint-disable prettier/prettier */
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home';
import SignInForm from '../SignIn';
import SignUpForm from '../SinUp';
import ChatUi from '../ChatUi/ChatUi';
import {
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import UserLists from '../UserLists/UserLists';
import CameraPhoto from '../ChatUi/Camera/Cam';
import ShowImage from '../showImage/showImage';
 
const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: 'Users ',
        headerStyle: {
          backgroundColor: '#474FB6',
        },
        headerTitleStyle: {
          fontSize: 30,
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'ChitChat 0.3',
          headerTitleStyle: {fontSize: 30},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="SignInForm"
        component={SignInForm}
        options={{title: 'Sign In Form'}}
      />
      <Stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{
          title: 'Users SignUpForm',
        }}
      />

      <Stack.Screen
        name="UserLists"
        component={UserLists}
        options={{
          title: 'ChitChat 0.3',
        }}
      />

      <Stack.Screen
        name="CameraPhoto"
        component={CameraPhoto}
        options={{
          title: 'ChitChat 0.3 camera preview',
        }}
      />

      <Stack.Screen
        name="ChatUI"
        component={ChatUi}
        options={{
          title: 'ChatUI',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#474FB6',
          },
        }}
      />
      <Stack.Screen
        name="ShowImage"
        component={ShowImage}
        options={{
          title: 'ShowImage',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#474FB6',
          },
        }}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
