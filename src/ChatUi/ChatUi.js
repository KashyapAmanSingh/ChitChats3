/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import ChatInput from './ChatInput';
import {getId} from '../AsyncStorageUtility/AsyncUtility';
import {getMessagesRealTime} from '../firebaseFns';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatUi = ({route}) => {
  const [receiverId, setReceiverId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [getmessage, getChatMessage] = useState([]);
  const [ChatId, setChatId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getId('UserId');
      if (!id) {
        return; // Early return if ID is not available
      }

      const receiverrouteId = route.params.userId;
      setReceiverId(receiverrouteId);
      setSenderId(id);
    };
    if (receiverId && senderId) {
      setChatId(`${senderId}${receiverId}`.split('').sort().join(''));
    }
    fetchData();
  }, [route.params.userId, receiverId, senderId]);

  useEffect(() => {
    if (ChatId && ChatId.length >= 50) {
      getMessagesRealTime(ChatId, getChatMessage);
    }
  }, [ChatId]);

  return (
    <ChatInput
      receiverId={receiverId}
      senderId={senderId}
      ChatId={ChatId}
      getmessage={getmessage}
    />
  );
};

export default ChatUi;

// use for reading chat but not real time
// useEffect(() => {
//   const fetchData = async () => {
//     setIsLoading(true); // Set loading to true before fetching

//     if (ChatId && ChatId.length >= 50) {
//       getChatMessage('');
//       const unsubscribe = await getMessages(ChatId);
//       getChatMessage(unsubscribe);
//       setIsLoading(false); // Set loading to false after data is fetched
//       // Unsubscribe when the component unmounts
//       // return () => unsubscribe();
//     }
//   };
//   fetchData();
// }, [ChatId]);
