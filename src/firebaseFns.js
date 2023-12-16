/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {removeId} from './AsyncStorageUtility/AsyncUtility';
import {onSnapshot} from 'firebase/firestore';
import {onUserLogout, removeUserInfo} from './VideoCall/ZegoUtillity';

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

export const signOut = async () => {
  try {
    await auth().signOut();
    removeId('UserId');
    onUserLogout();
    removeUserInfo();
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

export const createUser = async (
  collectionDocsName,
  uuid,
  name,
  email,
  phone,
) => {
  try {
    const db = firestore();

    await db.collection('users').doc(collectionDocsName).set({
      id: uuid,
      name: name,
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

export default createUser;
