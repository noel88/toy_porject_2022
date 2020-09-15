import React, {createRef, useEffect, useState} from 'react';
import {Alert, StatusBar, StyleSheet, View, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Editor from './editor';
import {Button} from 'react-native-paper';

export default function Details({route, navigation: {goBack}}) {
  const {key} = route.params;
  const [data, setData] = useState('');

  const [richText, setRichText] = useState(() => createRef());

  useEffect(() => {
    loadedData().then((r) => {
      return r;
    });
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
    Alert.alert('수정 완료 :)');
    goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Editor content={richText} loaded={data} />
      <Button mode="outlined" color={'black'} onPress={() => update()}>
        Comment의 내용을 수정합니다 :)
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
