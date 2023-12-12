/* eslint-disable prettier/prettier */
import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CallingBtn = ({userID, userName}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.Btncontainer}>
        <Button
          title="VO"
          onPress={() => {
            if (userID && userName) {
              navigation.navigate('ZegoCall', {
                userID,
                userName,
                callType: 'Voice Call',
              });
            } else {
              alert('Enter Valid Id');
            }
          }}
        />
        <View style={{marginHorizontal: 10}} />
        <Button
          title="Vd"
          onPress={() => {
            if (userID && userName) {
              navigation.navigate('ZegoCall', {
                userID,
                userName,
                callType: 'VideoCall',
              });
            } else {
              alert('Enter Valid Id');
            }
          }}
        />
      </View>
    </View>
  );
};

export default CallingBtn;

const styles = StyleSheet.create({
  Btncontainer: {flexDirection: 'row' },
  container: {
    backgroundColor: 'wheat',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
  },
});
