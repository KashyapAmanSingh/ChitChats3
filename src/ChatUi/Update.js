/* eslint-disable prettier/prettier */
import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {updateMessage} from '../firebaseFns';

const UpdateMsg = ({id, chatId, message, setUpdateStatus}) => {
  const [editedMessage, setEditedMessage] = useState('');
  const handleEdit = () => {
    updateMessage(id, chatId, editedMessage);

    setEditedMessage('');
    setUpdateStatus(false);
  };

  useEffect(() => {
    setEditedMessage(message);
  }, [message]);
  return (
    // style={styles.InputContainer}
    <View>
      <TextInput
        value={editedMessage}
        onChangeText={text => setEditedMessage(text)}
        style={styles.input}
      />
      <Button title="Edit" onPress={handleEdit} />
      <Button title="CancelEdit" onPress={() => setUpdateStatus(false)} />
    </View>
  );
};

export default UpdateMsg;

const styles = StyleSheet.create({
  //   InputContainer: {
  //     flex: 1,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: 'white',
  //     width: '100%',
  //     marginBottom:100   , maxHeight: 100,
  //   },

  input: {
    maxHeight: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8,
    width: '60%',
    color: 'red',
  },
});
