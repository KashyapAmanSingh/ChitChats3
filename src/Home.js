/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {signOut} from './firebaseFns';
import auth from '@react-native-firebase/auth';
import SignInForm from './SignIn';
const Home = props => {
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

  //   if (!user) {
  //     return (
  //       <View>
  //         {/* <SignUpForm /> */}
  //         <SignInForm />
  //       </View>
  //     );
  //   }
  return (
    <View style={styles.HomeContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('SignUpForm')}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          SignUpForm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('SignInForm')}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          Click TO go on signIn Form
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },

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
    backgroundColor: 'red',
  },
  SignInFormText: {
    color: 'white',
  },
});
