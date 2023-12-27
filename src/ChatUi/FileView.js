/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MediaMsgComponent from './MediaMsgComponent/MediaMsgComponent';
import {messageCreationTimeStamps} from './MediaMsgComponent/TimeUtility/TimeUtility';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();

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

  const handleImageDetails = url => {
    navigation.navigate('ShowImage', {
      url: url,
    });
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
            <>
              <Text style={styles.chatDay}>
                {day !== '' ? day : formattedDate}
              </Text>

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
              </Text>
            </>
          );

        case 'image':
          return (
            <>
              <Text style={styles.chatDay}>
                {day !== '' ? day : formattedDate}
              </Text>

              <TouchableOpacity
                style={[styles.ChatMessageSender]}
                onPress={() => handleImageDetails(item.message)}
                onLongPress={() => handleEdit(item.ChatId, item.message)}>
                <Image
                  indicator={ProgressCircle}
                  source={{uri: item.message}}
                  style={[styles.ChatImages]}
                  indicatorProps={{
                    size: 60,
                    borderWidth: 1,
                    color: '#474FB6',
                    unfilledColor: 'white',
                    thickness: 4,
                    borderColor: '#474FB6',
                  }}
                />

                <Text style={[styles.formattedTimeCss]}>{formattedTime}</Text>
              </TouchableOpacity>
            </>
          );
        case 'audio':
          return (
            <>
              <Text style={styles.chatDay}>
                {day !== '' ? day : formattedDate}
              </Text>

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
            <>
              <Text style={styles.chatDay}>
                {day !== '' ? day : formattedDate}
              </Text>

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
            </>
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
  chatDay: {
    color: 'red',
    height: 25,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
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
    borderRadius: 0,
    marginVertical: 10,
  },
});
export default FileViewer;
