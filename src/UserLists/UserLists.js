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
import {
  OnlineInformation,
  ReadCollections,
  createToken,
  getToken,
  sendFCMMessage,
  signOut,
  tokenhandler,
  updateUser,
} from '../firebaseFns';
import {getId, storeId} from '../AsyncStorageUtility/AsyncUtility';
import UserSliceUi from './UserSliceUi';
import {useNavigation} from '@react-navigation/native';
import {getUserInfo, onUserLogin} from '../VideoCall/ZegoUtillity';

const UserLists = props => {
  const [userList, setUserList] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [personalIds, setPersonalIds] = useState('');
  const navigation = useNavigation();

  const tokenhand = async () => {
    // await messaging().registerDeviceForRemoteMessages();
    // const token = await messaging().getToken();
    // console.log('Token is htis here 💝💝💝💝💝💝💝💝💝💝',token);

    // const docsIDs = await getId('UserId');
    // updateUser(docsIDs);
    // const token = await tokenhandler();

    // if (token) {
    //   createToken(token);
    // }
    const myToken = await tokenhandler();
    if (myToken) {
      // const tokens=await  getToken(myToken);
      // console.log('Token is htis here🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅🐅',tokens);
    await  OnlineInformation(myToken, 'amsn', 'raman');
      // createToken('1222222222sdffsddsdfssdfsadfsldfsldfshufshdfsdfssdfsdfasfasjl')
    }
    // sendFCMMessage('ewGEj2FnSzenylAZYvTsNC:APA91bEPiWqk6SIKivh0kOZcYTHyihVGVMsBw4A8mj1ApxX1Abgb_Kgu-PMnKIBNzhFSBOcd7tJ4Ji3b4gL8dtSMxaxZDI592zDZ-d3mmGnmqrziXPyUl7IOMJ1zozC-eqtcyOV9q4J8')
  };

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
      <TouchableOpacity style={styles.button} onPress={tokenhand}>
        <Text style={[styles.buttonText, styles.SignInFormText]}>
          get token
        </Text>
      </TouchableOpacity>
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
