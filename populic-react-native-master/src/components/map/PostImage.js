import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IconCustom from '../../config/icons';
//import Moment from 'react-moment';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';
import { IncreaseViews } from '../../modules/IncreaseViews';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image'

import styles from './styles';

export const { height, width } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    token: state.userReducer.token,
    user: state.userReducer.user,
    spot: state.locationReducer,
    posts: state.postReducer,
    markers: state.locationReducer.locs,
    locContent: state.userReducer.imageVideo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class PostImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    //this.fill = 0;
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    //this.fill = 0;
    //this.refs.circularProgress.performLinearAnimation(100, 5000);
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  /*imageLoaded = () => {
    if (this.props.id == this.props.item.id) {
      this.timer = setTimeout(() => {
        if (this.props.id == this.props.item.id && this.props.opened) {
          console.log("Is open: ", this.props.opened);
          this.props.nextSlide();
        }
      }, 3000);
      //this.props.timer();
      //console.log("Testing loading");
    }
  }*/

  render() {
    //() => this.props.report(item.id)
    //console.log("Element item.");
    var end = moment(new Date());
    console.log(this.props.id == this.props.item.id);
    //console.log(this.props.id == this.props.item.id);
    return (
          <View key={this.props.item.id} style={{ flex: 1, alignItems: 'center', zIndex: 100}}>
            <View>
              {this.props.item.type == "video" && this.props.id == this.props.item.id ? (
                <Video
                  source={{ uri: this.props.item.image_video_url }}
                  style={{ flex: 1, width: width, height: height }}
                  ref={(ref: Video) => { this.video = ref }}
                  resizeMode="cover"
                  muted={false}
                  playInBackground={false}
                  playWhenInactive={false}
                  paused={false}
                  rate={1}
                  onEnd={this.props.nextSlide}
                  repeat={false}
                />
              ) : (
                <FastImage
                  style={{ flex: 1, width: width, height: height }}
                  source={{
                    uri: this.props.item.image_video_url,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.resize}
                />
              )}
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 18, right: 15 }}>
              { this.props.posts.isPinned ?
                <View style={{padding: 15, paddingTop: 5, paddingRight: 0, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <IconCustom
                    name="Pin-Icon"
                    size={50}
                    color='rgba(255, 255, 255, 1)'
                    style={styles.pinButton}
                  />
                </View>
                :
                <TouchableOpacity onPress={this.props.pin} style={{padding: 15, paddingTop: 15, marginTop: -15, marginRight: -15, paddingRight: 15, flexDirection: 'row', justifyContent: 'flex-end', }}>
                  <IconCustom
                    name="marker-icon-fill"
                    size={50}
                    color="#FFFFFF"
                    style={styles.pinButton}
                    />
                </TouchableOpacity>
              }
            <View style={{ flexDirection: 'column', paddingTop: 15, marginTop: -15, maxWidth: width / 3}}>
              <Text style={{
              fontFamily: 'Avenir-Heavy',
              color: 'white',
              backgroundColor: 'transparent',
              fontSize: 22,
              fontWeight: '700',
              textAlign: 'right',
              textShadowRadius: 3,
              textShadowOffset: { width: 1, height: 1 },
              textShadowColor: 'black' }}
              numberOfLines={1}>
              {this.props.name}
              </Text>
              <Text style={{
              fontFamily: 'Avenir-Medium',
              color: 'white',
              backgroundColor: 'transparent',
              fontSize: 16,
              letterSpacing: 1,
              textAlign: 'left',
              textShadowRadius: 3,
              textShadowOffset: { width: 1, height: 1 },
              textShadowColor: 'black' }}
              numberOfLines={1}>
              @{this.props.item.username}
              </Text>
            </View>
            </View>
            <View style={{ position: 'absolute', bottom: 30, left: 15 }}>
            { moment.duration(end.diff(this.props.item.created_at)).asHours() < 20 &&
               <Text style={{
                fontFamily: 'Avenir-Medium',
                color: 'white',
                backgroundColor: 'transparent',
                fontSize: 16,
                textAlign: 'left',
                textShadowRadius: 3,
                textShadowOffset: { width: 1, height: 1 },
                textShadowColor: 'black' }}>
                {moment(this.props.item.created_at).fromNow()}
              </Text>
            }
            </View>
            <View style={{ position: 'absolute', bottom: 15, right: 15 }}>
              <TouchableOpacity onPress={this.props.report} style={{padding: 25, marginRight: -15, marginBottom: -15,}}>
                <IconCustom
                  name="Flag-Icon"
                  size={32}
                  color="#FFFFFF"
                  style={styles.pinButton}
                />
              </TouchableOpacity>
            </View>


            <TouchableOpacity
              style={styles.nextButton}
              onPress={this.props.nextSlide}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.props.prevSlide}
            />
          </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostImage);
