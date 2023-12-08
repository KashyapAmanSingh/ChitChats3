/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import createUser, {signUpfn} from './firebaseFns';

const SignUpForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');

  const handleSignUp = async () => {
    if (confirmPassword !== password)
      return Alert.alert('Please enter correct your password');

    const uuid = uuidv4();
    const userId = await signUpfn(email, password);
    const collectionDocsName = userId;
    await createUser(collectionDocsName, uuid, name, email, phone, password);
    setEmail('');
    setPassword('');
    setPhone('');
    setConfirmPassword('');
    setName('');
    props.navigation.navigate('SignInForm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.input}
          label="Name"
          placeholder="Your NAME"
          secureTextEntry
          autoCapitalize="words"
          autoCorrect={true}
          numberOfLines={4}
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          label="Email"
          placeholder="Enter your email"
          autoCorrect={true}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Enter Phone Number"
          placeholder="Enter Phone Number"
          secureTextEntry={true}
          autoCorrect={true}
          numberOfLines={4}
          onChangeText={text => setPhone(text)}
          value={phone}
        />
        <TextInput
          style={styles.input}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          autoCorrect={true}
          numberOfLines={4}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.input}
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={true}
          autoCorrect={true}
          numberOfLines={4}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>

      <View style={styles.Buttoncontainer}>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SignUp button</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.SignInLink}
            onPress={() => props.navigation.navigate('SignInForm')}>
            <Text style={styles.SignInLinkText}>Already Signed In </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

    padding: 20,
    marginTop: 10,
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
    flex: 1.3,
    backgroundColor: 'white',
    placeholder: 'red',
    justifyContent: 'center',
  },
  SignInLink: {
    backgroundColor: 'white',
    height: 40,

    color: 'blue',
  },
  SignInLinkText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 25,
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
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

export default SignUpForm;
