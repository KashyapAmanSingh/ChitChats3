/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMessages, getMessagesRealTime} from '../firebaseFns';
import {getId} from '../AsyncStorageUtility/AsyncUtility';

const ShowMessageUi = ({ChatId}) => {
  const [message, setMessage] = useState([]);
  const [senderId, setSenderId] = useState();

  useEffect(() => {
    const fetchDataMessage = async () => {
      ChatId && ChatId.length >= 50
        ? await getMessagesRealTime(ChatId, setMessage)
        : null;

      const chatSenderId = await getId('UserId');
      senderId && setSenderId(chatSenderId);
    };
    fetchDataMessage();
  }, []);

  message.forEach(documentSnapshot => {
    console.log(
      ': 💴 💴💴💴 s😊 ',
      documentSnapshot.id,
      documentSnapshot.data(),
    );
  });
  
  return (
    <View>
      <Text>GetUsers</Text>
    </View>
  );
};

export default ShowMessageUi ;

const styles = StyleSheet.create({});
