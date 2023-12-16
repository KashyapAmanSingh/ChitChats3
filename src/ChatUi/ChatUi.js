/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import ChatInput from './ChatInput';
import {getId} from '../AsyncStorageUtility/AsyncUtility';
import {getMessagesRealTime} from '../firebaseFns';
import {
   Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CallingBtn from '../CallingBtn/voiceCallingBtn';
import {useNavigation} from '@react-navigation/native';

const ChatUi = ({route}) => {
  const [receiverId, setReceiverId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [getmessage, getChatMessage] = useState([]);
  const [ChatId, setChatId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userPhone = route.params.userPhone;
  const userName = route.params.userName;
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <View style={styles.CallingBtn}>
        {userName && userName ? (
          <View style={styles.UserNameCallBtn}>
            <TouchableOpacity
              style={styles.UserGoBackContainer}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.UserGoBackIcon}
                source={require('../assets/goBack.png')}
              />
            </TouchableOpacity>
            <Image
              style={styles.UserChatImage}
              source={require('../assets/ProfileIcon.gif')}
            />

            <Text style={styles.ChattingUserName}>{ userName.slice(0, 8)}...</Text>

            <CallingBtn userID={userPhone} userName={userName} />
          </View>
        ) : null}
      </View>
      <View style={styles.ChatInput}>
        <ChatInput
          receiverId={receiverId}
          senderId={senderId}
          ChatId={ChatId}
          getmessage={getmessage}
          userName
          userPhone
        />
      </View>
    </View>
  );
};

export default ChatUi;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#474FB6',
  },
  CallingBtn: {
    flex: 0.2,
    alignContent: 'flex-end',
    justifyContent: 'center',
  
  },
  ChatInput: {
    flex: 2.1,
   
  },
  ChattingUserName: {
    color: 'white',
    width: '50%',
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 27,
  },
  UserChatImage: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginLeft: 10,
    alignSelf: 'center',
  },
  UserNameCallBtn: {height: '100%', flexDirection: 'row'},
  UserGoBackIcon: {
    width: 25,
    justifySelf: 'center',
    marginLeft: 12,
    height: 29,
  },
  UserGoBackContainer: {
    alignSelf: 'center',
  },
});
