import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
  Switch,
} from 'react-native-paper';

let list = new Array();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: [],
      showTheNotice: false,
    };
  }

  separator = () => {
    return <View style={{height: 10, backgroundColor: '#fff'}} />;
  };

  show() {
    this.setState({showTheNotice: true});
    console.log('공지 감추기 : ', this.state.showTheNotice);
  }

  view() {
    let list = new Array();
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];
          list.push({title: key, subTitle: value});
        });
        this.setState({app: list});
      });
    });
  }

  componentDidMount() {
    this.view();
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.view();
    });
  }

  remove(key) {
    Alert.alert(
      '메모를 삭제합니다.',
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
            console.log('Delete TODO');
            AsyncStorage.removeItem(key);
            setTimeout(() => this.view(), 701);
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    let dummy = [
      {
        title: '2020-09-01',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-02',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-03',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-04',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-05',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-06',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-07',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-08',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-09',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
      {
        title: '2020-09-10',
        subTitle: '첫번째 하루를 작성하는 중입니다.',
      },
    ];
    let notice = this.state.showTheNotice;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        {!this.state.showTheNotice && (
          <Card style={styles.card}>
            <Card.Title
              title="Daily Comment Memo"
              subtitle="환영합니다! :)"
              left={(props: any) => <Avatar.Icon {...props} icon="folder" />}
              right={(props: any) => (
                <IconButton
                  {...props}
                  icon="close"
                  onPress={() => {
                    this.show();
                  }}
                />
              )}
            />
            <Card.Content>
              <Paragraph>
                메모 어플은 하루에 한번씩만 작성할 수 있습니다. 하루의 Comment를
                달아보세요!
              </Paragraph>
            </Card.Content>
          </Card>
        )}
        <SwipeListView
          useFlatList={true}
          data={this.state.app}
          // data={dummy}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(rowData, rowMap) => (
            <TouchableHighlight style={styles.rowFront}>
              <Card style={styles.card}>
                <Card.Title
                  title={rowData.item.title}
                  subtitle={rowData.item.subTitle.replace(/(<([^>]+)>)/gi, ' ')}
                />
              </Card>
            </TouchableHighlight>
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <TouchableOpacity
              onPress={() => this.remove(rowData.item.title)}
              style={[styles.backRightBtn, styles.backRightBtnLeft]}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          )}
          leftOpenValue={0}
          rightOpenValue={-70}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              rowMap[rowKey].closeRow();
            }, 700);
          }}
          onRowClose={() => console.log('close')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 70,
  },
  text: {
    alignItems: 'flex-start',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  subText: {
    alignItems: 'flex-start',
    fontSize: 12,
    marginLeft: 45,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 70,
  },
  backRightBtnLeft: {
    backgroundColor: 'lightgray',
    right: 0,
  },
});

export default Home;
