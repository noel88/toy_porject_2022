import React, {Component, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Alert,
  View,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeoLocationWeather from './geoLocationWeather';

const NotiTimeSetting = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Notification Time Setting</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotiTimeSetting;
