import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const strikethrough = require('../assets/strikethrough.png');

class Memo extends Component {
  richText = React.createRef();

  constructor(props) {
    super(props);
  }

  getTimeStamp() {
    let d = new Date();
    let s =
      this.leadingZeros(d.getFullYear(), 4) +
      '-' +
      this.leadingZeros(d.getMonth() + 1, 2) +
      '-' +
      this.leadingZeros(d.getDate(), 2);

    return s;
  }

  leadingZeros(n, digits) {
    let zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) {
        zero += '0';
      }
    }
    return zero + n;
  }

  async save() {
    let html = await this.richText.current?.getContentHtml();
    let key = this.getTimeStamp();
    console.log(AsyncStorage.getItem(key));
    if (await AsyncStorage.getItem(key)) {
      alert(
        '기존에 저장되어진 데이터가 있습니다. 오늘은 더이상 저장할수 없습니다.',
      );
      return false;
    }
    await AsyncStorage.setItem(key, html);
    console.log('saveData: ', html);
    alert('Success');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.iconContainer}>
          <Text style={styles.title}>Memo</Text>
          <TouchableWithoutFeedback
            style={{marginRight: 15}}
            onPress={() => this.save()}>
            <Icon color="gray" size={30} name="content-save-outline" />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.scroll} keyboardDismissMode={'none'}>
          <RichEditor
            ref={this.richText}
            placeholder={
              '하단의 에디터를 이용하여 오늘 하루 메모를 작성하세요😀'
            }
            setContentHTML={() => this.save()}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            editor={this.richText}
            iconSize={40}
            actions={[
              ...defaultActions,
              actions.setStrikethrough,
              actions.heading1,
              actions.heading2,
              actions.heading3,
            ]}
            iconMap={{
              [actions.setStrikethrough]: strikethrough,
              [actions.heading1]: ({tintColor}) => (
                <Text style={[styles.tib]}>H1</Text>
              ),
              [actions.heading2]: ({tintColor}) => (
                <Text style={[styles.tib]}>H2</Text>
              ),
              [actions.heading3]: ({tintColor}) => (
                <Text style={[styles.tib]}>H3</Text>
              ),
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
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
  },
  saveBtn: {},
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

export default Memo;
