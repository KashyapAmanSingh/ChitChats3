/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Image,
  Video,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const FileViewer = ({
  item,
  senderId,
  messageedit,
  setMessageditStatus,
  setMessagedit,
  setMessageId,
  userProfile
}) => {
  const [messageIdFileViewer, setMessageIdFileViewer] = useState(0);
  // if (!item || !item) {
  //   return <Text>Item not available</Text>;
  // }
  console.log(
    item,
    'setMessageIdFileViewer📿📿📿📿📿📿📿📿📿',
    senderId,
    messageedit,
    setMessageditStatus,
    setMessagedit,
    setMessageId,
  );
  const handleEdit = (id, messageEditing) => {
    setMessageditStatus(true);
    setMessagedit(messageEditing);
    setMessageId(id);
    setMessageIdFileViewer(id);
  };

  const renderFile = () => {
    if (item && item) {
      switch (item.fileType) {
        case 'Text':
          return (
            <Text
              selectable={true}
              onLongPress={() => handleEdit(item.ChatId, item.message)}
              style={[
                messageedit && messageIdFileViewer === item.ChatId
                  ? styles.chatEdit
                  : null,
                styles.ChatMessage,
                styles.ChatMessageSender,
              ]}>
              {item.message}
            </Text>
          );

        case 'image':
          return (
            <TouchableOpacity
              style={[styles.ChatMessageSender, styles.chatTests]}
              onLongPress={() => handleEdit(item.ChatId, item.message)}>
              <Image source={{uri: item.message}} style={[styles.ChatImages]} />
            </TouchableOpacity>
          );
        case 'audio':
          return <Text>Audio Player</Text>;
        case 'video':
          return <Text>video Player</Text>;
        // return (
        //   <Video
        //     source={{uri: item.message}}
        //     // eslint-disable-next-line react-native/no-inline-styles
        //     style={{width: 300, height: 200}}
        //   />
        // );
        case 'application':
          return (
            <TouchableOpacity
              onPress={() => handleEdit(item.ChatId, item.message)}
              style={[styles.ChatMessageSender, styles.chatTests]}>
              <Text>{item.message}</Text>
            </TouchableOpacity>
          );

        default:
          return <Text>Unsupported File Type</Text>;
      }
    }
  };

  return (
    <>
      {item.senderId === senderId ? (
        <View
          style={
            messageedit && messageIdFileViewer === item.ChatId
              ? styles.chatContainerEdit
              : null
          }>
          {renderFile()}
        </View>
      ) : (
        <View
          style={
            messageedit && messageIdFileViewer === item.ChatId
              ? styles.chatContainerEdit
              : null
          }>
          {renderFile()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  chatEdit: {
    backgroundColor: '#5C7CFA',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
  },
  chatContainerEdit: {
    backgroundColor: '#5C7CFA80',
    color: 'white',
    borderWidth: 1,
    borderColor: '#474FB6',
    borderRadius: 7,
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
});
export default FileViewer;
