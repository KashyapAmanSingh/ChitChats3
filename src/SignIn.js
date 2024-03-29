/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  OnlineInformation,
  ReadCollectionsById,
  signInfn,
  tokenhandler,
  updateUser,
} from './firebaseFns';
import {storeId} from './AsyncStorageUtility/AsyncUtility';
import {onUserLogin, storeUserInfo} from './VideoCall/ZegoUtillity';
import {useNavigation} from '@react-navigation/native';

const SignInForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignIn = async () => {
    const deviceToken = await tokenhandler();

    try {
      const SecurityId = await signInfn(email, password);
      const docsID = SecurityId;
      const status = 'Online';
      if (docsID && deviceToken) {
        updateUser(docsID, deviceToken, status);
        storeId({key: 'DeviceToken', id: deviceToken});
      }

      if (docsID) {
        storeId({key: 'UserId', id: docsID});
        const {userList: users} = await ReadCollectionsById('users', docsID);
        const userNameZego = users[0].name;
        const userIDZego = users[0].phone;

        if (users && users.length > 0) {
          await onUserLogin(userIDZego, userNameZego);
          storeUserInfo({userIDZego, userNameZego});

          navigation.navigate('UserLists', {userIDZego});
        }
        if (deviceToken) {
          const userName = userNameZego;
          const userPhone = userIDZego;

          const myToken = deviceToken;
          await OnlineInformation(myToken, userName, userPhone);
        }
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  // tokenhandler

  return (
    <View style={styles.container}>
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
    color: '#474FB6',
    fontWeight: 'bold',
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
