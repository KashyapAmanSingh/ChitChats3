/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
 } from 'react-native';
import {ReadCollections, signOut} from '../firebaseFns';
import {getId} from '../AsyncStorageUtility/AsyncUtility';
import UserSliceUi from './UserSliceUi';
import {useNavigation} from '@react-navigation/native';
import {getUserInfo, onUserLogin} from '../VideoCall/ZegoUtillity';
import InternetMode from '../InternetMode/InternetMode';
import ShimmerUiUserList, {ShimmerUiButton} from '../ShimmerUi/ShimmerUi';

const UserLists = props => {
  const [userList, setUserList] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [personalIds, setPersonalIds] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);

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
      setLoadingStatus(true);
    };

    fetchUsers();
  }, []);

  const SignOuthandler = () => {
    signOut(navigation);
  };

  return (
    <>
      <View style={styles.UserListsUi}>
        {loadingStatus ? (
          <FlatList
            data={[1, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={user => user.id}
            renderItem={({item, index}) => <ShimmerUiUserList key={index} />}
          />
        ) : (
          // Render your actual content here
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
        )}
      </View>
      {loadingStatus ? (
        <ShimmerUiButton />
      ) : (
        <TouchableOpacity style={styles.button} onPress={SignOuthandler}>
          <Text style={[styles.buttonText, styles.SignInFormText]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      )}

      {loadingStatus ? (
        <ShimmerUiButton />
      ) : (
        // Render your actual content here
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CameraPhoto')}>
          <Text style={[styles.buttonText, styles.SignInFormText]}>
            CameraPhoto
          </Text>
        </TouchableOpacity>
      )}

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
