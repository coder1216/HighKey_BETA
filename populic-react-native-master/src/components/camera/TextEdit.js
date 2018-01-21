import React, { Component } from 'react';
import { StyleSheet, Animated, View, TextInput, Text, Dimensions } from 'react-native';
import PinchZoom from 'react-native-pinch-zoom-view';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/postAction';

export const { height, width } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    post: state.postReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({
  textField: {
    fontSize: 22,
    textAlign: 'left',
    flex: 0,
    color: 'white',
    backgroundColor: 'black',
    opacity: 0.5,
    textAlign: 'center',
    borderRadius: 10
  },

  animatedText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    position: 'absolute',
  },

  dragArea: {
    flex: 1,
    height: 100,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 200
  }
});

class TextEdit extends Component {
  constructor(props) {
    super(props);
  }

  renderDragable() {
    return (
      <View>
      {this.props.post.locText ?
      <Animated.View
        {...this.props.responder}
        style={[this.props.pan, styles.animatedText]}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontFamily: 'Avenir',
            padding: 5,
            backgroundColor: 'transparent',
            opacity: 1
          }}>
          {this.props.post.locText}
        </Text>
      </Animated.View>
      :
      <View/>
      }
      </View>
    );
  }

  renderTextInput() {
    return (
      <TextInput
        {...this.props}
        ref="locText"
        autoCorrect={false}
        maxLength={45}
        style={{
          fontSize: 22,
          textAlign: 'left',
          width: width,
          color: 'white',
          backgroundColor: 'black',
          opacity: 0.5,
          padding: 5,
          textAlign: 'center',
          borderRadius: 10
        }}
        scrollEnabled={false}
        value={this.props.post.locText}
        onChangeText={locText => this.props.setText(locText)}
        editable={this.props.hideKeypad}
        returnKeyType="done"
        autoFocus={true}
        blurOnSubmit={true}
        onSubmitEditing={this.props.handleDone}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 35, backgroundColor: 'transparent', position: 'absolute', top: height * 0.6}}>
        {this.props.typing ? (
          this.renderTextInput()
        ) : (
          <PinchZoom>{this.renderDragable()}</PinchZoom>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEdit);
