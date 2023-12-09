/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createMessage, getMessagesRealTime} from '../firebaseFns';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ShowMessageUi from '../UserLists/GetUsers';

const ChatInput = ({senderId, receiverId}) => {
  const [message, setMessage] = useState('');
  const [getmessage, getChatMessage] = useState('');
  const ChatId = `${senderId}${receiverId}`.split('').sort().join('');
  const handleSend = () => {
    if (message.trim() !== '') {
      const uuid = uuidv4();
      createMessage(uuid, message, ChatId, senderId, receiverId);
      setMessage(''); // Clear the input after sending
    }
    ChatId && ChatId.length >= 50
      ? getMessagesRealTime(ChatId, getChatMessage)
      : null;
  };
 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
      {/* <ShowMessageUi ChatId={ChatId} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: 'purple',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatInput;
