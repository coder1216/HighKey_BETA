import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Animated,
  StyleSheet,
  AsyncStorage,
  Text as TextReact,
  Share,
  Keyboard,
  Easing,
  FlatList,
  ScrollView,
  Dimensions,
  InteractionManager,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

//Styles
import styles from './styles';

import Toast from 'react-native-root-toast';

//Config
import { MapboxToken } from '../../config/mapbox';
import { SERVER } from '../../config/server';

//Component
import DrawerComponent from '../../modules/drawer';
import axios from 'axios';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostActions from '../../actions/postAction';
import * as Actions from '../../actions/userAction';
import * as SpotActions from '../../actions/spotAction'

//UI
import {
  Title,
  TextInput,
  Button,
  Text,
  Caption,
  View as ViewShoutem,
  NavigationBar,
  Lightbox,
  Divider,
  Subtitle,
  
  Image
} from '@shoutem/ui';
//import Icon from 'react-native-vector-icons/Ionicons';
import IconCustom from '../../config/icons';
import Modal from 'react-native-modal';
import Carousel from '../../components/map/Carousel';
import Video from 'react-native-video';

import * as Animatable from 'react-native-animatable';

//Map
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import ActivityView from 'react-native-activity-view';

//import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import LinearGradient from 'react-native-linear-gradient';

import { FetchPosts } from '../../modules/FetchPosts';
import { IncreaseViews } from '../../modules/IncreaseViews';
import { ReportPost } from '../../modules/ReportPost';
import { PinSpot } from '../../modules/PinSpot';

import { BlurView, VibrancyView } from 'react-native-blur';
import geolib from 'geolib';

import Spinner from 'react-native-spinkit';

import CircleTransition from 'react-native-expanding-circle-transition';
const ANIMATION_DURATION = 600;
const TRANSITION_BUFFER = 700;
const POSITON = 'custom';

export const { height, width } = Dimensions.get('window');
const area =  [
        {latitude: 34.01023007, longitude: -118.29490185},
        {latitude: 34.03359907, longitude: -118.29490185},
        {latitude: 34.03359907, longitude: -118.27138424},
        {latitude: 34.01023007, longitude: -118.27138424}
];

function mapStateToProps(state) {
  return {
    token: state.userReducer.token,
    user: state.userReducer.user,
    spot: state.locationReducer,
    userCoords: state.locationReducer.userLocation,
    spotArray: state.spotReducer.pinnedGroups,
    posts: state.postReducer,
    markers: state.locationReducer.locs,
    locContent: state.userReducer.imageVideo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, Actions, PostActions, SpotActions), dispatch);
}

var index = 0;

