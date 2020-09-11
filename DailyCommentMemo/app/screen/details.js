import React, {createRef, useEffect, useState} from 'react';
import {Alert, StatusBar, StyleSheet, View, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Editor from './editor';

export default function Details({route, navigation}) {
  const {key} = route.params;
  const [data, setData] = useState('');

  const [richText, setRichText] = useState(() => createRef());

  useEffect(() => {
    loadedData();
  });

  const loadedData = async () => {
    const load = await AsyncStorage.getItem(key);
    console.log('data', load);
    setData(load);
  };

  const update = async () => {
    let html = await richText.current?.getContentHtml();
    console.log('Save : ', html);
    await AsyncStorage.setItem(key, html);
    Alert.alert('오늘 하루의 Comment를 수정했습니다 :)');
    richText.current.setContentHTML('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Editor content={richText} loaded={data} />
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
