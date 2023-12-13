/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {signInfn} from './firebaseFns';
import {storeId} from './AsyncStorageUtility/AsyncUtility';
import {useNavigation} from '@react-navigation/native';
import {getFirstInstallTime} from 'react-native-device-info';
import {onUserLogin, storeUserInfo} from './VideoCall/ZegoUtillity';

const SignInForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [userIDZego, setUserIDZego] = useState('');
  const [userNameZego, setUserNameZego] = useState('');

  useEffect(() => {
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(firstInstallTime).slice(-5);
      setUserIDZego(id);
      const name = 'user_' + id;
      setUserNameZego(name);
    });
  }, []);
  const handleSignIn = async () => {
    try {
      const SecurityId = await signInfn(email, password);
      storeId({key: 'UserId', id: SecurityId});
      storeUserInfo({userIDZego, userNameZego}); //for zego update
      // Init the call service
      onUserLogin(userIDZego, userNameZego).then(() => {
        // Jump to HomeScreen to make new call
        navigation.navigate('HomeScreen', {userIDZego});
      });
      // props.navigation.navigate('Home');
    } catch (error) {
      // Handle errors if needed
      console.error('Error during sign in:', error);
    }
  };
  useEffect(() => {
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(firstInstallTime).slice(-5);
      setUserIDZego(id);
      const name = 'user_' + id;
      setUserNameZego(name);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}>
        <Text>userID: {userIDZego}</Text>
        <Text>userName: {userNameZego}</Text>
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.input}
          label="Email"
          placeholderTextColor="#474FB6"
          placeholder="Enter your email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Password"
          placeholderTextColor="#474FB6"
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.Buttoncontainer}>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.SignInLink}
            onPress={() => props.navigation.navigate('SignUpForm')}>
            <Text style={styles.SignInLinkText}>create Account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 0,
    backgroundColor: 'white',
  },
  input: {
    color: 'red',

    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  Inputcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  Buttoncontainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'red',
    marginHorizontal: '1%',
    marginBottom: 10,
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
  SignUpFormText: {
    textShadowColor: 'blue', // Fix this line
    color: 'blue',
  },
  SignInLink: {
    backgroundColor: 'white',
    height: 40,
    justifyContent: 'center',
    color: 'blue',
  },
  SignInLinkText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 22,
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignInForm;
