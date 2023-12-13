/* eslint-disable prettier/prettier */
// import 'react-native-get-random-values';
// import {v4 as uuidv4} from 'uuid';

// In App.js in a new project

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {getUserInfo, onUserLogin} from './ZegoUtillity';

function HomeScreen({route, navigation}) {
  const [userID, setUserID] = useState('');
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);

  useEffect(() => {
    // Simulated auto login if there is login info cache
    getUserInfo().then(info => {
      if (info) {
        setUserID(info.userIDZego);
        onUserLogin(info.userIDZego, info.userNameZego);
      } else {
         navigation.navigate('SignInForm');
      }
    });
  }, []);
  const blankPressedHandle = () => {
    viewRef.current.blur();
  };
  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };

  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={styles.container}>
        <Text>Your user id: {userID}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={viewRef}
            style={styles.input}
            onChangeText={changeTextHandle}
            placeholder="Invitees ID, Separate ids by ','"
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={false}
            resourceID={'ChitChat_Zego'}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={true}
            resourceID={'ChitChat_Video_Call'}
          />
        </View>
        <View style={{width: 220, marginTop: 100}}>
          <Button
            title="Back To Login Screen"
            onPress={() => {
              navigation.navigate('SignInForm');
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});

// function HomeScreen() {
//   const [randomId, setRandomId] = useState('');

//   const navigation = useNavigation();

//   const generateRandomId = () => {
//     return uuidv4();
//   };

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <View style={{width: '90%'}}>
//         <TextInput
//           style={{borderWidth: 1, borderColor: 'black', marginBottom: 20}}
//           value={randomId}
//           onChangeText={text => setRandomId(text)}
//         />
//         <Button
//           title="join meeting"
//           onPress={() => {
//             //
//             if (randomId.length > 5) {
//               navigation.navigate('ZegoCall', {
//                 callId: randomId,
//                 userName: `Random${randomId}`,
//                 callType: 'VideoCall',
//               });
//             } else {
//               //
//               alert('Enter Valid Id');
//             }
//           }}
//         />
//         <TouchableOpacity
//           style={{marginTop: 30, alignItems: 'center'}}
//           onPress={() => {
//             const id = generateRandomId();
//             setRandomId(id);
//           }}>
//           <Text style={{color: 'blue'}}>Generate Meeting Id</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen
//           name="CallingScreen"
//           component={CallingScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default HomeScreen;
