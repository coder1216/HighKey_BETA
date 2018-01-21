import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  BackHandler,
  ImageStore,
  ImageEditor,
  CameraRoll,
  ScrollView,
  TextInput,
  Keyboard,
  AsyncStorage,
  Platform,
  InteractionManager
} from 'react-native';
import Camera from 'react-native-camera';
import Shutter from '../../components/camera/Shutter';
import SpotList from '../../components/camera/SpotList';
import TextEdit from '../../components/camera/TextEdit';
import SendButtons from '../../components/camera/SendButtons';
//import ReactNativeEventEmitter from 'ReactNativeEventEmitter';
//import NodeHandle from 'NodeHandle';
import GL from 'gl-react';
import { Surface } from 'gl-react-native';
import ImageFilter from 'gl-react-imagefilters';
const { Image: GLImage } = require('gl-react-image');

import Swiper from 'react-native-swiper';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';
import PinchZoom from 'react-native-pinch-zoom-view';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import RNMediaEditor from 'react-native-media-editor';
import Permissions from 'react-native-permissions';
//import { captureRef } from 'react-native-view-shot';

import axios from 'axios';
import { SERVER } from '../../config/server';

// aeged: Important for exiting
import { NavigationActions } from 'react-navigation';

import { SaveMedia } from '../../modules/SaveMedia';
import { SendBack } from '../../modules/sendBack';

import renderIf from './renderIf';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/postAction';

import * as Progress from 'react-native-progress';

import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconCustom from '../../config/icons';

import { styles } from './styles';
import { filters } from './filters';

export const { height, width } = Dimensions.get('window');

var index = 0;
let position = width / 1.55;

