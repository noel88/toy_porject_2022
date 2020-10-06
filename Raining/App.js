import React, {useEffect} from 'react';
import {Platform} from 'react-native';

import Main from './app/componenet/main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NotiTimeSetting from './app/componenet/notiTimeSetting';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundJob from 'react-native-background-job';

const Stack = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   console.log('useEffect');
  //   async function startService() {
  //     console.log('startService');
  //     if (Platform.OS !== 'android') {
  //       console.log('Only Android platform is supported');
  //       return;
  //     }
  //     if (Platform.Version >= 26) {
  //       const channelConfig = {
  //         id: 'ForegroundServiceChannel',
  //         name: 'Notification Channel',
  //         description: 'Notification Channel for Foreground Service',
  //         enableVibration: false,
  //         importance: 2,
  //       };
  //       await VIForegroundService.createNotificationChannel(channelConfig);
  //     }
  //     const notificationConfig = {
  //       id: 3456,
  //       title: 'Foreground Service',
  //       text: 'Foreground service is running',
  //       icon: 'ic_notification',
  //       priority: 0,
  //     };
  //     if (Platform.Version >= 26) {
  //       notificationConfig.channelId = 'ForegroundServiceChannel';
  //     }
  //     await VIForegroundService.startService(notificationConfig);
  //   }
  //   startService();
  // }, []);

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
