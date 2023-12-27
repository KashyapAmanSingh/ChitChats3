/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
const InternetMode = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const status = isConnected ? 'Online' : 'Offline';

  return (
    <View
      style={[
        isConnected ? styles.bgColorOnline : styles.bgColorOffline,
        styles.container,
      ]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgColorOnline: {
    backgroundColor: '#2534FF',
  },
  bgColorOffline: {
    backgroundColor: '#697754',
  },
  statusText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default InternetMode;
