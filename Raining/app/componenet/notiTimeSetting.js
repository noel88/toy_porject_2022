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
  let message = `지금부터 매일 ${date} 시간이 되면 알람이 울립니다!`;
  const backgroundJob = {
    jobKey: 'today',
    job: () => {
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
          fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${key}&language=ko&details=true&metric=false`,
          )
            .then((value) => value.json())
            .then((value) => {
              rainProbability = value.DailyForecasts[0].Day.RainProbability;
            });

          const rainMessages = [
            '강수 확률이 50%이상이에요! 우산을 꼭 챙기세요',
            '오늘 비가 올수도 있어요, 우산 필수!',
            '우산을 꼭 들고 출근하세요!',
          ];

          const noneMessages = [
            '오늘은 우산이 필요 없어요',
            '우산 없는 화창한 하루 되어요!',
          ];

          if (rainProbability >= 50) {
            message =
              rainMessages[Math.floor(Math.random() * rainMessages.length)];
          } else {
            message =
              noneMessages[Math.floor(Math.random() * noneMessages.length)];
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
    allowExecutionInForeground: true,
    allowWhileIdle: true,
    // period: 216000000, //6시간
    // period: 108000000, //3시간
    period: 900000, //15분
  };

  BackgroundJob.schedule(backgroundSchedule)
    .then(() => console.log('Success'))
    .catch((err) => console.err(err));

  const onChange = (event) => {
    // if(event.type == "set") {
    //     //ok button clicked
    // } else {
    //     //cancel button clicked
    // }
    setDate(event.nativeEvent.timestamp);
    PushNotification.cancelAllLocalNotifications();
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
