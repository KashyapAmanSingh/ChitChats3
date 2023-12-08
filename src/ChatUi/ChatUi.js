/* eslint-disable prettier/prettier */
import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import ChatInput from './ChatInput';

const ChatUI = () => {
  const route = useRoute();
  const userId = route.params.userId;

  Alert.alert(userId);

  // Split the UUID string into an array of hexadecimal values
  const receiverId = userId.split('-').join('').split('').sort().join('');

  //    const sortedUuid = `${sortedHex.substr(0, 8)}-${sortedHex.substr(8, 4)}-${sortedHex.substr(12, 4)}-${sortedHex.substr(16, 4)}-${sortedHex.substr(20)}`;
  Alert.alert(receiverId);

  console.log(
    '----------------------------------------------------------',
    receiverId,
  );
  return (
    <View>
      <Text>ChatUI</Text>
      {/* Assuming ChatInput is a component you've created */}
      <ChatInput />
    </View>
  );
};

export default ChatUI;

const styles = StyleSheet.create({});
