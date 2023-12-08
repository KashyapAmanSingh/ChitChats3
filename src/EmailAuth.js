/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignUpForm from './SinUp';
import SignInForm from './SignIn';
import signOut from './firebaseFns';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';

// function EmailAuth() {
// Set an initializing state whilst Firebase connects
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

// Handle user state changes
function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);

if (initializing) return null;

if (!user) {
  return (
    <View>
      {/* <SignUpForm /> */}
      <SignInForm/>

    </View>
  );
}
function EmailAuth() {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: 'Users Home',
            headerStyle: {
              backgroundColor: 'red',
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
                backgroundColor: 'red',
              },
              title: 'Users Home',
              headerTitleStyle: {fontSize: 30},
              headerTintColor: 'white',
            }}
            // Pass the navigation prop as "navigation"
          />

          <Stack.Screen
            name="SignInForm"
            component={SignInForm}
            options={{
              title: 'Sign In Form',
              headerStyle: {
                backgroundColor: 'red',
              },
            }}
          />

          <Stack.Screen
            name="SignUpForm"
            component={SignUpForm}
            options={{title: 'Users SignUpForm',
             headerStyle: {
              backgroundColor: 'red',
            },}}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <View>
        {/* <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign out button</Text>
        </TouchableOpacity> */}
        <SignInForm />
      </View>
    </View>
  );
}

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
});

export default EmailAuth;
