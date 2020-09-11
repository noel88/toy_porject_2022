import React, {createRef, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

const strikethrough = require('../assets/strikethrough.png');

export default function Editor({content, loaded}) {
  return (
    <View>
      <ScrollView style={styles.scroll} keyboardDismissMode={'none'}>
        <RichEditor
          ref={content}
          placeholder={'하단의 에디터를 이용하여 오늘 하루 메모를 작성하세요😀'}
          initialContentHTML={loaded}
        />
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          editor={content}
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
