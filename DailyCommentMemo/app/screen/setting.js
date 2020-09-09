import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from 'toggle-switch-react-native';

//TODO: Theme 설정
//Description: Light Mode, Dark Mode

//TODO: 데이터 모두 삭제하기
//Description: AsyncStorage All Delete

class Setting extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Setting</Text>
        <View style={styles.settingView}>
          <Text style={styles.subTitle}>Theme 변경</Text>
          <ToggleSwitch
            isOn={false}
            onColor="green"
            offColor="gray"
            label="테마를 변경할 수 있습니다."
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="large"
            onToggle={(isOn) => console.log('changed to : ', isOn)}
          />
        </View>
        <View style={styles.settingView}>
          <View style={styles.row}>
            <Text style={styles.subTitle}>데이터 전체를 삭제합니다.</Text>
            <Button title={'삭제'} onPress={() => console.log('전체 삭제')} />
          </View>
        </View>
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
