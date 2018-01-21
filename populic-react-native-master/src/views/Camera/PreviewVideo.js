import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
  ScrollView,
  PanResponder,
  Animated,
  ImageEditor,
  ImageStore,
  View
} from 'react-native';
import Video from 'react-native-video';
import RNMediaEditor from 'react-native-media-editor';
import { Keyboard } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';
import PinchZoom from 'react-native-pinch-zoom-view';
import RNFS from 'react-native-fs';

// aeged: Important for exiting
import { NavigationActions } from 'react-navigation';

import renderIf from './renderIf';

//Redux
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
  container: {
    flex: 1,
    //height: height,
    //justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'column',
    backgroundColor: 'black'
  },

  fullScreen: {
    position: 'absolute',
    //height: height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  exitIcon: {
    backgroundColor: 'transparent',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 2 },
    textShadowColor: 'black'
  },

  buttons: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    bottom: 0
  },

  comList: {
    width: width,
    height: 100,
    backgroundColor: 'rgba(77, 77, 77, 0.5)'
  },

  sendButton: {
    //flex: 1,
    alignSelf: 'flex-end'
  },

  dragArea: {
    flex: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 400
  },

  textField: {
    //height: 40,
    fontSize: 32,
    width: width * 0.9,
    height: 70,
    flex: 0,
    color: 'white'
    //bottom: 300,
  },

  comImage: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: '#1A91E7',
    borderRadius: 35,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },

  selectedCom: {
    width: 75,
    height: 75,
    marginLeft: 10,
    marginBottom: 10
  }
});

var index = 0;

class PreviewVideo extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    this.state = {
      image64: null,
      groups: [
        {
          key: 0,
          imgSource: require('../../images/portrait3.png'),
          name: 'Party'
        },
        {
          key: 1,
          imgSource: require('../../images/football.png'),
          name: 'USC vs CAL'
        },
        {
          key: 2,
          imgSource: require('../../images/keynote.png'),
          name: 'GamerCon'
        },
        {
          key: 3,
          imgSource: require('../../images/clothes.png'),
          name: '2ndHand'
        }
      ],
      speed: [
        { key: 0, speedRate: 1, rateText: 'x1' },
        { key: 1, speedRate: 1.5, rateText: 'x1.5' },
        { key: 2, speedRate: 2, rateText: 'x2' },
        { key: 3, speedRate: 0.2, rateText: 'x0.2' },
        { key: 4, speedRate: 0.5, rateText: 'x0.5' }
      ],
      videoUrl: this.props.post.path,
      pan: new Animated.ValueXY()
    };

    /*this.state = {
      asset: null,
      text: 'Hello world',
      fontSize: 38,
      colorCode: '#ffffff',
      textBackgroundColor: '#ff00e0',
      state: false,
      pan: new Animated.ValueXY(),
      communities: [
        {"key": 0, "name": "Team of Vili"},
        {"key": 1, "name": "Team of Vili"},
        {"key": 2, "name": "Team of Vili"},
        {"key": 3, "name": "Team of Vili"},
        {"key": 4, "name": "Team of Vili"}
      ]
    };*/

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
    this.setState({ rateText: 'x1' });
  }

  hideElement() {
    this.setState({ elementVisibility: true });
    this.setState({ comVisibility: true });
  }

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
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  videoBase = () => {
    const imageURI = this.props.post.path;

    Image.getSize(
      imageURI,
      (width, height) => {
        var size = { size: { width, height }, offset: { x: 0, y: 0 } };

        ImageEditor.cropImage(
          imageURI,
          size,
          imageURL => {
            console.log('Done');

            ImageStore.getBase64ForTag(
              imageURL,
              imageBase64 => {
                this.setState({ image64: imageBase64 });
                //console.log("Base64 converted: ", base64Data);
              },
              error => console.log(error)
            );
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  };

  textOnVideo = () => {
    /*const options = {
        path: this.props.post.path,
        type: 'video',
        left: 200,
        top: 200,
        backgroundOpacity: 0.5,
        text: 'Hello world',
        fontSize: 22,
        textColor: "#FFFFFF",
        backgroundColor: '#000000',
      };

      console.log("Text added");

      RNMediaEditor.embedText(options)
      .then(res => {
        console.log("Conversion succeed: ", res);
      })
      .catch(err => {
        console.log("Could not convert text on video: ", err);
      });*/
    RNFS.readFile(this.props.post.path, 'base64')
      .then(res => {
        console.log('Video converted on base64.');
        this.setState({ image64: res });
      })
      .catch(err => {
        console.log('Could not convert base64: ', err);
      });
  };

  render() {
    //var img = require({this.props.path});
    //alert("Video preview");

    // aeged: For navigating screen pages
    // value of null sets it back to last page
    const backAction = NavigationActions.back(null);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.fullScreen}>
          <Video
            source={{ uri: this.props.post.path }}
            style={styles.fullScreen}
            muted={false}
            rate={this.state.speedRate}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            repeat={true}
          />
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
          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(backAction)}
          >
            <IonIcon
              name="ios-close"
              size={60}
              color="#FFFFFF"
              style={styles.exitIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dragArea}>
          <PinchZoom>{this.renderDragable()}</PinchZoom>
        </View>
        <View style={styles.buttons}>
          {renderIf(
            !this.state.elementVisibility,
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.comList}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                {this.state.groups.map(item => (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => this.hideElement()}
                  >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Image
                        style={styles.comImage}
                        resizeMethod={'resize'}
                        source={item.imgSource}
                      />
                      <Text style={{ flex: 1, color: 'white', fontSize: 12 }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'flex-end',
              width: width
            }}
          >
            {this.state.elementVisibility && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'flex-start'
                }}
              >
                <TouchableOpacity>
                  <Image
                    style={styles.selectedCom}
                    source={require('../../images/community.png')}
                  />
                </TouchableOpacity>
              </View>
            )}

            {this.state.elementVisibility && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginLeft: 60,
                  marginBottom: 15
                }}
              >
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={this.changeRate}
                >
                  <Text
                    style={{
                      color: 'white',
                      backgroundColor: 'transparent',
                      fontSize: 24,
                      fontWeight: 'bold'
                    }}
                  >
                    {this.state.rateText}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {this.state.elementVisibility && (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={this.textOnVideo}
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      marginBottom: 15,
                      marginRight: 10,
                      alignSelf: 'flex-end',
                      alignItems: 'flex-end'
                    }}
                    source={require('../../images/send_button.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

  renderDragable() {
    return (
      <View>
        <Animated.View {...this.panResponder.panHandlers}>
          <TextInput
            style={styles.textField}
            ref="locText"
            placeholder="Text"
            autoCorrect={false}
            multiline={true}
            editable={this.state.hideKeypad}
            returnKeyType="done"
            autoFocus={false}
            blurOnSubmit={true}
            onSubmitEditing={() => this.refs['locText'].blur()}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewVideo);
