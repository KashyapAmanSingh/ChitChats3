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
  Button,
} from 'react-native';
import {createMessage} from '../firebaseFns';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import pickImage from './UploadFeat/ImageUpload';
import ChatTextEdit from './ChatText/ChatTextEdit';
import { useNavigation } from '@react-navigation/native';

const ChatInput = ({senderId, receiverId, ChatId, getmessage}) => {
  const [message, setMessage] = useState('');
  const [messageedit, setMessageditStatus] = useState(false);
  const [messageeditText, setMessagedit] = useState('');

  const [messageId, setMessageId] = useState(0);
  const uuid = uuidv4();
  const navigation=useNavigation()

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
  const handleEdit = (id, messageEditing) => {
    setMessageditStatus(true);
    setMessagedit(messageEditing);
    setMessageId(id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.chatsLists}>
        {getmessage && (
          <FlatList
            data={getmessage}
            renderItem={({item}) => (
              <>
                {item.senderId === senderId ? (
                  <View
                    style={
                      messageedit && messageId === item.ChatId
                        ? styles.chatContainerEdit
                        : null
                    }>
                    {item.fileType === 'Text' ? (
                      <Text
                        selectable={true}
                        onLongPress={() =>
                          handleEdit(item.ChatId, item.message)
                        }
                        style={[
                          messageedit && messageId === item.ChatId
                            ? styles.chatEdit
                            : null,
                          styles.ChatMessage,
                          styles.ChatMessageSender,
                        ]}>
                        {item.message}
                      </Text>
                    ) : item.fileType === 'image/jpeg' ? (
                      <TouchableOpacity
                        style={[styles.ChatMessageSender, styles.chatTests]}
                        onLongPress={() =>
                          handleEdit(item.ChatId, item.message)
                        }>
                        <Image
                          source={{uri: item.message}}
                          style={[styles.ChatImages]}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : (
                  <View
                    style={
                      messageedit && messageId === item.ChatId
                        ? styles.chatContainerEdit
                        : null
                    }>
                    {item.fileType === 'Text' ? (
                      <Text
                        selectable={true}
                        onLongPress={() =>
                          handleEdit(item.ChatId, item.message)
                        }
                        style={[
                          messageedit && messageId === item.ChatId
                            ? styles.chatEdit
                            : null,
                          styles.ChatMessage,
                          styles.ChatMessageReceiver,
                        ]}>
                        {item.message}
                      </Text>
                    ) : item.fileType === 'image/jpeg' ? (
                      <TouchableOpacity
                        style={[styles.ChatMessageReceiver, styles.chatTests]}
                        onLongPress={() =>
                          handleEdit(item.ChatId, item.message)
                        }>
                        <Image
                          source={{uri: item.message}}
                          style={[styles.ChatImages]}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {messageedit ? (
          <ChatTextEdit
            id={messageId}
            chatId={ChatId}
            message={messageeditText}
            setMessageditStatus={setMessageditStatus}
          />
        ) : null}
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
  chatContainerEdit: {
    backgroundColor: '#5C7CFA80',
    color: 'white',
    borderWidth: 1,
    borderColor: '#474FB6',
    borderRadius: 7,
  },
  chatEdit: {
    backgroundColor: '#5C7CFA',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
  },
  ChatMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 7,

    flexWrap: 'wrap',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#474FB6',
    borderRadius: 10,
    padding: 5,
    marginLeft: 25,
    marginRight: 28,
    paddingHorizontal: 15,
  },
  ChatMessageSender: {
    alignSelf: 'flex-end',
    marginLeft: 70,
    marginRight: 12,
    color: '#474FB6',
    backgroundColor: '#339AF01F',
  },
  ChatMessageReceiver: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginRight: 70,
    color: '#474FB6',

    backgroundColor: '#339AF01F',
  },
  ChatImages: {
    width: 220,
    height: 250,

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
