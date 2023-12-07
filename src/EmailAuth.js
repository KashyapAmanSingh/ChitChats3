/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import SignUpForm from './SinUp';
import SignInForm from './SignIn';
import signOut from './firebaseFns';
function EmailAuth() {
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

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign out button</Text>
        </TouchableOpacity>
        <SignInForm/>
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
