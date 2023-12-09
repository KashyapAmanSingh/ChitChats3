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
import {createMessage, getMessagesRealTime} from '../firebaseFns';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const ChatInput = ({senderId, receiverId}) => {
  const [message, setMessage] = useState('');
  const [getmessage, getChatMessage] = useState([]);
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
      <View style={styles.chatsLists}>
        {getmessage && (
          <FlatList
            data={getmessage}
            renderItem={items => (
              <View>
                {items.item.senderId !== senderId ? (
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
            keyExtractor={item => item.id}
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
        {/* <ShowMessageUi ChatgetMessage={getmessage} /> */}
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
    backgroundColor: 'red',
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
    color: 'black',
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
