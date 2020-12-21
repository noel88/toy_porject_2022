import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {Component} from 'react';

export default class BtnComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: this.props.playing,
      min: this.props.min,
    };
  }

  childComplete = (bool) => {
    this.props.onCompleteAction(bool);
  };

  render() {
    return (
      <TouchableOpacity
        style={btnStyles.roundButton}
        onPress={() => this.childComplete(true)}>
        <Icon name={'square'} size={55} color={'black'} />
      </TouchableOpacity>
    );
  }
}

const btnStyles = StyleSheet.create({
  roundButton: {
    // marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
});
