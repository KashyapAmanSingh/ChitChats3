/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import {ReadCollections, signOut} from '../firebaseFns';
import {getId} from '../AsyncStorageUtility/AsyncUtility';
import UserSliceUi from './UserSliceUi';
import {useNavigation} from '@react-navigation/native';

const UserLists = props => {
  const [userList, setUserList] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [personalIds, setPersonalIds] = useState('');
  const navigation = useNavigation();
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
    navigation.navigate('Home');
    signOut();
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
    </>
  );
};

const styles = StyleSheet.create({
  UserListsUi: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 1,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'purple',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    height: 40,
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'red',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserLists;
