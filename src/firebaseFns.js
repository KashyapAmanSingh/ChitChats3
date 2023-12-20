/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {getId, removeId} from './AsyncStorageUtility/AsyncUtility';
import {onSnapshot} from 'firebase/firestore';
import {onUserLogout, removeUserInfo} from './VideoCall/ZegoUtillity';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const signUpfn = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    console.log('User account created & signed in!');

    const user = userCredential.user;

    return user.uid;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      Alert.alert('That email address is invalid!');
    }

    console.error(error);
    throw error; // Rethrow the error to handle it at the calling location
  }
};

export const signOut = async navigation => {
  const docsID = await getId('UserId');
  const token = await tokenhandler();
  try {
    await auth().signOut();
    removeId('UserId');

    removeId('DeviceToken');
    onUserLogout();
    removeUserInfo();
    if (docsID && token) {
      updateUser(docsID, token);
    }

    navigation.navigate('Home');
    return console.log('User signed out!');
  } catch (error) {
    Alert.alert('Error signed out!');
  }
};

export const signInfn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
    throw error; // Rethrow the error to handle it at the calling location
  }
};

export const updateUser = async (
  docsID,
  deviceToken = null,
  status = 'Offline',
) => {
  if (docsID && deviceToken) {
    firestore()
      .collection('users')
      .doc(docsID)
      .update({
        token: deviceToken,
        status: status,
      })
      .then(() => {
        console.log('User token updated!');
      });
  }
};

export const tokenhandler = async () => {
  await messaging().registerDeviceForRemoteMessages();

  const token = await messaging().getToken();
  return token;
};

export const createToken = async token => {
  try {
    const db = firestore();
    await db
      .collection('token')
      .doc('TokenStore')
      .update({
        fcmTokens: firestore.FieldValue.arrayUnion(token),
      });
  } catch (error) {
    Alert.alert(error.message, 'In the create token');
  }
};
export const getToken = async myToken => {
  try {
    const db = firestore();
    const res = await db.collection('token').doc('TokenStore').get();
    if (res.exists) {
      const allTokens = res.data().fcmTokens || [];

      const otherTokens = allTokens.filter(token => token !== myToken);

      return otherTokens;
    } else {
      console.log('TokenStore document does not exist');
    }
    console.log('TokenStore is here bro 🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮🏮', res);
  } catch (error) {
    Alert.alert(error.message, 'In the create token');
  }
};
export const createUser = async (
  collectionDocsName,
  uuid,
  name,
  profileImageUrl,
  email,
  phone,
) => {
  try {
    const db = firestore();

    await db.collection('users').doc(collectionDocsName).set({
      id: uuid,
      name: name,
      profilePicture: profileImageUrl,
      phone: phone,
      email: email,
    });

    return collectionDocsName;
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error; // Rethrow the error to handle it at the calling location
  }
};

export const ReadCollections = async (collectionName, docsId) => {
  let users;
  if (collectionName) {
    users = await firestore().collection(collectionName).get();
  } else if (collectionName && docsId) {
    users = await firestore().collection(collectionName).doc(docsId).get();
  }

  const userList = users.docs.map(doc => doc.data());
  const userId = users.docs.map(doc => doc.id);
  return {userList, userId};
};

export const ReadCollectionsById = async (collectionName, docsId) => {
  if (collectionName && docsId) {
    const user = await firestore().collection(collectionName).doc(docsId).get();

    if (user.exists) {
      const userList = [user.data()]; // Wrap the single user data in an array
      const userId = user.id;

      return {userList, userId};
    } else {
      console.error('User not found.');
      return {userList: [], userId: null};
    }
  }
};

export const createMessage = async (
  uuid,
  types,
  message,
  ChatId,
  senderId,
  receiverId,
) => {
  try {
    // Access the Firestore database
    const db = firestore();

    await db
      .collection('messages')
      .doc(ChatId)
      .collection('MessageLists')
      .doc(uuid)
      .set({
        ChatId: uuid,
        fileType: types,
        message: message,
        senderId: senderId,
        receiverId: receiverId,
        createdAt: new Date(),
      });
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error; // Rethrow the error to handle it at the calling location
  }
};

export const getMessages = async ChatId => {
  const ChattingId = await ChatId;

  try {
    const messages = await firestore()
      .collection('messages')
      .doc(ChattingId)
      .collection('MessageLists')
      .orderBy('createdAt')
      .get();
    const messagesList = messages.docs.map(doc => doc.data());
    return messagesList;
  } catch {
    console.log('Error while getting messages ');
  }
};

//RealTime Messaging
export const getMessagesRealTime = async (ChattingId, getChatMessage) => {
  try {
    const subscriber = firestore()
      .collection('messages')
      .doc(ChattingId)
      .collection('MessageLists')
      .orderBy('createdAt')
      .onSnapshot(querysnapshot => {
        const allmessages = querysnapshot.docs.map(item => {
          return {...item._data, createdAt: item._data.createdAt};
        });
        getChatMessage(allmessages);
      });
  } catch (error) {
    console.error('Error while getting messages:', error);
  }
};

export const deleteMessage = async (messageId, chatId) => {
  firestore()
    .collection('messages')
    .doc(chatId)
    .collection('MessageLists')
    .doc(messageId)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
};

export const updateMessage = async (id, chatId, message) => {
  console.log(
    'In firebase fns    updateMessage called 💎💎💎 ',
    id,
    chatId,
    message,
  );

  firestore()
    .collection('messages')
    .doc(chatId)
    .collection('MessageLists')
    .doc(id)
    .update({
      message: message,
    });
};

export const sendFCMMessage = async (usertoken, userName, userPhone) => {
  const data = JSON.stringify({
    data: {},
    notification: {
      body: `Click to Chat ${userName}`,
      title: `${userPhone} is online now`,
    },
    to: usertoken,
  });

  const config = {
    method: 'POST',
    headers: {
      Authorization:
        'key=AAAAV4zOXww:APA91bHUoMZY7aLmFzDoxh1l98CpvDdEmB28K79A1ktShkNAj9RWVfF4fgSTDzCUGyUv_vcpoul2AF4qpV6SqXZ03dcU4pMhKbw49QXqpywTywrXTH6Eq2TrijDrL1TKUqV2alXveJac',
      'Content-Type': 'application/json',
    },
    body: data,
  };

  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', config);
    const responseData = await response.json();
    console.log('FCM message sent successfully:', responseData);
  } catch (error) {
    console.error('Error sending FCM message:', error);
  }
};

export const OnlineInformation = async (myToken, userName, userPhone) => {
  const otherUsersToken = await getToken(myToken);
  if (otherUsersToken) {
    otherUsersToken.map(usertoken =>
      sendFCMMessage(usertoken, userName, userPhone),
    );
  }
};

export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();

  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
};

export const DisplayNotification = async remoteMessage => {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      color: '#4caf50',
      actions: [
        {
          title: '<h6>Mark as Read</h6> &#x2714 ',
          pressAction: {id: 'mark-as-read'},
        },
        {
          title: '<h6 style="color:#8B4513;"> View  &#128065;</h6>',
          pressAction: {id: 'View'},
        },
      ],
    },
  });
};

export default createUser;
