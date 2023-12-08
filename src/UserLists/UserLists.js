/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import {ReadCollections, signOut} from '../firebaseFns';
import UserListItem from './UserSliceUi';

const UserLists = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await ReadCollections('users');
      setUserList(users);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.UserListsUi}>
      <FlatList
        data={userList}
        keyExtractor={user => user.id}
        renderItem={({item}) => <UserListItem user={item} />}
      />

      {/* <View>
        <TouchableOpacity style={styles.button}>
          onPress={signOut}
          <Text style={styles.buttonText}>Sign out button</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  UserListsUi: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'red',

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
