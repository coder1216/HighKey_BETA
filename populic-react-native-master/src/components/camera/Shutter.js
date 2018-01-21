import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import * as Progress from 'react-native-progress';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

function mapStateToProps(state) {
  return {
    markers: state.locationReducer.locs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

class Shutter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={takePicture}
        onLongPress={startRecording}
        onPressOut={stopRecording}
      >
        <Progress.Circle
          style={styles.progress}
          size={90}
          borderWidth={5}
          thickness={5}
          color={this.props.color}
          progress={this.props.progress}
          intermediate={this.props.indeterminate}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shutter);
