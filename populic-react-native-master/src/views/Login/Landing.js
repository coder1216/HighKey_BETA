/*
*   This is the main page the user sees when the app loads.
*   Offers option to Sign Up, or Login.
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Button,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import Video from 'react-native-video';
import axios from 'axios';
import { SERVER } from '../../config/server';
import styles from './styles/LandingStyles';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

/*const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

let user = [
  {
  "name" : "",
  "firstName" : "",
  "lastName" : "",
  "email" : "",
  "imageUrl" : "",
},
];

var logFB = function() {LoginManager.logInWithReadPermissions(['public_profile']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      //alert('Login was successful with permissions: '
        //+ result.grantedPermissions.toString());
        //{Actions.fbLogin(result)}
        //console.log(result.string)
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data
          //alert(accessToken);
          fetch('https://graph.facebook.com/v2.10/me?fields=name,first_name,last_name,email,picture.type(large)&access_token=' + accessToken)
          .then((response) => response.json())
          .then((json) => {
            user.name = json.name
            user.firstName = json.first_name
            user.lastName = json.last_name
            user.email = json.email
            user.imageUrl = json.picture.data.url
            //var profileImageUrl = json.picture.data.url
            //user.id = json.id
            //user.email = json.email
            //alert('Name: ' + user.name);
            { Actions.fbLogin({data: user}) }
          })
          .catch((error) => {
            alert(error);
          })
        })
    }
  },
  function(error) {
    alert('Login failed with error: ' + error);
  }
);
};*/

class Landing extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('userToken').then(value => {
      if (value != null) {
        // put REVOKE API right here when avail
        axios
          .post(SERVER + '/api/auth/updateToken', {
            token: value
          })
          .then(response => {
            //console.log(response);
            let data = {
              token: response.data.data.token,
              user: {
                id: response.data.data.user.id,
                username: response.data.data.user.username,
                fullname: response.data.data.user.fullname
              }
            };

            this.props.userLogin(data);

            AsyncStorage.setItem('userToken', response.data.data.token).then(
              () => {
                //console.log("Token updated!");
                const { navigate } = this.props.navigation;
                navigate('Main');
              }
            );
            //console.log("User: ", this.props.user)
          })
          .catch(error => {
            console.log('Could not fetch new token: ', error);
          });
      } else {
        console.log('Not logged in.');
      }
    });
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  /*<Video
  source={require("../../images/having_fun.mp4")}
  style={styles.fullScreen}
  resizeMode="cover"
  muted={true}
  rate={1}
  onLoad={this.onLoad}
  onBuffer={this.onBuffer}
  repeat={true} />*/

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={styles.fullScreenContainer}>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.fullScreen}
          source={require('../../images/landing_image.png')}/>
        <View
          style={styles.centerContentContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/logo_highkey.png')}/>
          <View
            style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigate('SignUp')}>
              <Text
                style={styles.signupText}>
                SIGN UP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigate('UserLogin')}>
              <Text
                style={styles.loginText}>
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={styles.textContainer}>
          <Text style={styles.text}>
            By signing up, you agree to the{' '}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('http://www.populic.com/terms-of-use.php')}>Terms</Text>
            {' '}and{' '}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('http://www.populic.com/privacy-policy.php')}
                >Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    );
  }
}

// Redux
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
