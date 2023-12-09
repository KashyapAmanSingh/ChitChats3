/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMessages, getMessagesRealTime} from '../firebaseFns';
import {getId} from '../AsyncStorageUtility/AsyncUtility';

const ShowMessageUi = ({ChatItem}) => {
  // Access properties of ChatItem to render the UI

  console.log(
    '💣💣💣💣💣💣💣💣 💣',
    ChatItem,
    '🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝🔝',
  );

  return (
    <View>
      <Text>Created At: Created At: Created At: Created At: </Text>
      {/* <Text>Chat ID: {ChatId}</Text>
      <Text>Created At: {createdAt}</Text>
      <Text>Message: {message}</Text>
      <Text>Receiver ID: {receiverId}</Text>
      <Text>Sender ID: {senderId}</Text> */}
      {/* Add more UI elements based on your requirements */}
    </View>
  );
};

export default ShowMessageUi;

const styles = StyleSheet.create({});

