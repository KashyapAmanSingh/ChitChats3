/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ReadCollections, signOut} from '../firebaseFns';
import {getId} from '../AsyncStorageUtility/AsyncUtility';
import UserSliceUi from './UserSliceUi';
import {useNavigation} from '@react-navigation/native';
import {getUserInfo, onUserLogin} from '../VideoCall/ZegoUtillity';
import InternetMode from '../InternetMode/InternetMode';

const UserLists = props => {
  const [userList, setUserList] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [personalIds, setPersonalIds] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Simulated auto login if there is login info cache
    getUserInfo().then(info => {
      if (info) {
        try {
          onUserLogin(info.userIDZego, info.userNameZego);
        } catch (error) {
          console.log(error, error.message);
        }
      } else {
        navigation.navigate('SignInForm');
      }
    });
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const {userList: users, userId} = await ReadCollections('users');
      setUserList(users);
      setUserIds(userId);
      const UserId = await getId('UserId');
      setPersonalIds(UserId);
    };

    fetchUsers();
  }, []);

  const SignOuthandler = () => {
    signOut(navigation);
  };
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  return (
    <>
      <View style={styles.UserListsUi}>
        <FlatList
          data={userList}
          keyExtractor={user => user.id}
          renderItem={({item, index}) => (
            <UserSliceUi
              user={item}
              userIds={userIds}
              index={index}
              personalIds={personalIds}
            />
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={SignOuthandler}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>Sign Out</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={tokenhand}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          get token
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          get token
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          Click here to copy to Clipboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fetchCopiedText}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          View copied text
        </Text>
      </TouchableOpacity> */}
      <InternetMode />
    </>
  );
};

const styles = StyleSheet.create({
  UserListsUi: {
    flex: 1.8,
    backgroundColor: 'white',
    marginTop: 1,
    flexWrap: 'wrap',
  },
  button: {
    flex: 0.1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#474FB6',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    height: 40,
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 27,
    fontWeight: 'bold',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserLists;
