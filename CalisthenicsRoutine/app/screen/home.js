import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <View style={styles.item1}>
            <Text style={styles.leftTitle}>Left Area</Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.rightTitle}>Right Area</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Hiiiz</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  item1: {
    flex: 1,
  },
  item2: {
    flex: 1,
  },
  leftTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    // alignSelf: 'flex-end',
    marginLeft: 15,
  },
  rightTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    alignSelf: 'flex-end',
    marginRight: 15,
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
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    // fontWeight: 'bold',
    flex: 5,
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
