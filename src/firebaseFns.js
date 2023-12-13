/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {removeId, storeId} from './AsyncStorageUtility/AsyncUtility';
import {onSnapshot} from 'firebase/firestore';
import { onUserLogout } from './VideoCall/ZegoUtillity';

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
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
    throw error; // Rethrow the error to handle it at the calling location
  }
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  removeId('UserId');
  onUserLogout();
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
    // Access the Firestore database
    const db = firestore();

    // Add a new document with the specified ID
    const userRef = await db.collection('users').doc(collectionDocsName).set({
      id: uuid,
      name: name,
      phone: phone,
      email: email,
    });

    console.log('User added with ID: ', collectionDocsName);

    return collectionDocsName; // Return the specified document ID
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error; // Rethrow the error to handle it at the calling location
  }
};

export const ReadCollections = async collectionName => {
  const users = await firestore().collection(collectionName).get();
  // const user = await firestore().collection('Users').doc('ABC').get();

  const userList = users.docs.map(doc => doc.data());
  const userId = users.docs.map(doc => doc.id);
  return {userList, userId};
};
export const createMessage = async (
  uuid,
  message,
  ChatId,
  senderId,
  receiverId,
) => {
  try {
    // Access the Firestore database
    const db = firestore();

    const userRef = await db
      .collection('messages')
      .doc(ChatId)
      .collection('MessageLists')
      .doc(uuid)
      .set({
        ChatId: uuid,
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
