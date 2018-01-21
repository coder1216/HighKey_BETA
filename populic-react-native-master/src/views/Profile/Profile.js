
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImagePickerIOS,
  SegmentedControlIOS,
  AsyncStorage,
  View,
  Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconCustom from '../../config/icons';
import NewIcon from 'react-native-icon-badge';
import LinearGradient from 'react-native-linear-gradient';
//import ParallaxScrollView from 'react-native-parallax-scroll-view';
import axios from 'axios';
import { SERVER } from '../../config/server';
import { toggleModal } from '../../actions/spotAction';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/spotAction';
//Components
//import styles from '../../components/profile/styles';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileContentPinnedGroups from '../../components/profile/ProfileContentPinnedGroups';
import ProfileContentGetStarted from '../../components/profile/ProfileContentGetStarted';
import Carousel from '../../components/map/Carousel';
import * as PostActions from '../../actions/postAction';
import { FetchPinned } from '../../modules/FetchPinned';

function mapStateToProps(state) {
  return {
    //dummy: true
    token: state.userReducer.token,
    user: state.userReducer.user,
    spots: state.spotReducer,
    spotArray: state.spotReducer.pinnedGroups,
    markers: state.locationReducer.locs,
    posts: state.postReducer,
    locContent: state.userReducer.imageVideo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, Actions, PostActions), dispatch);
}

export const {height, width} = Dimensions.get('window');


