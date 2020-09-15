import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';

import {Avatar, Button, Card, IconButton, Paragraph} from 'react-native-paper';

let list = new Array();

let dummy = [
  {
    title: '2020-09-01',
    subTitle:
      '첫번째 하루를 작성한다, 오늘은 너무 즐거운 날이다. 항상 이렇게만 행복했음 좋겠다.🐥',
  },
  {
    title: '2020-09-02',
    subTitle: '매사에 늘 감사하자. ',
  },
  {
    title: '2020-09-03',
    subTitle: '오늘 해야할 일 [고양이랑 놀기, 고양이 화장실 청소하기]',
  },
  {
    title: '2020-09-04',
    subTitle: '쇼핑목록 정리해서 장바구니에 꼭 넣어놓기!!!',
  },
  // {
  //   title: '2020-09-05',
  //   subTitle: '첫번째 하루를 작성하는 중입니다.',
  // },
  // {
  //   title: '2020-09-06',
  //   subTitle: '첫번째 하루를 작성하는 중입니다.',
  // },
  // {
  //   title: '2020-09-07',
  //   subTitle: '첫번째 하루를 작성하는 중입니다.',
  // },
  // {
  //   title: '2020-09-08',
  //   subTitle: '첫번째 하루를 작성하는 중입니다.',
  // },
  // {
  //   title: '2020-09-09',
  //   subTitle: '첫번째 하루를 작성하는 중입니다.',
  // },
  // {
  //   title: '2020-09-10',
  //   subTitle: '첫번째 하루를 작성하는 중입니다.',
  // },
];

export default function Home({navigation}) {
  const [app, setApp] = useState([]);
  const [showTheNotice, setShowTheNotice] = useState(false);

  useEffect(() => {
    view();
  });

  const show = () => {
    setShowTheNotice(true);
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
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem(key);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.title}>One Day One Record</Text>
        {!showTheNotice && (
          <Card style={styles.card}>
            <Card.Title
              title="하루 하나씩"
              subtitle="환영합니다! 🐤 🐣 🐥"
              left={(props: any) => <Avatar.Icon {...props} icon="file" />}
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
                🌜 "하루 하나씩"은 하루에 한번씩만 작성할 수 있습니다. {'\n'}
                🌜 하루의 기록을 나만의 스타일로 작성하세요! {'\n'}👆 기록
                클릭시 : 상세보기 {'\n'}❌ 기록 왼쪽으로 밀기 : 삭제
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
              <Text style={styles.backTextWhite}>삭제</Text>
            </TouchableOpacity>
          )}
          leftOpenValue={0}
          rightOpenValue={-70}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              rowMap[rowKey] ? rowMap[rowKey].closeRow() : null;
            }, 2500);
          }}
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginLeft: 15,
  },
  backTextWhite: {
    color: '#000',
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
    backgroundColor: '#f55858',
    right: 0,
  },
});