function mapStateToProps(state) {
  return {
    token: state.userReducer.token,
    post: state.postReducer,
    spot: state.spotReducer,
    markers: state.locationReducer.locs,
    userLocation: state.locationReducer.userLocation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class CameraView extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Images',
    tabBarVisible: false,
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <IconCustom name="Camera-Icon" size={28} style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    //this.onBuffer = this.onBuffer.bind(this);

    this.camera = null;

    false;

    this.state = {
      isVideo: false,
      show: false,
      progress: 0,
      indeterminate: true,
      buttonColor: 'white',
      animated: true,
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
        captureQuality: Camera.constants.CaptureQuality["720p"],
        type: Camera.constants.Type.back,
        mirrorImage: false,
        audio: false,
        orientaton: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto
      },
      typing: false,
      editing: false,
      image64: '',
      interactionsComplete: false,
      sendUrl: null,
      speed: [
        { key: 0, speedRate: 1, rateText: 'x1' },
        { key: 1, speedRate: 1.5, rateText: 'x1.5' },
        { key: 2, speedRate: 2, rateText: 'x2' },
        { key: 3, speedRate: 0.2, rateText: 'x0.2' },
        { key: 4, speedRate: 0.5, rateText: 'x0.5' }
      ],
      pan: new Animated.ValueXY(),
      opened: true
    };

    takePicture = () => {
      /*this.setState({
        camera: {
          ...this.state.camera,
          captureQuality: Camera.constants.CaptureQuality.high
        }
      });*/
      this.camera
        .capture()
        .then(data => {
          this.props.setPath(data.path);
          this.setState({ editing: true });
        })
        .catch(err => console.error(err));
    };

    startRecording = () => {
      /*this.setState({
        camera: {
          ...this.state.camera,
          captureQuality: Camera.constants.CaptureQuality["720p"]
        }
      });*/
      this.state.buttonColor = 'red';
      this.animate();
      this.camera
        .capture({
          mode: Camera.constants.CaptureMode.video,
          audio: true,
          totalSeconds: 15
        })
        .then(data => {
          this.setState({ isVideo: true });
          this.props.setPath(data.path);
          this.state.buttonColor = 'white';
          let progress = 0;
          this.setState({ progress });
          clearInterval(this.interval);
          this.setState({ editing: true });
        })
        .catch(err => console.error(err));
    };

    stopRecording = () => {
      //this.state.buttonColor = 'white';
      //let progress = 0;
      //this.setState({ progress });
      //clearInterval(this.interval);
      this.camera.stopCapture();
      console.log('Recording stopped.');
    };

    turnCamera = () => {
      let newCamera;
      const { back, front } = Camera.constants.Type;

      if (this.state.camera.type === back) {
        this.setState({ mirrorImage: false });
        newCamera = front;
      } else if (this.state.camera.type === front) {
        this.setState({ mirrorImage: true });
        newCamera = back;
      }

      this.setState({
        camera: {
          ...this.state.camera,
          type: newCamera
        }
      });
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),

      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
      }
    });
  }

  componentDidMount() {

    Permissions.request('microphone').then(response => {
      console.log(response);
    });

    this.setState({ rateText: 'x1' });
    InteractionManager.runAfterInteractions(() => {
      this.setState({ interactionsComplete: true });
      console.log('test');
    });
    this.setState({ show: true });
  }

  animate = () => {
    let progress = 0;
    this.setState({ progress });
    this.interval = setInterval(() => {
      progress += 0.00385;
      if (progress > 1) {
        //progress = 1;
        progress = 0;
        //this.setState({ progress });
        //clearTimeout(this.timer);
        //clearInterval(this.interval);
      }
      this.setState({ progress });
    }, 50);
    //}, 100);
  };

  //IMAGE FUNCTIONS
  getSpots = () => {
    axios
      .get('http://35.176.212.147:3000/api/getOwnCommunityByUserId', {
        user_id: 1
      })
      .then(function(response) {
        console.log('New objects: ', response.data);
      })
      .catch(function(error) {
        console.log('Could not get objects: ', error.response);
      });
  };

  // THIS IS AN OLD FUNCTION
  // New one is SendBack in modules folder
  // not sure yet if removing this will break anything, keep here for now
  sendBack = (url, image, key) => {
    //console.log("Send back.");
    if (this.state.isVideo) {
      var file = {
        uri: image,
        type: 'video/quicktime',
        name: 'video.mov'
      };

    } else {
      var file = {
        uri: image,
        type: 'image/png',
        name: 'image.png'
      };
    }

    let imgSize = 0;
    let that = this;

    RNFS.stat(image)
      .then(result => {
        imgSize = result.size;
      })
      .catch(err => {
        console.log('Could not get file info.');
      });

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Length', imgSize);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Image uploaded!', xhr);
          let type = '';
          if(that.state.isVideo) {
            type = 'video';
          }
          else {
            type = 'image';
          }
          let data = {
            community_id: that.props.post.spot.id,
            key: key,
            type: type
          };
          SaveMedia(data, that.props);
        } else {
          console.log('Could not upload image: ', xhr);
        }
      }
    };
    xhr.send(file);
  };

  sendMedia = () => {
    //console.log("Video path", this.props.post.path);
    let path = this.props.post.path;
    let that = this;

    if (this.state.isVideo) {
        axios.get(SERVER + '/api/posts/getUrlVideo', {
            headers: {
              Authorization: 'Bearer ' + this.props.token
            }
          })
          .then(function(response) {
            //console.log(response.data.url);
            that.setState({opened: false});
            SendBack(response.data.url, path, response.data.key, that.state.isVideo, that.props);
          })
          .catch(function(error) {
            console.log('Could not get video url: ', error);
          });

    } else {
      this.refs.captureArea.capture().then(uri => {
        //console.log('Here is the image uri: ', uri);
        axios.get(SERVER + '/api/posts/getUrlImage', {
            headers: {
              Authorization: 'Bearer ' + this.props.token
            }
          })
          .then(function(response) {
            //console.log(response.data.url);
            SendBack(response.data.url, uri, response.data.key, that.state.isVideo, that.props);
          })
          .catch(function(error) {
            console.log('Could not getimage url: ', error);
          });
        });
    }

  };

  sendVideo = () => {
    let that = this;
    axios
      .get(SERVER + '/api/posts/getUrlVideo', {
        headers: {
          Authorization: 'Bearer ' + this.props.token
        }
      })
      .then(function(response) {
        console.log(response.data);
        that.sendBack(response.data.url, this.props.post.path, response.data.key);
      })
      .catch(function(error) {
        console.log('Could not get url: ', error);
      });

  };

  //VIDEO FUNCTIONS

  changeRate = () => {
    index += 1;
    //console.log(index);
    if (index == 5) {
      index = 0;
    }
    var velocity = this.state.speed[index];
    this.setState({
      speedRate: velocity.speedRate,
      rateText: velocity.rateText
    });
  };

  onLoad(data) {
    this.setState({ duration: data.duration });
    /*if (Platform.OS === 'ios' && this._isAudio) {
      setTimeout(() => this._player.seek(0), 100);
    }*/
  }

  /*onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }*/

  textOnVideo = () => {
    const options = {
      path: '../../images/having_fun.mp4',
      type: 'video',
      left: 200,
      top: 200,
      backgroundOpacity: 0.5,
      text: 'Hello world',
      fontSize: 22,
      textColor: '#FFFFFF',
      backgroundColor: '#000000'
    };

    console.log('Text added');

    RNMediaEditor.embedText(options)
      .then(res => {
        console.log('Conversion succeed: ', res);
      })
      .catch(err => {
        console.log('Could not convert text on video: ', err);
      });
  };

  onSwipeLeft(gestureState) {
    index += 1;
    console.log(index);
    if (index == 5 || index == 6) {
      index = 0;
    }
    var effect = filters[index];
    this.setState({
      saturation: effect.saturation,
      contrast: effect.contrast,
      brightness: effect.brightness,
      temperature: effect.temperature
    });
  }

  onSwipeRight(gestureState) {
    index -= 1;
    console.log(index);
    if (index == -1) {
      index = 4;
    }
    var effect = filters[index];
    this.setState({
      saturation: effect.saturation,
      contrast: effect.contrast,
      brightness: effect.brightness,
      temperature: effect.temperature
    });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({
          saturation: this.state.saturation,
          contrast: this.state.contrast,
          brightness: this.state.brightness,
          temperature: this.state.temperature
        });
        break;
      case SWIPE_RIGHT:
        this.setState({
          saturation: this.state.saturation,
          contrast: this.state.contrast,
          brightness: this.state.brightness,
          temperature: this.state.temperature
        });
        break;
    }
  }

  handleFocusChanged() {
    console.print('Focusing');
  }

  renderPreview = () => {
    if (this.state.isVideo == true) {
      return this.renderVideo();
    } else {
      //console.log("Rendering still image view.");
      return this.renderImage();
    }
  };

  editText = () => {
    //console.log("Editing.");
    this.setState({ typing: true });
  };

  handleDone = () => {
    //console.log('Handle done called.');
    this.setState({ typing: false });
  };

  hideButtons = () => {
    this.props.selectSpot(null);
  }

  changeView = () => {
    if (this.state.isVideo) {
      this.setState({ isVideo: false });
    }
    this.setState({ editing: false });
    this.props.selectSpot(null);
    this.props.setText(null);
  }

  close = () => {
    const { navigate } = this.props.navigation;
    this.setState({ interactionsComplete: false });
    navigate('Main')
  };

  renderCamera() {
    const { navigate } = this.props.navigation;
    console.log('render camera');
    return (
      <View style={{ flex: 1, backgroundColor: '#000'}}>
      {this.state.interactionsComplete &&
      <Camera
        ref={cam => {
          this.camera = cam;
        }}
        style={styles.preview}
        type={this.state.camera.type}
        captureQuality={this.state.camera.captureQuality}
        captureTarget={this.state.camera.captureTarget}
        aspect={Camera.constants.Aspect.fill}
        defaultOnFocusComponent={true}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        mirrorImage={this.state.mirrorImage}
      >
        <View/>
      </Camera>}
      <View
          style={{
            flex: 1,
            position: 'absolute',
            marginLeft: 20,
            top: 10,
            justifyContent: 'flex-start'
          }}>
          <TouchableOpacity onPress={this.close}>
            <IonIcon
              name="ios-close"
              size={60}
              color="#FFFFFF"
              style={styles.exitIcon}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            position: 'absolute', bottom: 10,
            width: position
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity style={styles.turn} onPressIn={turnCamera}>
              <IonIcon
                name="ios-reverse-camera-outline"
                size={65}
                color="#FFFFFF"
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>

            <Shutter
              color={this.state.buttonColor}
              progress={this.state.progress}
              intermediate={this.state.indeterminate}
            />
          </View>
        </View>
       </View>
    );
  }

  renderImage() {
    const backAction = NavigationActions.back(null);

    const config = {
      velocityThreshold: 0.3,
      directionalOfsetThreshold: 80
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.fullScreen}>
          <ViewShot ref="captureArea" options={{ format: 'png' }}>
            <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeLeft={state => this.onSwipeLeft(state)}
              onSwipeRight={state => this.onSwipeRight(state)}
              onSwipeUp={state => this.onSwipeUp(state)}
              config={config}
            >
              <TouchableWithoutFeedback
                onPress={this.editText}
              >
                <Surface width={width} height={height}>
                  <ImageFilter
                    saturation={this.state.saturation}
                    contrast={this.state.contrast}
                    brightness={this.state.brightness}
                    temperature={this.state.temperature}
                  >
                    <GLImage
                      source={{ uri: this.props.post.path }}
                      imageSize={{ width: width, height: height }}
                      resizeMode="stretch"
                    />
                  </ImageFilter>
                </Surface>
              </TouchableWithoutFeedback>
            </GestureRecognizer>
            <TextEdit
              responder={this.panResponder.panHandlers}
              pan={this.state.pan.getLayout()}
              locText={this.state.locText}
              hideKeypad={this.state.hideKeypad}
              typing={this.state.typing}
              handleDone={this.handleDone}
            />
          </ViewShot>
        </View>

        <View
          style={{
            flex: 0,
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: 20,
            marginTop: 10,
            position: 'absolute'
          }}
        >
          <TouchableOpacity onPress={this.changeView}>
            <IonIcon
              name="ios-close"
              size={60}
              color="#FFFFFF"
              style={styles.exitIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          {this.props.post.spot ? (
            <SendButtons
              elementVisibility={this.state.elementVisibility}
              rateText={this.state.rateText}
              isVideo={this.state.isVideo}
              sendMedia={this.sendMedia}
              hideSelection={this.hideButtons}
            />
          ) : (
            <SpotList
              markers={this.props.markers}
              setFunction={this.hideElement}
            />
          )}
        </View>
      </View>
    );
  }

  renderVideo() {
    const backAction = NavigationActions.back(null);
    console.log(this.state.opened);
    return (
      <View style={styles.containerVideo}>
        { this.state.opened &&
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.fullScreen}>
              <TouchableWithoutFeedback onPress={this.editText}>
                <Video
                  source={{ uri: this.props.post.path }}
                  ref={(ref) => {
                    this.player = ref
                  }}
                  style={styles.fullScreen}
                  paused={false}
                  muted={false}
                  rate={this.state.speedRate}
                  onLoad={this.onLoad}
                  //onBuffer={this.onBuffer}
                  repeat={true}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: 20,
                marginTop: 10,
                position: 'absolute'
              }}
            >
              <TouchableOpacity onPress={this.changeView}>
                <IonIcon
                  name="ios-close"
                  size={60}
                  color="#FFFFFF"
                  style={styles.exitIcon}
                />
              </TouchableOpacity>
            </View>
            <TextEdit
              responder={this.panResponder.panHandlers}
              pan={this.state.pan.getLayout()}
              locText={this.state.locText}
              hideKeypad={this.state.hideKeypad}
              typing={this.state.typing}
              handleDone={this.handleDone}
            />
            <View style={styles.buttons}>
              {this.props.post.spot ? (
                <SendButtons
                  elementVisibility={this.state.elementVisibility}
                  rateText={this.state.rateText}
                  isVideo={this.state.isVideo}
                  sendMedia={this.sendMedia}
                  hideSelection={this.hideButtons}
                />
              ) : (
                <SpotList
                  markers={this.props.markers}
                  setFunction={this.hideElement}
                />
              )}
            </View>
          </View>
        }
      </View>
    );
  }

  /*renderDragable() {
    //<Text style={styles.textField}>Testing</Text>
    return (
      <Animated.View {...this.panResponder.panHandlers}
        style={[this.state.pan.getLayout(), styles.animatedText]}>
        <TextInput style={styles.textField}
          ref="locText"
          autoCorrect={false}
          multiline={true}
          onContentSizeChange={() => {}}
          value={this.state.imgText}
          onChangeText={(imgText) => this.setState({imgText})}
          numberOfLines={3}
          scrollEnabled={false}
          editable={this.state.hideKeypad}
          returnKeyType="done"
          autoFocus={false}
          blurOnSubmit={true}
          onSubmitEditing={this.handleDone} />
      </Animated.View>
    );
  }*/

  render() {
    const { navigate } = this.props.navigation;
    return (

        <View style={{ flex: 1, zIndex: 100 }}>
          <StatusBar hidden={true} />
          { this.state.editing ? this.renderPreview() : this.renderCamera()}


      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
