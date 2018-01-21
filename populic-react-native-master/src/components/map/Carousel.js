import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';
import * as PostActions from '../../actions/postAction';
import * as SpotActions from '../../actions/spotAction';

import { IncreaseViews } from '../../modules/IncreaseViews';
import { SERVER } from '../../config/server';
import { PinSpot } from '../../modules/PinSpot';
import { ReportPost } from '../../modules/ReportPost';
import Spinner from 'react-native-spinkit';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { BlurView, VibrancyView } from 'react-native-blur';

//New
import PostImage from '../../components/map/PostImage';

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
  return bindActionCreators(Object.assign({}, Actions, PostActions, SpotActions), dispatch);
}

var index = 0;

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: 0,
      index: 0
    }
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    //console.log("Image updated.");
    //console.log(nextProps);
    if(this.props.posts.posts == nextProps.Cdata) {
      return true;
    } else {
      return true;
    }
  }*/

  componentDidMount() {
    this.props.carouselOpen();
    // prevent slide timer from going off when no content in the spot
    if(this.props.posts.posts.length > 0) {
      //this.changeSlide();
    } else {
      console.log('changeSlide not triggered, must be no content in spot.')
    }
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
    console.log("Carousel closed");
    index = 0;
    this.setState({ index: 0 });
  }

  getItemLayout = (data, index) => ({
    length: this.props.posts.posts.length,
    offset: width * index,
    index
  });

  changeSlide = () => {
    console.log("Image loaded");
    this.timer = setTimeout(() => {
      this.scrollIndex();
    }, 3000);
    //this.interval = setInterval(() => {
    //this.scrollIndex();
      /*setTimeout(() => {
      this.refs.circularProgress.performLinearAnimation(0, 100);

      this.setState({fill: 100});
      }, 4990);
    this.setState({fill: 0});*/
  //}, 5000);
  }

  scrollIndex = () => {
    //this.refs.circularProgress.performLinearAnimation(100, 5000);
    //console.log("Scroll index");
    //clearInterval(this.interval);
    //clearInterval(this.interval);
    // if(this.feedRef) {
    //   this.setState({fill: 0});
    console.log("NEXT");
      index++;
     
      if (this.props.posts.posts.length == 0) {
        //alert("This spot doesn't have any images yet!");
        index = 0;

      } else if (index >= this.props.posts.posts.length) {
        //clearInterval(this.interval);
        index = 0;
        this.setState({ index: 0 });
        IncreaseViews(this.props.posts.posts[index].id, this.props);
        //this.feedRef.scrollToIndex({ animated: false, index: 0 });
      } else {
        //clearInterval(this.interval);
        IncreaseViews(this.props.posts.posts[index].id, this.props);
         this.setState({ index: index });
        //this.feedRef.scrollToIndex({ animated: false, index: index });
      }
    console.log(this.props.posts.posts[index]);


  };

  scrollBack = () => {
    //IncreaseViews(this.props.posts.posts[index].id, this.props);
    //clearInterval(this.interval);
    index = index - 1;
    this.setState({ index: 0 });
    //IncreaseViews(this.props.posts.posts[index].id, this.props);
    //console.log(index);
    if (index == -1) {
      index = this.props.posts.posts.length - 1;
      IncreaseViews(this.props.posts.posts[index].id, this.props);
      this.setState({ index: this.props.posts.posts.length - 1 });
      // this.feedRef.scrollToIndex({
      //   animated: false,
      //   index: this.props.posts.posts.length - 1
      // });
      //clearInterval(this.interval);
      //this.changeSlide();
    } else {
      IncreaseViews(this.props.posts.posts[index].id, this.props);
      this.setState({ index: index});
      //this.feedRef.scrollToIndex({ animated: false, index: index });
      //clearInterval(this.interval);
      //this.changeSlide();
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

//Wtf!
  // noSpots = () => {
  //   const { goBack } = this.props.navigation;
  //   Alert.alert (
  //     'No spots!',
  //     'Please post something on this spot!',
  //     [
  //       {text: 'Go Back', onPress: () => goBack()}
  //     ],
  //     {cancelable: false}
  //   )
  // }



  render() {
    return (
      <View>
      {
        (this.props.posts.posts.length > 0)
        ?
        <View style={styles.blurred}>
          <BlurView blurType="dark" style={styles.blurred} blurAmount={15} />
          <Spinner style={styles.spinner} isVisible={true} size={80} type={'Bounce'} color={'#fff'}/>


          <PostImage
            item={this.props.posts.posts[this.state.index]}
            opened={this.props.posts.opened}
            id={this.props.posts.posts[this.state.index].id}
            pin={() => this.pinCommunity(this.props.spotId)}
            report={() => this.reportPost(this.props.posts.posts[this.state.index].id)}
            spotId={this.props.spotId}
            name={this.props.name}
            timer={() => this.changeSlide()}
            nextSlide={() => this.scrollIndex()}
            prevSlide={() => this.scrollBack()}
            selected={index}
            fill={this.state.fill}
          />
        </View>
        :
          <Image
          style={styles.blurred}
          blurRadius={75}
          source={require('../../images/blurred.jpg')}/>
      }
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
