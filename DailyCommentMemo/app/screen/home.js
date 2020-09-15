import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';

import {Avatar, Button, Card, IconButton, Paragraph} from 'react-native-paper';

let list = new Array();

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

export default function Home({navigation}) {
  const [app, setApp] = useState([]);
  const [showTheNotice, setShowTheNotice] = useState(false);

  useEffect(() => {
    view();
  });

  const show = () => {
    setShowTheNotice(true);
    console.log('공지 감추기 : ', showTheNotice);
  };

  const view = () => {
    let list = new Array();
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];
          list.push({title: key, subTitle: value});
        });
        setApp(list);
      });
    });
  };

  const remove = (key) => {
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
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Home</Text>
        {!showTheNotice && (
          <Card style={styles.card}>
            <Card.Title
              title="Daily Comment Comment"
              subtitle="환영합니다! :)"
              left={(props: any) => <Avatar.Icon {...props} icon="folder" />}
              right={(props: any) => (
                <IconButton
                  {...props}
                  icon="close"
                  onPress={() => {
                    show();
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
          data={app}
          // data={dummy}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(rowData, rowMap) => (
            <TouchableHighlight
              style={styles.rowFront}
              onPress={() =>
                navigation.navigate('Details', {
                  key: rowData.item.title,
                })
              }>
              <Card style={styles.card}>
                <Card.Title
                  title={rowData.item.title}
                  subtitle={
                    rowData.item.subTitle
                      ? rowData.item.subTitle.replace(/(<([^>]+)>)/gi, ' ')
                      : ''
                  }
                />
              </Card>
            </TouchableHighlight>
          )}
          renderHiddenItem={(rowData, rowMap) => (
            <TouchableOpacity
              onPress={() => remove(rowData.item.title)}
              style={[styles.backRightBtn, styles.backRightBtnLeft]}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          )}
          leftOpenValue={0}
          rightOpenValue={-70}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              rowMap[rowKey] ? rowMap[rowKey].closeRow() : null;
            }, 2500);
          }}
          onRowClose={() => console.log('close')}
        />
      </SafeAreaView>
    </View>
  );
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
