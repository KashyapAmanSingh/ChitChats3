/* eslint-disable prettier/prettier */
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// In App.js in a new project

import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//

function HomeScreen() {
  const [randomId, setRandomId] = useState('');

  const navigation = useNavigation();

  const generateRandomId = () => {
    return uuidv4();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '90%'}}>
        <TextInput
          style={{borderWidth: 1, borderColor: 'black', marginBottom: 20}}
          value={randomId}
          onChangeText={text => setRandomId(text)}
        />
        <Button
          title="join meeting"
          onPress={() => {
            //
            if (randomId.length > 5) {
              navigation.navigate('ZegoCall', {
                callId: randomId,
              });
            } else {
              //
              alert('Enter Valid Id');
            }
          }}
        />
        <TouchableOpacity
          style={{marginTop: 30, alignItems: 'center'}}
          onPress={() => {
            const id = generateRandomId();
            setRandomId(id);
          }}>
          <Text style={{color: 'blue'}}>Generate Meeting Id</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