class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    gesturesEnabled: false,
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => {
      if(tintColor == '#E24825') {
        return <IconCustom name="profile-icon-red" size={21} style={{ color: tintColor }} />
      }
      else {
        return <IconCustom name="Profile-Icon" size={21} style={{ color: tintColor }} />
      }
    }
  };

  constructor(props) {

    super(props);

    this.state = {
      //name: '',
      userName: '',
      // aeged: may remove this, only used in ProfileHeader component
      profileAvatar: 'profile_default',
      totalViews: 0,
      weeklyViews: 0,
      userGroups: [],
      pinnedGroups: [],
      isPinnedSpots: false
    };

    /*this.state = {
      name: 'Patricia Cole',
      userName: '@patriciac',
      profileAvatar: "profile_default",
      totalViews: 54398,
      weeklyViews: 3689,
      userGroups: [
        {"key": 0, "imgSource": require("../../images/portrait3.png"), "name": "Party", "alerts": 4},
        {"key": 1, "imgSource": require("../../images/football.png"), "name": "USC vs ARIZ", "alerts": 1},
        {"key": 2, "imgSource": require("../../images/clothes.png"), "name": "2ndHand", "alerts": 2}
      ],
      pinnedGroups: [
        {id: 0, imgSource: require("../../images/add_pin.png"), name: "", alerts: 0},
        {id: 1, imgSource: require("../../images/party.jpg"), name: "Phi Psi", alerts: 9},
        {id: 2, imgSource: require("../../images/game_night.jpg"), name: "Sammy", alerts: 0},
        {id: 3, imgSource: require("../../images/people.jpg"), name: "Sigma Chi", alerts: 2},
        {id: 4, imgSource: require("../../images/friends.jpg"), name: "TKE", alerts: 8},
        {id: 5, imgSource: require("../../images/party2.png"), name: "ZBT", alerts: 4},
        {id: 6, imgSource: require("../../images/frat_image.png"), name: "Phi Delt", alerts: 0},
        {id: 7, imgSource: require("../../images/football.png"), name: "USC vs ARIZ", alerts: 1},
        {id: 8, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2}
      ],
      //isPinnedSpots: false
      isPinnedSpots: true
    };*/

    // testing block
    /*this.props.pinnedGroups([
        {id: 0, imgSource: require("../../images/add_pin.png"), name: "", alerts: 0},
        {id: 1, imgSource: require("../../images/party.jpg"), name: "Phi Psi", alerts: 9},
        {id: 2, imgSource: require("../../images/game_night.jpg"), name: "Sammy", alerts: 0},
        {id: 3, imgSource: require("../../images/people.jpg"), name: "Sigma Chi", alerts: 2},
        {id: 4, imgSource: require("../../images/friends.jpg"), name: "TKE", alerts: 8},
        {id: 5, imgSource: require("../../images/party2.png"), name: "ZBT", alerts: 4},
        {id: 6, imgSource: require("../../images/frat_image.png"), name: "Phi Delt", alerts: 0},
        {id: 7, imgSource: require("../../images/football.png"), name: "USC vs ARIZ", alerts: 1},
        {id: 8, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 9, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 10, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 11, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 12, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 13, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 14, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
        {id: 15, imgSource: require("../../images/people2.jpg"), name: "Sig Nu", alerts: 2},
      ])*/

  }

  // specialized constructor-like function, carries out syncronous operations to set up compenent before it renders
  componentWillMount() {
    // aeged: fetching communities
    axios.get(SERVER + '/api/users/getViews', {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
    .then((response) => {
      console.log("Views fetched: ", response.data.data);
      this.setState({totalViews: response.data.data.views.total, weeklyViews: response.data.data.views.week});
    })
    .catch(function (error) {
      console.log("Could not get views: ", error);
    });

    FetchPinned(this.props);

    /*axios.get(SERVER + '/api/users/getPins', {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
    .then((response) => {
      console.log("Pins fetched: ", response.data.data);
      this.props.pinnedGroups(response.data.data.pins);
    })
    .catch(function (error) {
      console.log("Could not get pinned spots: ", error);
    });*/

  }

  createSpot = () => {
    this.props.toggleModal(true);
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  openGallery = () => {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ profileAvatar: imageUri });
    }, error => console.log(error));
  }

  showHeader = () => {
      //let x = index * width;
      this.scrollView._component.scrollTo({
        y: 230,
        animated: true,
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    const data = this.props.data || 'No data';

    // pre-ScrollView implementation
    /*<View style={{flex: 1, flexDirection: 'column', backgroundColor: 'black'}}>
    <StatusBar barStyle="light-content" />
    <Image
    style={styles.bgImage}
    source={require("../../images/bg_color.png")} />

      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end', margin: 20, marginBottom: 0}}>
      <TouchableOpacity onPress={() => navigate('Settings')}>
      <IonIcon name="ios-settings" size={30} color="#FFFFFF" style={{backgroundColor: "transparent"}} />
      </TouchableOpacity>
      </View>

      <View style={{flex: 0, alignItems: 'center', flexDirection: 'column', margin: 10, marginTop: 0, marginBottom: 20}}>
      <View style={{flex: 0, flexDirection: 'row', margin: 10, marginTop: 0}}>
      <TouchableOpacity onPress={this.openGallery} style={styles.profileButton}>
      <Image
      style={styles.profileImage}
      source={{ uri: this.state.profileAvatar }} />
      </TouchableOpacity>
      </View>

        <View style={{flex: 0, flexDirection: 'column'}}>
          <View>
          <Text style={styles.nameText}>{this.props.user.fullname}</Text>
          <Text style={styles.nickText}>{this.props.user.username}</Text>
          </View>
          <View style={{flex: 0, flexDirection: 'row'}}>
          <Text style={styles.detailText}>Total views: {this.state.totalViews}</Text>
          <Text style={styles.detailTextRight}>Weekly views: {this.state.weeklyViews}</Text>
          </View>
          <View style={{flex: 0, alignItems: 'center', marginTop: 30}}>
          <Text style={{color: 'white', backgroundColor: 'transparent', fontSize: 12, fontFamily: 'Avenir', fontWeight: 'bold', letterSpacing: 1}}>PINNED SPOTS</Text>
          </View>
        </View>

      </View>

      {
        // Ternary statement: if there are pinned groups, show them. If not, "Find a hotspot you'll love."
        (this.props.spots.pinnedGroups.length > 0) ?

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
        data={this.props.spots.pinnedGroups}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity key={item.name} style={styles.spotButton}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <NewIcon
            MainElement={
            <Image
            style={styles.comImage}
            resizeMethod={'resize'}
            source={require("../../images/portrait3.png")} />
            }
            BadgeElement={
              <Text style={{color: '#FB4F27', fontSize: 12}}>{item.alerts}</Text>
            }
            IconBadgeStyle={styles.alertBall}
            Hidden={item.alerts==0}
            />
            <Text style={styles.labelText}>{item.name}</Text>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={3} />
      </View>

      :

      <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
          <Text style={styles.noPinsText}>Find a hotspot you'll love.</Text>
          <View style={{marginTop: 15}}>
          <Image
          style={{width: 125, height: 125}}
          source={require("../../images/map.png")} />
          </View>
        </View>
    }

    </View>*/
    return (
      <LinearGradient start={{x:0.8, y: 0.3}} colors={['#EAC149', '#E23025']} style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}}>
        <View>
          <StatusBar barStyle="light-content" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("../../images/profile-backdrop.png")}
            style={{width: width, marginTop: -415}}
          >
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 410, marginRight: 15, marginBottom: 0}}>
              <TouchableOpacity style={{padding: 20}} onPress={() => navigate('Settings')}>
                <IonIcon name="ios-settings" size={30} color="#FFFFFF" style={{backgroundColor: "transparent"}} />
              </TouchableOpacity>
            </View>
          </Image>

          {/* aeged: user's profile information displayed at top */}
          <ProfileHeader
            //openGallery={this.openGallery}  // disabled this for now
            //profileAvatar={this.state.profileAvatar}  // disabled this for now
            fullname={this.props.user.fullname}
            username={this.props.user.username}
            totalViews={this.state.totalViews}
            weeklyViews={this.state.weeklyViews}
          />

          <View style={{flex: 0, alignItems: 'center', paddingTop: 10, paddingBottom: 20,}}>
            <Text style={{color: 'white', backgroundColor: 'transparent', fontSize: 12, fontFamily: 'Avenir', fontWeight: 'bold', letterSpacing: 1}}>PINNED SPOTS</Text>
          </View>

          {/* aeged: user's pinned groups  */}
          {
            // Ternary statement: if there are pinned groups, show them. If not, "Find a hotspot you'll love."
            //(this.props.spots.pinnedGroups.length > 0)
            (this.props.spotArray.length > 0)
            ?
            <ProfileContentPinnedGroups
              pinnedGroups={this.props.spots.pinnedGroups}
              feed={this.props.posts.posts}
              data={this.props}
            />
            :
            <ProfileContentGetStarted
            nav={navigate}/>
          }
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