class Map extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Images',
    tabBarIcon: ({ tintColor }) => {
      if(tintColor == '#E24825') {
        return <IconCustom name="Map-Icon-Fill" size={21} style={{ color: tintColor }} />
      }
      else {
        return <IconCustom name="Map-Icon-Red" size={21} style={{ color: tintColor }} />
      }
    }
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    this.state = {
      interactionsComplete: false,
      mapLoaded: false,
      //firstTime: null,
      //center: [118.285049, 34.021271],
      //centerPoint: [-118.287268, 34.023792],
      center: [118.286562, 34.022372],
      centerPoint: [-118.286562, 34.022372],
      //Move to redux
      loaded: false,
      //visible: false,
      newSpot: {
        name: '',
        user: 12
      },
      viewBackgroundColor: '#29C5DB',
      //Move to redux
      user: {
        latitude: 0,
        longitude: 0
      }
    };

    const accessToken = MapboxToken;

    MapboxGL.setAccessToken(accessToken);
  }

  componentWillMount() {

      axios
        .get(SERVER + '/api/spots/getCommunityList', {
          headers: {
            Authorization: 'Bearer ' + this.props.token
          }
        })
        .then(response => {
          let locs = [];
          //console.log("Spots on a map: ", response.data.data.spots);
          locs = response.data.data.spots.map(item => {
            return {
              id: item.id.toString(),
              name: item.name,
              radius: item.radius,
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
              image_url: item.image_video_url,
              hot: item.hot
            };
          });

          this.props.setLocations(locs);
          //this.setState({loaded: true});
          //console.log("Map spots: ", comSpot);
        })
        .catch(function(error) {
          console.log('Could not get spots: ', error);
        });


    /*let imageVideo = [];
    //console.log("Spots on a map: ", response.data.data);
    imageVideo = this.state.pinnedGroups.map((item) => {
      return {
        id: item.id,
        image_url: item.imgSource,
      };

    });

    this.props.setContent(imageVideo);*/

    this.setState({ loaded: true });
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {
      this.setState({ interactionsComplete: true });
      //CHECK IF APP HAS BEEN LAUNCHED PREVIOUSLY FOR SHOWING ONBOARDING.
      AsyncStorage.getItem('launched').then(value => {
        if (value == null) {
          AsyncStorage.setItem('launched', 'true');
          const { navigate } = this.props.navigation;
          navigate('Introduction');
        } else {

        }
      });
    });
    navigator.geolocation.getCurrentPosition(
      position => {
        let userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.props.setLastKnownLocation(userLocation);

        this.setState({
          user: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        //console.log(this.state);
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    /*AsyncStorage.getItem("userToken").then(value => {
      console.log("Your token: " + value);
    });*/

    /*AsyncStorage.getItem("user").then(value => {
      console.log("User: " + value);
    });*/

    //console.log("New user: ", this.props.user);

    //this.setState({visible: true});
  }

  handlePress = id => {
    console.log('pressed ' + id);
    FetchPosts(id, this.props);
    //this.setState({visible: true});
    //this.renderList();
    //console.log("Hello world!", item.id);
    //id = parseInt(item.id);
    //this.renderList();
    /*axios.get(SERVER + '/api/spots/postsBySpot', {
      headers: {
        spot_id: 1
      }
    })
    .then((response) => {
      console.log("Spot images:", response.data.data);
      let posts = [];
      console.log("Spots on a map: ", response.data.data);
      locs = response.data.data.spots.map((item) => {
        return {
          id: item.id.toString(),
          name: item.name,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          image_url: item.image_video_url,
        };

      });

    })
    .catch(function (error) {
      console.log("Could not get spots: ", error);
    });*/
  };

  closeCarousel = () => {
    this.setState({ visible: false });
  };

  closeCommunity = () => {
    this.setState({
      openImages: false
    });
  };

  openImages = () => {};

  handleLocation = location => {
    let center = {
      latitude: location.latitude,
      longitude: location.longitude
    };
    this.setState({
      center: center
    });
  };

  getItemLayout = (data, index) => ({
    length: this.props.posts.posts.length,
    offset: width * index,
    index
  });

  scrollIndex = () => {
    //console.log("Next slide");
    index++;
    IncreaseViews(this.props.posts.posts[index].id, this.props);
    //console.log(index);
    //let x = index * width;
    //console.log("Index: ", index);
    //this.feedRef.scrollTo({x: x, animated: true});*/
    if (index >= this.props.posts.posts.length) {
      index = 1;
      this.feedRef.scrollToIndex({ animated: false, index: 1 });
    } else {
      this.feedRef.scrollToIndex({ animated: false, index: index });
    }
  };

  scrollBack = () => {
    index = index - 1;
    IncreaseViews(this.props.posts.posts[index].id, this.props);
    //console.log(index);
    if (index == -1) {
      index = this.props.posts.posts.length - 1;
      this.feedRef.scrollToIndex({
        animated: false,
        index: this.props.posts.posts.length - 1
      });
    } else {
      this.feedRef.scrollToIndex({ animated: false, index: index });
    }
  };

  pinCommunity = (id) => {
    //alert(id);
    //console.log("Pinned id: ", id);
    PinSpot(id, this.props);
    
    //FetchPinned(this.props);
  }

  reportPost = (id) => {
    //console.log("Report: ", id);
    Alert.alert(
      'Report content',
      'Do you want to report this post?',
      [
        {text: 'Report', onPress: () =>
          ReportPost(id, this.props)
        },
        {text: 'Cancel', onPress: () => console.log("jkdfjklfg")},
      ],
      {cancelable: false}
    )
  }

  sendData = () => {
    let data = {
      name: this.state.newSpot.name,
      user: this.state.newSpot.user,
      latitude: this.state.user.latitude,
      longitude: this.state.user.longitude
    };
    this.props.setInfo(data);
    const { navigate } = this.props.navigation;
    navigate('Camera');
  };

  onDidFinishLoadingMap = () => {
    this.setState({
      mapLoaded: true
    });
  };

  fetchPosts = id => {
    console.log('pressed ' + id);
    FetchPosts(id, this.props);
  };

  closeSpot = (close) => {
  this.props.carouselClose();
  close();
  }

  renderList = (item) => {

    //console.log(this.props.posts.posts.length);
    //index = 0;
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
        <Carousel
        report={this.reportPost}
        spotId={item.id}
        name={item.name}/>
      </View>
    );
  };

  renderAnnotations() {
    //console.log("New spots: ", this.props.markers);
    //console.log("Rendering: ", this.state.loaded);
    return this.props.markers.map((item, i) => {
      //console.log("Communities: ", item.name);
      return (
        <View key={item.id}>
          <MapboxGL.PointAnnotation
            key={item.id}
            id={item.id}
            coordinate={[item.longitude, item.latitude]}
          >
            <TouchableWithoutFeedback onPress={() => this.handlePress(item.id)}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Animatable.View
                  animation="bounceIn"
                  delay={1500 + 300 * i}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  
                  <LinearGradient
                    start={{ x: 0.8, y: 0.3 }}
                    colors={['#EAC149', '#E23025']}
                    style={{ width: 62, height: 62, borderRadius: 31 }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 60,
                        height: 60,
                        paddingLeft: 1,
                        paddingTop: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* Hotspot animation */}
                  { (item.hot == true) &&
                    
                      <Spinner isVisible={true} size={90} type={'Bounce'} color={'#EAC149'}/>
                  }
                    </View>

                    <Lightbox
                      swipeToDismiss={true}
                      pinchToZoom={false}
                      renderContent={() => this.renderList(item)}
                      onPress={() => this.closeSpot(close)}
                      renderHeader={close => (
                        <View>
                        <View style={{ position: 'absolute', top: 10, left: 10 }}>
                        <TouchableOpacity onPress={close} style={{padding: 15}}>
                          <IconCustom
                            name="Back-Icon"
                            size={25}
                            color="#FFFFFF"
                            style={styles.closeButton}
                          />
                        </TouchableOpacity>
                        </View>

                        </View>
                      )}
                      onOpen={() => this.fetchPosts(item.id)}
                      underlayColor={'transparent'}
                      backgroundColor={'transparent'}
                    >
                      <Image
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 29,
                          marginLeft: 2,
                          marginTop: 2
                        }}
                        source={{ uri: item.image_url }}
                      />
                    </Lightbox>
                  </LinearGradient>
                </Animatable.View>

                <Animatable.View
                  animation="fadeIn"
                  delay={2100 + 300 * i}
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <TextReact style={styles.nameLabel}>
                    {item.name}
                  </TextReact>
                </Animatable.View>
              </View>
            </TouchableWithoutFeedback>
          </MapboxGL.PointAnnotation>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {(1 == 1) || !geolib.isPointInside(this.props.userCoords, area) &&
          <View style={styles.overlayBlur}>
            <BlurView
              style={styles.overlayBlur}
              blurType="dark"
              blurAmount={5}
            />
            <View style={styles.overlayBlur}>
              <Text style={styles.overlayBlurText}>Not available in this area</Text>
            </View>
          </View>}
        <MapboxGL.MapView
          ref={map => {
            this._map = map;
          }}
          style={styles.map}
          //centerCoordinate={[parseFloat(-118.287268), parseFloat(34.023792)]}
          centerCoordinate={[parseFloat(-118.286562), parseFloat(34.022372)]}
          zoomLevel={15}
          minZoomLevel={14}
          initialDirection={0}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          logoEnabled={false}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          showUserLocation={true}
          styleURL={'mapbox://styles/viliv/cj9ht82dba7xh2ro4frmz24k2'}
          onUpdateUserLocation={this.handleLocation}
          userTrackingMode={MapboxGL.UserTrackingModes.None}
        >
          {this.state.mapLoaded && this.renderAnnotations()}
          {this.state.visible ? this.renderList() : console.log('Closed')}
        </MapboxGL.MapView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
