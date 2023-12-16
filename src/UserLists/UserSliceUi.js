/* eslint-disable prettier/prettier */
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
    });
  };
   const personalProfileIndex = userIds.indexOf(personalIds);
  if (personalProfileIndex === index) {
    return;
  }

  return (
    <TouchableOpacity onPress={handleRouteSend}>

      <View style={styles.userItem}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/ProfileIcon.gif')} />
        </View>

        <Text style={styles.userItemText}>{user.name.slice(0, 8) }...</Text>
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
    height: 80,
    width: 410,
  },
  iconContainer: {
    marginRight: 0,
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
