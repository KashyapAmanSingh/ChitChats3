/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ReadCollections} from '../firebaseFns';
import {getId} from '../AsyncStorageUtility/AsyncUtility';
import UserSliceUi from './UserSliceUi';

const UserLists = () => {
  const [userList, setUserList] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [personalIds, setPersonalIds] = useState('');
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

  return (
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
  );
};

const styles = StyleSheet.create({
  UserListsUi: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 1,
    flexWrap: 'wrap',
  },

  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserLists;
