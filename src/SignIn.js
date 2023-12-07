/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {signInfn } from './firebaseFns'

  const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSignIn = () => {
    console.log('handleSignIn button ---------------------------------------------pressed'); // Add this line
    console.log('Email:', email);
    console.log('Password:', password);
    signInfn(email, password)
 
  };
  

  return (
    <View style={styles.container}>
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
      
<View>
  <TouchableOpacity style={styles.button} onPress={handleSignIn}>
    <Text style={styles.buttonText}>handleSignIn button</Text>
  </TouchableOpacity>
</View>

 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 90,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'red',
   
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    height:40,
    textAlign: 'center',
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize:20,
    fontWeight: 'bold',
    
  },
});

export default SignInForm;
