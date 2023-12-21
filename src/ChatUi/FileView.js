/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MediaMsgComponent from './MediaMsgComponent/MediaMsgComponent';
import {messageCreationTimeStamps} from './MediaMsgComponent/TimeUtility/TimeUtility';

const FileViewer = ({
  item,
  senderId,
  messageedit,
  setMessageditStatus,
  setMessagedit,
  setMessageId,
  userProfile,
  messageId,
}) => {
  const [messageIdFileViewer, setMessageIdFileViewer] = useState(0);

  if (!item) {
    return <Text>Item not available</Text>;
  }

  const handleEdit = (id, messageEditing) => {
    setMessageditStatus(true);
    setMessagedit(messageEditing);
    setMessageId(id);
    setMessageIdFileViewer(id);
  };

  const renderFile = params => {
    if (item && item) {
      const {day, formattedTime, formattedDate} = messageCreationTimeStamps(
        item.createdAt.seconds,
        item.createdAt.nanoseconds,
      );
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
                params && styles[params],
              ]}>
              {item.message}
              {'\n'}
              <Text style={[styles.formattedTimeCss]}>{formattedTime}</Text>
              {/* {`Day: ${day}, Time: ${formattedTime}, Date: ${formattedDate}`} */}
            </Text>
          );

        case 'image':
          return (
            <TouchableOpacity
              style={[styles.ChatMessageSender]}
              onLongPress={() => handleEdit(item.ChatId, item.message)}>
              <Image source={{uri: item.message}} style={[styles.ChatImages]} />

              <Text style={[styles.formattedTimeCss]}>{formattedTime}</Text>
            </TouchableOpacity>
          );
        case 'audio':
          return (
            <>
              <MediaMsgComponent
                item={item}
                senderId={senderId}
                messageedit={messageedit}
                setMessageditStatus={setMessageditStatus}
                setMessagedit={setMessagedit}
                setMessageId={setMessageId}
                userProfile={userProfile}
                type={'audio'}
                params={params}
                messageId={messageId}
                formattedTime={formattedTime}
              />
            </>
          );

        case 'video':
          return (
            <MediaMsgComponent
              item={item}
              setMessageditStatus={setMessageditStatus}
              setMessagedit={setMessagedit}
              setMessageId={setMessageId}
              userProfile={userProfile}
              type={'video'}
              params={params}
              formattedTime={formattedTime}
            />
          );

        case 'application':
          return (
            <MediaMsgComponent
              item={item}
              senderId={senderId}
              messageedit={messageedit}
              setMessageditStatus={setMessageditStatus}
              setMessagedit={setMessagedit}
              setMessageId={setMessageId}
              userProfile={userProfile}
              type={'application'}
              params={params}
              messageId={messageId}
              formattedTime={formattedTime}
            />
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
          {renderFile('ChatMessageSender')}
        </View>
      ) : (
        <View
          style={
            messageedit && messageIdFileViewer === item.ChatId
              ? styles.chatContainerEdit
              : null
          }>
          {renderFile('ChatMessageReceiver')}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  formattedTimeCss: {
    fontSize: 11,
    width: '100%',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 2,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },

  UserChatMessageIcon: {
    height: 45,
    width: 45,
    alignSelf: 'center',
    marginLeft: 1,
  },

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
