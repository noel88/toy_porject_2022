import React, {createRef, useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Editor from './editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

const strikethrough = require('../assets/strikethrough.png');

export default function Comment({navigation}) {
  const [richText, setRichText] = useState(() => createRef());

  useEffect(() => {
    richText.current.setContentHTML('');
  });

  const getTimeStamp = () => {
    let d = new Date();
    let s =
      leadingZeros(d.getFullYear(), 4) +
      '-' +
      leadingZeros(d.getMonth() + 1, 2) +
      '-' +
      leadingZeros(d.getDate(), 2);
    return s;
  };

  const leadingZeros = (n, digits) => {
    let zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) {
        zero += '0';
      }
    }
    return zero + n;
  };

  const save = async () => {
    let html = await richText.current?.getContentHtml();
    let key = getTimeStamp();
    if (await AsyncStorage.getItem(key)) {
      Alert.alert('오늘은 더 이상 기록을 저장할수 없어요 😅😂🤣 ');
      return false;
    } else {
      await AsyncStorage.setItem(key, html);
      Alert.alert('하루 하나씩 😉😊🙂🙃');
    }
    richText.current.setContentHTML('');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.iconContainer}>
          <Text style={styles.title}>Today is.... Record</Text>
          {/*<TouchableWithoutFeedback*/}
          {/*  style={{marginRight: 15}}*/}
          {/*  onPress={() => save()}>*/}
          {/*  <Icon color="gray" size={30} name="content-save-outline" />*/}
          {/*</TouchableWithoutFeedback>*/}
        </View>
      </SafeAreaView>
      <Editor content={richText} loaded={null} />
      <Button mode="outlined" color={'black'} onPress={() => save()}>
        오늘 하루의 기록을 등록할래요 🙃
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  tib: {
    textAlign: 'center',
    color: '#6e6d6d',
  },
});
