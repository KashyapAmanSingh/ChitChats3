/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import UpdateMsg from '../Update';
import {deleteMessage} from '../../firebaseFns';
import {useClipboard} from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
const ChatTextEdit = ({id, chatId, message, setMessageditStatus}) => {
  const [messagedUpdateStatus, setmessagedUpdateStatus] = useState(false);
  const [data, setString] = useClipboard();
  const handleIconPress = iconName => {
    switch (iconName) {
      case 'Edit':
        setmessagedUpdateStatus(true);
        break;

      case 'Delete':
        deleteMessage(id, chatId);
        setMessageditStatus(false);
        // Add your custom logic for the 'Delete' action
        break;

      case 'Copy':
        setString(message);
        Alert, alert('copied', message);
        break;
      case 'Share':
        const options = {
          message: message,
        };
        Share.open(options)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
        Alert.alert('Share icon pressed');
        break;

      case 'Close':
        setMessageditStatus(false);
        break;

      default:
        // Default case
        break;
    }
  };
  return messagedUpdateStatus ? (
    <UpdateMsg
      id={id}
      chatId={chatId}
      message={message}
      setUpdateStatus={setmessagedUpdateStatus}
    />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleIconPress('Edit')}>
        <Image source={require('../../assets/edit.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleIconPress('Delete')}>
        <Image
          source={require('../../assets/delete.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleIconPress('Copy')}>
        <Image source={require('../../assets/copy.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleIconPress('Share')}>
        <Image source={require('../../assets/share.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('Close')}>
        <Image source={require('../../assets/close.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#5C7CFA',
    borderRadius: 10,
  },
});

export default ChatTextEdit;
