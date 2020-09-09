/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './app/config/router';
import SplashScreen from 'react-native-splash-screen';

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
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

export default MainScreen;
