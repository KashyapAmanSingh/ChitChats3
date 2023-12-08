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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: 'Users ',
          headerStyle: {
            backgroundColor: 'wheat',
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
            headerStyle: {
              backgroundColor: 'wheat',
            },
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
      </Stack.Navigator>

      {/* Additional UI components can be rendered outside of the navigator */}
      {/* <TouchableOpacity style={styles.button}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          Click TO go on signIn Form
        </Text>
      </TouchableOpacity> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'red',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    height: 40,
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  SignInFormText: {
    textShadowColor: 'blue',
    color: 'blue',
  },
});

export default App;
