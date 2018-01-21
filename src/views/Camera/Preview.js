import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ScrollView,
    Keyboard,
    PanResponder,
    Animated,
    View } from 'react-native';
import GL from 'gl-react';
import { Surface } from 'gl-react-native';
import ImageFilter from 'gl-react-imagefilters';
const {Image: GLImage} = require("gl-react-image");

import Swiper from 'react-native-swiper';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PinchZoom from 'react-native-pinch-zoom-view';
//import ViewShot from 'react-native-view-shot';

import renderIf from './renderIf';

export const {height, width} = Dimensions.get('window');

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/postAction';

function mapStateToProps(state) {
  return {
    post: state.postReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

/*let filters = [
  {
    saturation: 1,
    contrast: 1,
  },

  {
    saturation: 0.5,
    contrast: 0.8,
  },

  {
    saturation: 1.1,
    contrast: 0.8,
  }
];*/

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //height: height,
    //justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  dragArea: {
    flex: 0,
    backgroundColor: 'transparent',
    //position: 'absolute',
    //top: 300,
  },

  fullScreen: {
    position: 'absolute',
    //height: height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  buttons: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    top: height - 100,
  },

  comList: {
    width: width,
    height: 100,
    backgroundColor: 'rgba(77, 77, 77, 0.5)',
  },

  sendButton: {
    flex: 1,
    alignSelf: 'flex-end',
  },

  textField: {
    //height: 40,
    fontSize: 32,
    width: width * 0.75,
    flex: 0,
    color: 'white',
    //bottom: 300,
  },

  animatedText: {
    //width: 200,
    //height: 200,
    flex: 0,
    //position: 'absolute',
  },

  comImage: {
    width: 75,
    height: 75,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },

  selectedCom: {
    width: 75,
    height: 75,
    marginLeft: 10,
    marginBottom: 10,
  },

});

var index = 0;

class Preview extends Component {

  constructor(props) {

  super(props);

  this.state = {
    filters: [
      {"key": 0, "saturation": 1, "contrast": 1, "brightness": 1, "temperature": 6500},
      {"key": 1, "saturation": 0.0, "contrast": 1.1, "brightness": 1, "temperature": 6500},
      {"key": 2, "saturation": 1.1, "contrast": 1.15, "brightness": 1.05, "temperature": 6500},
      {"key": 3, "saturation": 0.0, "contrast": 0.9, "brightness": 1, "temperature": 6500},
      {"key": 4, "saturation": 1.08, "contrast": 0.75, "brightness": 1.3, "temperature": 5500},
      {"key": 5, "saturation": 0.7, "contrast": 0.8, "brightness": 1.2, "temperature": 7000},
      {"key": 6, "saturation": 1.05, "contrast": 1.1, "brightness": 0.9, "temperature": 6200},
      {"key": 7, "saturation": 0.0, "contrast": 0.7, "brightness": 1.1, "temperature": 7000},
      {"key": 8, "saturation": 0.7, "contrast": 1.05, "brightness": 0.9, "temperature": 6000}
    ],
    pan : new Animated.ValueXY()
  };

  this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove : Animated.event([null,{
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderRelease : (e, gesture) => {
        this.state.pan.flattenOffset();
      }
    });

  }

  hideElement() {
    this.setState({elementVisibility: true});
    //this.setState({comVisibility: true});
  }

  /*convertImage = () => {
    //var ref = React.findNodeHandle(this.refs.img);
    this.refs.viewShot.capture().then(uri => {
      alert("Image captured");
    });
  }*/

  onSwipeLeft(gestureState) {
    /*{this.state.filters.map((item, index) => (
      this.setState({saturation: item.saturation})
      ))
    }*/

    //var number = this.state.filters.key;
    index += 1;
    console.log(index);
    if (index == 9 || index == 10) {
      index = 0;
    }
    var effect = this.state.filters[index];
    this.setState({saturation: effect.saturation, contrast: effect.contrast,
      brightness: effect.brightness, temperature: effect.temperature})
  }

  onSwipeRight(gestureState) {
    /*{this.state.filters.reverse().map((item, index) => (
      this.setState({saturation: item.saturation})
      ))
    }*/
    index -= 1;
    console.log(index);
    if (index == -1) {
      index = 8;
    }
    var effect = this.state.filters[index];
    this.setState({saturation: effect.saturation, contrast: effect.contrast,
      brightness: effect.brightness, temperature: effect.temperature})
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({saturation: this.state.saturation, contrast: this.state.contrast,
          brightness: this.state.brightness, temperature: this.state.temperature});
        break;
      case SWIPE_RIGHT:
        this.setState({saturation: this.state.saturation, contrast: this.state.contrast,
        brightness: this.state.brightness, temperature: this.state.temperature});
        break;
    }
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOfsetThreshold: 80
    };
    //const data = this.props.data || 'No data';
    //alert(data.path);
    //const data = this.props.path || 'No data';
    //var imgUrl = "\'" + data + "\'"
    //const imageUrl = require(data);
    //alert(data);
    //var img = require({this.props.path});
    //NEW source= {{uri: this.props.post.path}}
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        <View style={styles.fullScreen}>
        <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        config={config}>
          <Surface width={width} height={height}>
            <ImageFilter saturation={this.state.saturation}
            contrast={this.state.contrast}
            brightness={this.state.brightness}
            temperature={this.state.temperature}>
              <GLImage
              source={{uri: this.props.post.path}}
              imageSize={{ width: width, height: height }}
              resizeMode="stretch" />
            </ImageFilter>
          </Surface>
          </GestureRecognizer>
        </View>
        <View style={styles.dragArea}>
        <PinchZoom>
        {this.renderDragable()}
        </PinchZoom>
        </View>
        <View style={{flex: 0, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 20, marginTop: 10, position: 'absolute'}}>
        <TouchableOpacity>
        <IonIcon name="ios-close" size={60} color="#FFFFFF" style={{backgroundColor: "transparent"}} />
        </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
        {renderIf(!this.state.elementVisibility,
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.comList}>
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end', zIndex: 3}}>
                <TouchableOpacity onPress={()=> this.hideElement()}>
                <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={{flex: 1, color: 'white'}}>Test</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.hideElement()}>
                <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={{flex: 1, color: 'white'}}>Test</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.hideElement()}>
                <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={{flex: 1, color: 'white'}}>Test</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.hideElement()}>
                <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={{flex: 1, color: 'white'}}>Test</Text>
                </View>
                </TouchableOpacity>
              </View>
          </ScrollView>
          )}

          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end', width: width}}>
            { this.state.elementVisibility &&
              <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-start'}}>
              <TouchableOpacity>
              <Image
              style={styles.selectedCom}
              source={require('../../images/community.png')} />
              </TouchableOpacity>
              </View>
            }

            { this.state.elementVisibility &&
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity style={styles.sendButton} onPress={() => this.convertImage()}>
                <Image
                style={{width: 70, height: 70, marginBottom: 15, marginRight: 10, alignSelf: 'flex-end', alignItems: 'flex-end'}}
                source={require('../../images/send_button.png')} />
              </TouchableOpacity>
            </View>
            }
          </View>
        </View>
    </View>
    );
  }

  renderDragable() {
    //<Text style={styles.textField}>Testing</Text>
    return (
      <Animated.View {...this.panResponder.panHandlers}
        style={[this.state.pan.getLayout(), styles.animatedText]}>
        <Text style={styles.textField}>Testing</Text>
      </Animated.View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
