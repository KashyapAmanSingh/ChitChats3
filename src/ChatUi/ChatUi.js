/* eslint-disable prettier/prettier */
import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatInput from './ChatInput';
import {getId} from '../AsyncStorageUtility/AsyncUtility';

const ChatUi = ({route}) => {
  const [receiverId, setReceiverId] = useState(null);
  const [senderId, setSenderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getId('UserId');
      // const senderId=id.split('').sort().join('')
      const receiverrouteId = route.params.userId;
      setReceiverId(receiverrouteId);
      id && setSenderId(id);
      
    };

    fetchData();
  }, []);
  return (
    <View>
      <Text>ChatUI</Text>
      {/* Assuming ChatInput is a component you've created */}
      <ChatInput receiverId={receiverId} senderId={senderId} />
    </View>
  );
};

export default ChatUi;

const styles = StyleSheet.create({});
