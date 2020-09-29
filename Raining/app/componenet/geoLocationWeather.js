import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Alert,
  View,
  Text,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import PushNotification from 'react-native-push-notification';

const localNotificationSchedule = (value) => {
  console.log('value', value);
};

export const GeoLocationWeather = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locationKey, setLocationKey] = useState(0);
  const [rainProbability, setRainProbability] = useState(0);

  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );

  const key = 'P2Aoygc0CpdAISLs1Ac6PoAU1oO4qKIo';

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
      setRainProbability(value.DailyForecasts[0].Day.RainProbability);
      console.log('W');
      console.log(value);
    });
  // .then((value) => console.log(value.DailyForecasts[0].Day.RainProbability));

  if (rainProbability > 50) {
    console.log(rainProbability, ' ::value');
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
    playSound: false,
    number: 1,
    actions: '["OK"]',

    // for production
    // repeatType: 'time', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // repeatTime: 3000,

    // test to trigger each miniute
    // repeatType: 'minute',
    // date: new Date(Date.now()),

    // test to trigger one time
    date: new Date(Date.now() + 20 * 1000),
  });
};

export default GeoLocationWeather;
