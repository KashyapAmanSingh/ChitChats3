/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const UserListItem = ({user}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to ChatUI and send item.id
    navigation.navigate('ChatUI', {userId: user.id});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.userItem}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/ProfileIcon.gif')} />
        </View>
        <Text style={styles.userItemText}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

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

export default UserListItem;
