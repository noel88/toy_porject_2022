import React, {Component, createRef, useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Editor from './editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const strikethrough = require('../assets/strikethrough.png');

export default function Comment() {
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
      Alert.alert(
        '기존에 저장되어진 데이터가 있습니다. 오늘은 더이상 저장할수 없습니다.',
      );
      return false;
    } else {
      await AsyncStorage.setItem(key, html);
      Alert.alert('오늘 하루에 Comment를 달았습니다 :)');
    }
    richText.current.setContentHTML('');
    // Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.iconContainer}>
          <Text style={styles.title}>Memo</Text>
          <TouchableWithoutFeedback
            style={{marginRight: 15}}
            onPress={() => save()}>
            <Icon color="gray" size={30} name="content-save-outline" />
          </TouchableWithoutFeedback>
        </View>
        <Editor content={richText} />
      </SafeAreaView>
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
    fontSize: 24,
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
