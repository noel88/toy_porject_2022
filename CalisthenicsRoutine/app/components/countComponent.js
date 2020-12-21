import {StyleSheet, Animated, Alert} from 'react-native';
import React, {Component} from 'react';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

export default class CountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: this.props.playing,
      min: this.props.min,
      count: this.props.count,
    };
  }

  childComplete = (bool) => {
    this.props.onCompleteAction(bool);
  };

  render() {
    return (
      <CountdownCircleTimer
        size={150}
        isPlaying={this.state.isPlaying}
        duration={this.state.min}
        onComplete={() => this.childComplete(false)}
        colors={[
          ['#004777', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}>
        {({remainingTime, animatedColor}) => (
          <Animated.Text style={{color: animatedColor, fontSize: 40}}>
            {remainingTime}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    );
  }
}
