/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {createMessage} from '../firebaseFns';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
 
import pickImage from './UploadFeat/ImageUpload';

const ChatInput = ({senderId, receiverId, ChatId, getmessage}) => {
  const [message, setMessage] = useState('');

  const uuid = uuidv4();

  const handleSend = () => {
    if (message.trim() !== '' && message && message) {
      const fileType = 'Text';
      if (uuid && fileType && message && ChatId && senderId && receiverId) {
        createMessage(uuid, fileType, message, ChatId, senderId, receiverId);
        setMessage('');
      }
    }
  };
  const uploadImagehandler = () => {
    pickImage(uuid, ChatId, senderId, receiverId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatsLists}>
        {getmessage && (
          <FlatList
            data={getmessage}
            renderItem={({item, index}) => (
              <>
                {item.senderId === senderId ? (
                  <View>
                    {item.fileType === 'Text' ? (
                      <Text
                        style={[styles.ChatMessage, styles.ChatMessageSender]}>
                        {item.message}
                      </Text>
                    ) : item.fileType === 'image/jpeg' ? (
                      <TouchableOpacity style={styles.ChatMessageSender}>
                        <Image
                          source={{uri: item.message}}
                          style={[styles.ChatImages]}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : (
                  <>
                    {item.fileType === 'Text' ? (
                      <Text
                        style={[
                          styles.ChatMessage,
                          styles.ChatMessageReceiver,
                        ]}>
                        {item.message}
                      </Text>
                    ) : item.fileType === 'image/jpeg' ? (
                      <TouchableOpacity style={styles.ChatMessageReceiver}>
                        <Image
                          source={{uri: item.message}}
                          style={[styles.ChatImages]}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </>
                )}
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>

      <View style={styles.InputContainer}>
        <TouchableOpacity
          style={styles.SendItemsIcon}
          onPress={uploadImagehandler}>
          <Image
            style={styles.UserGoBackIcon}
            source={require('../assets/sendIcon1.png')}
          />
        </TouchableOpacity>

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
    paddingTop: 15,
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
    marginVertical: 9,

    flexWrap: 'wrap',
    // width: 190,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#474FB6',
    borderRadius: 10,
    padding: 5,
    marginLeft: 25,
    marginRight: 28,
    paddingHorizontal: 15,
    color: '#474FB6',
  },
  ChatMessageSender: {
    alignSelf: 'flex-end',
  },
  ChatMessageReceiver: {
    alignSelf: 'flex-start',
  },
  ChatImages: {
    width: 220,
    height: 250,
    marginHorizontal: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#474FB6',
    borderRadius: 15,
  },
  InputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
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
    width: '60%',
  },
  SendItemsIcon: {
    backgroundColor: 'white',
    height: 50,
    width: '13%',
  },
  sendButton: {
    backgroundColor: '#474FB6',
    width: '20%',
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
