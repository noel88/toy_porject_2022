import React from 'react';
import Main from './src/componenet/main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NotiTimeSetting from './src/componenet/notiTimeSetting';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={NotiTimeSetting}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
