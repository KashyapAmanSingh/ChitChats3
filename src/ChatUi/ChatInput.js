/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {createMessage} from '../firebaseFns';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import CallingBtn from '../CallingBtn/voiceCallingBtn';

const ChatInput = ({senderId, receiverId, ChatId, getmessage }) => {
  const [message, setMessage] = useState('');
  const [countMessage, setcountMessage] = useState(0);

  const handleSend = () => {
    if (message.trim() !== '' && message && message) {
      const uuid = uuidv4();
      createMessage(uuid, message, ChatId, senderId, receiverId);
      setMessage(''); // Clear the input after sending
    }
    setcountMessage(countMessage + 1);
  };
  return (
    <View style={styles.container}>
 
      <View style={styles.chatsLists}>
        {getmessage && (
          <FlatList
            data={getmessage}
            renderItem={(items, index) => (
              <View>
                {items.item.senderId === senderId ? (
                  <Text
                    style={[styles.ChatMessage, styles.ChatMessageReceiver]}>
                    {items.item.message}
                  </Text>
                ) : (
                  <Text style={[styles.ChatMessage, styles.ChatMessageSender]}>
                    {items.item.message}
                  </Text>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>

      <View style={styles.InputContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  chatsLists: {
    backgroundColor: 'white',
    flex: 9,
  },
  ChatMessage: {
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginVertical: 1,
    flexWrap: 'wrap',
    // width: 190,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    marginLeft: 25,
    marginRight: 10,
    paddingHorizontal: 15,
    color: '#474FB6',
  },
  ChatMessageSender: {
    alignSelf: 'flex-end',
  },
  ChatMessageReceiver: {
    alignSelf: 'flex-start',
  },

  InputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  input: {
    maxHeight: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8,
    width: '73%',
  },
  sendButton: {
    backgroundColor: '#474FB6',
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

