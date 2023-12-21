/* eslint-disable prettier/prettier */
import {
   Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const MediaMsgComponent = ({
  item,
  setMessageditStatus,
  setMessagedit,
  setMessageId,
  userProfile,
  type,
  params,
  formattedTime,
}) => {
  const handleEdit = (id, messageEditing) => {
    setMessageditStatus(true);
    setMessagedit(messageEditing);
    setMessageId(id);
  };
  const mediaLinkHandler = url => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      onPress={() => mediaLinkHandler(item.message)}
      onLongPress={() => handleEdit(item.ChatId, item.message)}>
      <View
        style={[
          type && type === 'application'
            ? styles.DocumentsContainer
            : styles.mediaMessageContainer,
          styles[params],
        ]}>
        <Image source={{uri: userProfile}} style={[styles.UserProfileImage]} />
        <Image
          source={
            type && type === 'video'
              ? require('../../assets/video2.png')
              : type && type === 'application'
              ? require('../../assets/docs2.png')
              : require('../../assets/audio.png') // You might want to provide a default image or handle the case where type doesn't match
          }
          style={[styles.UserChatMessageIcon]}
        />
        {type && type !== 'application' ? (
          <Image
            source={require('../../assets/wave2.png')}
            style={styles.UserChatWaveIcon}
          />
        ) : null}

        <Text
          style={[
            type && type !== 'application'
              ? styles.formattedTimeCss
              : styles.formattedApplicationTimeCss,
          ]}>
          {formattedTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MediaMsgComponent;

const styles = StyleSheet.create({
  mediaMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
    alignContent: 'center',
    marginVertical: 10,
    borderRadius: 15,
  },
  DocumentsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 15,
    width: 190,
    justifyContent: 'space-evenly',
  },
  UserChatDocsIcon: {
    height: 65,
    width: 65,
    marginLeft: 1,
  },
  UserProfileImage: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginLeft: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  UserChatMessageIcon: {
    height: 45,
    width: 45,
    alignSelf: 'center',
    marginLeft: 1,
  },
  UserChatWaveIcon: {
    height: 28,
    alignSelf: 'center',
    marginLeft: 2,
    width: 100,
  },
  documentsContainer: {
    width: 45,
    flexDirection: 'row',
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
 
  formattedTimeCss: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginHorizontal: 2,
    marginVertical: 2,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
  formattedApplicationTimeCss: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginVertical: 2,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
});
