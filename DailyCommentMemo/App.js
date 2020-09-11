/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Avatar, Button, Card, IconButton, Paragraph} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './app/config/router';
import SplashScreen from 'react-native-splash-screen';
import Details from './app/screen/details';

const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: 'Details',
          headerRight: () => (
            <Button
              icon="content-save-outline"
              mode="text"
              onPress={() => console.log('Pressed')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 60);
  }, []);
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

export default MainScreen;
