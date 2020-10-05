import React, {Component, useEffect, useState} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';
import PushNotification from 'react-native-push-notification';

const NotiTimeSetting = () => {
  const [date, setDate] = useState(Date.now());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locationKey, setLocationKey] = useState(0);
  const [rainProbability, setRainProbability] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    const key = '';

    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&language=ko&q=${latitude},${longitude}&details=true&toplevel=false`,
    )
      .then((value) => value.json())
      .then((value) => setLocationKey(value.Details.CanonicalLocationKey));

    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${key}&language=ko&details=true&metric=false`,
    )
      .then((value) => value.json())
      .then((value) => {
        console.log(value);
        setRainProbability(value.DailyForecasts[0].Day.RainProbability);
      });

    if (rainProbability < 50) {
      PushNotification.cancelAllLocalNotifications();
    }

    const messages = [
      '강수 확률이 50%이상이에요! 우산을 꼭 챙기세요',
      '오늘 비가 올수도 있어요, 우산 필수!',
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];

    PushNotification.localNotificationSchedule({
      /* Android Only Properties */
      vibrate: true,
      vibration: 300,
      priority: 'hight',
      visibility: 'public',
      importance: 'hight',

      /* iOS and Android properties */
      message, // (required)
      playSound: true,
      number: 1,
      actions: '["OK"]',
      repeatType: 'day',
      date: new Date(date),
    });
  }, [date, latitude, locationKey, longitude, rainProbability]);

  const onChange = (event) => {
    setDate(event.nativeEvent.timestamp);
  };

  return (
    <SafeAreaView>
      <View>
        {show && (
          <DateTimePicker
            testID="timePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotiTimeSetting;
