import React, {useState} from 'react';
import {BackHandler, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';
import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';

const NotiTimeSetting = () => {
  const [date, setDate] = useState(Date.now());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const backgroundJob = {
    jobKey: 'today',
    job: () => {
      PushNotification.cancelAllLocalNotifications();
      Geolocation.getCurrentPosition(
        (position) => {
          const key = '';
          let locationKey = '';
          let rainProbability = 0;
          console.log('TASK');

          fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&language=ko&q=${position.coords.latitude},${position.coords.longitude}&details=true&toplevel=false`,
          )
            .then((value) => value.json())
            .then((value) => {
              // console.log('locationKey: ', value);
              locationKey = value.Details.CanonicalLocationKey;
            });
          // 337169
          fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${key}&language=ko&details=true&metric=false`,
          )
            .then((value) => value.json())
            .then((value) => {
              rainProbability = value.DailyForecasts[0].Day.RainProbability;
            });

          if (rainProbability >= 50) {
            const messages = [
              '강수 확률이 50%이상이에요! 우산을 꼭 챙기세요',
              '오늘 비가 올수도 있어요, 우산 필수!',
              '우산을 꼭 들고 출근하세요!',
            ];
            const message =
              messages[Math.floor(Math.random() * messages.length)];

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
          }
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000},
      );
    },
  };

  BackgroundJob.register(backgroundJob);

  let backgroundSchedule = {
    jobKey: 'today',
    period: 432000000,
  };

  BackgroundJob.schedule(backgroundSchedule)
    .then(() => console.log('Success'))
    .catch((err) => console.err(err));

  const onChange = (event) => {
    setDate(event.nativeEvent.timestamp);
    BackHandler.exitApp();
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
