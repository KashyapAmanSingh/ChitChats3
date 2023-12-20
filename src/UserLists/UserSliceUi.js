/* eslint-disable prettier/prettier */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CallingBtn from '../CallingBtn/voiceCallingBtn';
const UserSliceUi = ({user, userIds, index, personalIds}) => {
  const navigation = useNavigation();
  const handleRouteSend = () => {
    navigation.navigate('ChatUI', {
      userId: userIds[index],
      userPhone: user.phone,
      userName: user.name,
      userStatus: user.status,
    });
  };
  console.log('profileImageUrl  profileImageUrl', user.profilePicture);
  const personalProfileIndex = personalIds
    ? userIds.indexOf(personalIds)
    : null;
  if (personalProfileIndex === index && personalProfileIndex !== null) {
    return;
  }

  return (
    <TouchableOpacity onPress={handleRouteSend}>
      <View style={styles.userItem}>
        <View style={styles.iconContainer}>
          {user.profilePicture && user.profilePicture !== '' ? (
            <Image
              style={styles.ImageProfileContainer}
              source={{uri: user.profilePicture}}
            />
          ) : (
            <Image
              style={styles.ImageProfileContainer}
              source={require('../assets/ProfileIcon.gif')}
            />
          )}

          <Text
            style={
              user.status === 'Online' ? styles.onlineDot : styles.OfflineDot
            }
          />
        </View>

        <Text style={styles.userItemText}>{user.name.slice(0, 8)}...</Text>
        <CallingBtn userID={user.phone} userName={user.name} />
      </View>
    </TouchableOpacity>
  );
};

export default UserSliceUi;

const styles = StyleSheet.create({
  userItem: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderTopWidth: 1,
    backgroundColor: 'white',
    height: 70,
    width: 410,
  },
  ImageProfileContainer: {
    height: 55,
    width: 55,
    // backgroundColor: 'red',
    borderColor: '#474FB6',
    borderWidth: 1,
    borderRadius: 50,
    paddingRight: 0,
  },

  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#99FF00',
    marginLeft: 7,

  },
  OfflineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#697754',
    marginLeft: 7,
  },
  iconContainer: {
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userItemText: {
    color: '#474FB6',
    fontSize: 26,
    marginHorizontal: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  Btncontainer: {flexDirection: 'row'},
  container: {
    backgroundColor: 'wheat',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
  },
});
