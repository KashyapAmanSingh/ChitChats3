/* eslint-disable prettier/prettier */
import {
  Alert,
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserSliceUi = ({user, userIds, index}) => {
  const navigation = useNavigation();
  const handleRouteSend = () => {
    navigation.navigate('ChatUI', {userId: userIds[index]});
  };
  return (
    <TouchableOpacity onPress={handleRouteSend}>
      <View style={styles.userItem}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/ProfileIcon.gif')} />
        </View>
        <Text style={styles.userItemText}>{user.name}</Text>
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
    borderBottomWidth: 6,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderTopWidth: 1,
    backgroundColor: 'white',
    height: 70,
    width: '100%',

    marginBottom: 0,
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
});
