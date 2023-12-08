/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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

const SignInForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(
    props,
    'props  SignInForm  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~----pressed',
  ); // Add this line
  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    signInfn(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.input}
          label="Email"
          placeholder="Enter your email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Password"
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
