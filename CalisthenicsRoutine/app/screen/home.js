import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BtnComponent from '../components/btnComponent';
import CountComponent from '../components/countComponent';
import {Card} from 'react-native-shadow-cards';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      count: 1, // Set
      min: 10, // 쉬는 시간
      time: 20, // 초기 횟수 정하기
      arr: this.setCountFunc,
      set: 20, // 시작 Set 횟수
      isCount: true,
    };
  }

  setCountFunc = () => {
    let arr = [];
    let count = 0;
    for (let i = 0; i < this.state.time; i++) {
      if (i % 2 == 0) {
        if (i == 0) {
          arr[i] = this.state.time;
        } else {
          arr[i] = this.state.time - count + 1;
        }
      } else {
        if (count == 0) {
          ++count;
        }
        arr[i] = count;
        ++count;
      }
    }
    return arr;
  };

  onCompleteAction = (bool) => {
    this.setState({isStart: bool});
    if (!bool) {
      this.setState({count: ++this.state.count});
      if (this.state.count <= 20) {
        this.setState({set: this.state.arr()[this.state.count - 1]});
      } else {
        this.setState({isCount: false});
      }
    }
  };

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.contentContainer}>
            <View style={styles.item1}>
              <Text style={styles.leftTitle}>Calisthenics</Text>
            </View>
            <View style={styles.item2}>
              <Icon
                style={styles.rightTitle}
                name={'calendar-month'}
                size={30}
                color={'black'}
              />
            </View>
          </View>
          <View>
            <Image
              style={{width: width, height: 200}}
              source={require('../assets/sport.jpg')}
            />
          </View>
          <View style={styles.screen2}>
            <Card style={{padding: 10, margin: 10, height: 50}}>
              <Text style={styles.text}>상체 1일차</Text>
            </Card>
          </View>
        </SafeAreaView>
        <View style={styles.screen}>
          {this.state.isCount && (
            <View>
              <Text style={styles.text}>
                Set {this.state.count}, {this.state.set}회
              </Text>
            </View>
          )}
          {!this.state.isCount && (
            <View>
              <Text style={styles.text}>운동 종료</Text>
            </View>
          )}
          {!this.state.isStart && (
            <BtnComponent onCompleteAction={this.onCompleteAction} />
          )}
          {this.state.isStart && (
            <CountComponent
              playing={this.state.isStart}
              min={10}
              count={this.state.count}
              onCompleteAction={this.onCompleteAction}
            />
          )}
        </View>
      </View>
    );
  }
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    // alignSelf: 'flex-end',
    marginLeft: 15,
  },
  img: {
    // aspectRatio: 1.9,
    // resizeMode: 'contain',
    // width: 150,
    // alignItems: 'center',
    // height: 150,
    // flex: 1,
    // scale: 0.55,
  },
  rightTitle: {
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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    // fontWeight: 'bold',
    // flex: 5,
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
  screen: {
    // flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen2: {
    // flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
  },
});
