/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {signOut} from '../firebaseFns';

const UserLists = () => {
  return (
    <div>
      UserLists
      <View>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign out button</Text>
        </TouchableOpacity>
      </View>
    </div>
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
});

export default UserLists;
