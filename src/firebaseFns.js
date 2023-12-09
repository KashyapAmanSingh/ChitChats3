/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {storeId} from './AsyncStorageUtility/AsyncUtility';
import {onSnapshot} from 'firebase/firestore';

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
      .get();
    const messagesList = messages.docs.map(doc => doc.data());
    console.log('Message data:😊😊😊😊😊        messageData', messagesList);

    return messagesList;
  } catch {
    console.log('Error while getting messages😊');
  }
};

export const getMessagesRealTime = async (ChattingId, getChatMessage) => {
  try {
    firestore()
      .collection('messages')
      .doc(ChattingId)
      .collection('MessageLists')
      .onSnapshot(documentSnapshots => {
        documentSnapshots.forEach(documentSnapshot => {
          getChatMessage(documentSnapshot.data());
        });
      });
  } catch (error) {
    console.error('Error while getting messages:', error);
  }
};

// export const getMessages = async ChatId => {
//    try {
//     const db = firestore();

//     // Reference to the specific document
//     const messageRef = db
//       .collection('messages')
//       .doc(ChatId)
//       .collection('MessageLists');

//     // Get the document snapshot
//     const docSnapshot = await messageRef.get();

//     // Check if the document exists
//     if (docSnapshot.exists) {
//       // Access the data within the document
//       const messageData = docSnapshot.data();
//       console.log('Message data:😊😊😊😊😊        messageData', messageData);
//       return messageData;
//     } else {
//       console.log('Document does not exist');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error getting message:', error);
//     throw error;
//   }
// };

export default createUser;
