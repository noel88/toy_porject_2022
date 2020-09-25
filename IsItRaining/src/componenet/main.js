import Onboarding from 'react-native-onboarding-swiper';
import {
  Image,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Alert,
  View,
} from 'react-native';
import React, {useState} from 'react';

const permissions = async () => {
  const grantedLocation = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location',
      message: 'Location 엑세스 허용하시겠습니까?',
      buttonNeutral: '나중에 물어보기',
      buttonNegative: '아뇨',
      buttonPositive: '예',
    },
  );

  if (grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('location permission');
  } else {
    console.log('location permission denied');
  }
};

const Main = ({navigation}) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate('Details')}
      onSkip={() => console.log('skip')}
      pages={[
        {
          backgroundColor: 'lightgray',
          image: (
            <Image source={require('../assets/rain.png')} style={styles.icon} />
          ),
          title: '오늘 비오니?',
          subtitle: '오늘 하루 비가 오는지 미리 확인하세요.',
        },
        {
          backgroundColor: 'lightgray',
          image: (
            <Image
              source={require('../assets/location.png')}
              style={styles.icon}
            />
          ),
          title: '현재 위치를 확인합니다.',
          subtitle: (
            <Button
              title={'권한 확인'}
              style={styles.btn}
              onPress={() => permissions()}
            />
          ),
        },
        {
          backgroundColor: 'lightgray',
          image: (
            <Image
              source={require('../assets/umbrella.png')}
              style={styles.icon}
            />
          ),
          title: '우산을 챙기세요!',
          subtitle: '강수량 50% 이상시 알림을 보내드립니다',
        },
        {
          backgroundColor: 'lightgray',
          image: (
            <Image
              source={require('../assets/alarm-clock.png')}
              style={styles.icon}
            />
          ),
          title: '출근 전에 알림을 확인해주세요',
          subtitle: '지정 시간에 알림을 받을 수 있습니다.',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 150,
    height: 150,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default Main;
