import React, { Component } from 'react';
import {  View, StyleSheet, StatusBar, Text,
          Image, TouchableOpacity, TouchableHighlight, PanResponder,
          TouchableWithoutFeedback, Dimensions } from 'react-native';
import Camera from 'react-native-camera';
import MovToMp4 from 'react-native-mov-to-mp4';
//import ReactNativeEventEmitter from 'ReactNativeEventEmitter';
//import NodeHandle from 'NodeHandle';

//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/postAction'
import * as Progress from 'react-native-progress';
//import renderIf from './renderIf';

import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    //height: Dimensions.get('window').height,
    //width: Dimensions.get('window').width,
  },

  turn: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },

  shutter: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },

  progress: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

let media = [
  {
  "tempUrl" : "",
  "libUrl" : "",
},
];

let position = width / 2 + 59;

function mapStateToProps(state) {
  return {
    test: 'test'
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


class CameraView extends Component {

  static navigationOptions = {
    tabBarLabel: 'My Images',
    tabBarVisible: false,
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
     <Icon name="camera" size={15} style={{ color: tintColor }}/>
    ),
  };

  constructor(props) {
  super(props);

  this.camera = null;

  isRecording: false;

  //let videoPath = "Video";

  this.state = {
    progress: 0,
    indeterminate: true,
    bcolor: 'white',
    animated: true,
    camera: {
      aspect: Camera.constants.Aspect.fill,
      captureTarget: Camera.constants.CaptureTarget.disk,
      type: Camera.constants.Type.back,
      mirrorImage: false,
      audio: false,
      orientaton: Camera.constants.Orientation.auto,
      flashMode: Camera.constants.FlashMode.auto,
    },
  }

  takePicture = () => {
    this.camera.capture()
      //.then((data) => Actions.preview({data: data}))
      .then((data) => {
        console.log(data);
        //this.setState({ path: data.path});
        this.props.setPath(data.path)
        const { navigate } = this.props.navigation;
        navigate('Preview');
        //Actions.preview({path: data.path})
      })
      .catch(err => console.error(err));
}

  startRecording = () => {
    this.state.bcolor = 'red';
    this.animate();
    this.camera.capture({mode: Camera.constants.CaptureMode.video, audio: true, totalSeconds: 15})
      .then((data) => {
        //this.setState({ path: data.path});
        //videoPath = data.path;
        //var filename = "user_video";
        //alert("Testing...");
        //this.setState({ path: data.path});
        /*MovToMp4.convertMovToMp4(data.path, filename + ".mp4", function (results) {
          //Actions.previewVideo({path: results});
          console.log(results);
        });*/
        //alert(videoPath);
        //Actions.previewVideo({path: data.path});
        this.props.setPath(data.path)
        //this.props.setState({ path: data.path});
        //alert(data.path);
        const { navigate } = this.props.navigation;
        navigate('PreviewVideo');
      })
      .catch(err => console.error(err));
  }

  stopRecording = () => {
    this.state.bcolor = 'white';
    //let progress = 0;
    //this.setState({progress});
    //this.state.animated = false;
    clearTimeout(this.timer);
    clearInterval(this.interval);
    this.setState({
      intermediate: true
    });
    this.camera.stopCapture();
    console.log("Recording stopped.");
  }

  turnCamera = () => {
    let newCamera;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newCamera = front;
    } else if (this.state.camera.type === front) {
      newCamera = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newCamera,
      },
    });
  }

}

    animate() {
      let progress = 0;
      this.setState({ progress });
      var timer = setTimeout(() => {
        this.setState({ indeterminate: false});
        var interval = setInterval(() => {
          progress += 0.0045;
          if (progress > 1) {
            progress = 1;
          }
          this.setState({ progress });
        }, 50);
      }, 100);
    }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
      <StatusBar hidden={true} />
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        type={this.state.camera.type}
        captureTarget={this.state.camera.captureTarget}
        aspect={Camera.constants.Aspect.fill}
        onFocusChanged={() => {}}
        defaultTouchToFocus
        mirrorImage={this.state.mirrorImage} >
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 20, marginTop: 10, justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress= { () => goBack(null) }>
        <IonIcon name="ios-close" size={60} color="#FFFFFF" style={{backgroundColor: "transparent"}} />
        </TouchableOpacity>
        </View>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end', width: position}}>

          <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
            <TouchableOpacity style={styles.turn} onPressIn={turnCamera}>
              <IonIcon name="ios-reverse-camera-outline" size={65} color="#FFFFFF" style={{backgroundColor: "transparent"}} />

            </TouchableOpacity>

            <TouchableWithoutFeedback
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
              <Progress.Circle
              style={styles.progress}
              size={100}
              borderWidth={5}
              thickness={5}
              color={this.state.bcolor}
              progress={this.state.progress}
              intermediate={this.state.indeterminate}
              />
              </TouchableWithoutFeedback>

          </View>
        </View>
        </Camera>
        </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
