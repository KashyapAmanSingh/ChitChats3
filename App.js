/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Home';
import SignInForm from './src/SignIn';
import SignUpForm from './src/SinUp';
import UserLists from './src/UserLists/UserLists';
import {signOut} from './src/firebaseFns';
import ChatUI from './src/ChatUi/ChatUi';
import AloneCaller from './src/VideoCall/AloneCaller';
import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: 'Users ',
            headerRight: () => <Button onPress={signOut} title="signOut" />,

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
            // headerRight: () => <Button onPress={signOut} title="signOut" />,
            title: 'Users Home',
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
            // headerRight: () => <Button onPress={signOut} title="signOut" />,
          }}
        />

        <Stack.Screen
          name="UserLists"
          component={UserLists}
          options={{
            title: 'Users UserLists',
            headerRight: () => <Button onPress={signOut} title="signOut" />,
          }}
        />

        <Stack.Screen
          name="ChatUI"
          component={ChatUI}
          options={{
            title: 'ChatUI',
            headerRight: () => <Button onPress={signOut} title="signOut" />,
            headerStyle: {
              backgroundColor: '#474FB6',
            },
          }}
        />

        <Stack.Screen
          name="AloneCaller"
          component={AloneCaller}
          options={{
            title: 'AloneCaller',
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

     </NavigationContainer>
  );
};

 

export default App;
