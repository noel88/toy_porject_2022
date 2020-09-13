import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Card, IconButton, Switch} from 'react-native-paper';

class Setting extends Component {
  constructor(props) {
    super(props);
  }

  remove() {
    Alert.alert(
      '메모를 전체 삭제합니다.',
      '삭제한 메모는 복구할 수 없습니다.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('전체 삭제');
            AsyncStorage.clear();
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>Setting</Text>
          <View>
            <Card style={styles.card}>
              <Card.Title
                title="Theme 변경"
                subtitle="다크 모드로 변경할 수 있습니다."
                right={() => <Switch value={false} />}
              />
            </Card>
            <Card>
              <Card.Title
                title="메모 전체 삭제"
                subtitle="삭제한 데이터는 복구할 수 없습니다."
                right={() => (
                  <IconButton
                    icon="trash-can"
                    size={45}
                    onPress={() => {
                      this.remove();
                    }}
                  />
                )}
              />
            </Card>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingView: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  input: {
    width: '100%',
    height: 45,
    padding: 10,
    color: '#000',
    borderRadius: 20,
    borderColor: 'gray',
    marginLeft: 10,
    marginRight: 5,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  searchBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
  },
});

export default Setting;
