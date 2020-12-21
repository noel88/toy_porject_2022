import {StyleSheet, Text, View, Button} from 'react-native';
import BtnComponent from './btnComponent';
import CountComponent from './countComponent';
import React, {Component} from 'react';
import {Card} from 'react-native-shadow-cards';

export default class PullUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      count: 1, // Set
      min: 10, // 쉬는 시간
      time: 10, // 초기 횟수 정하기
      arr: this.countAsc,
      set: 10, // 시작 Set 횟수
      isCount: true,
    };
  }

  countAsc = () => {
    let arr = [];
    for (let i = 0; i < this.state.time; i++) {
      arr[i] = i;
    }
    return arr;
  };

  countDesc = () => {
    let arr = [];
    for (let i = this.state.set; i > 0; i++) {
      arr[i] = i;
    }
    this.setState({arr: arr});
  };

  onCompleteAction = (bool) => {
    this.setState({isStart: bool});
    if (!bool) {
      this.setState({count: ++this.state.count});
      if (this.state.count <= 20) {
        this.setState({set: this.state.arr()[this.state.count - 1]});
      } else {
        this.setState({isCount: false});
        this.childComplete('end');
      }
    }
  };

  childComplete = (eventValue) => {
    this.props.pullUpComplete(eventValue);
  };

  render() {
    return (
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
        <Card style={{margin: 10}}>
          <Button
            onPress={() => {
              this.countDesc();
            }}
            title="중도 포기"
            color="#841584"
          />
        </Card>
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
