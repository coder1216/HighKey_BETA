/*
*   This is the main page to sign up with a phone number
*/


import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  Button,
  Image,
  Linking,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
//import NavigationBar from 'react-native-navbar';
import LinearGradient from 'react-native-linear-gradient';
import { Keyboard } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { SERVER } from '../../config/server';
import styles from './styles/LoginStyles';

// For animations
import * as Animatable from 'react-native-animatable'

// aeged: for redux state, navigation
//import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

// aeged: for redux state, navigation
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    spot: state.spotReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      nick: '',
      phone: '',
      password: ''
    };
  }

  userRegister = () => {
    console.log(this.state.nick);
    console.log(this.state.password);
    console.log(this.state.fullname);
    console.log(this.state.phone);

    registerErrors = (message) => {
      console.log('Registration error message:', message);
      switch (message) {
        case 'Some fields are empty':
          return 'Please complete all of the forms before submitting!'
          break;
        case 'username_short':
          return 'Your username is too short. Please make sure it\'s 3 or more characters.'
          break;
        case 'username_long':
          return 'Your username is too long. Please make sure it\'s 20 characters or less.'
          break;
        case 'password_short':
          return 'Your password is too short. Please make sure it\'s 3 or more characters.'
          break;
        case 'password_long':
          return 'Your password is too long. Please make sure it\'s 30 characters or less.'
          break;
        case 'fullname_short':
          return 'Your name is too awesomely short for our servers to handle! Please make sure it\'s 3 or more characters.'
          break;
        case 'fullname_long':
          return 'Your name is too awesomely long for our servers to handle! Please make sure it\'s 30 characters or less.'
          break;
        case 'phone_incorrect':
          return 'The phone number entered doesn\'t work. Please try again!'
          break;
        case 'validation_failed':
          return 'Something contains invalid characters.\nTry using: letters, numbers, dashes (-)'
          break;
        case 'undefined_error':
          return 'Something wierd just happened. Please try again, or take a screenshot and email us about this issue!\n\nserver returned undefined_error'
          break;
        default:
          return 'Something wierd just happened. Please try again!'
      }
    }

    axios
      .post(SERVER + '/api/auth/registerUser', {
        username: this.state.nick,
        password: this.state.password,
        fullname: this.state.fullname,
        phone: this.state.phone
      })
      .then(response => {
        console.log('User registered: ', response);
        // aeged: login after user is registered
        //this.loginUserAfterReg();

        if ('success' === response.data.status.status) {
          console.log('loginUserAfterReg was a success.');
          let data = {
            token: response.data.data.token,
            user: {
              id: response.data.data.user.id,
              username: response.data.data.user.username,
              fullname: response.data.data.user.fullname
            }
          };
          // store the token
          this.props.userLogin(data);
          AsyncStorage.setItem('userToken', response.data.data.token);
          // go to the main map screen
          console.log('going to attempt nagivation to main page..');
          const { navigate } = this.props.navigation;
          navigate('Main');
        } else if ('error' === response.data.status.status) {
          alert('Wrong username or password.');
        }
      })
      .catch(error => {
        console.log('Error, user registration not successful.');
        console.log(error);
        Alert.alert(
          'Whoops! 😅 ',
          `${registerErrors(error.response.data.status.error_msg)}`
        )
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
        start={{ x: 0.8, y: 0.3 }}
        colors={['#EAC149', '#E23025']}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>

        {/* start centered view */}
        <View style={{flex:1, alignItems: 'center'}}>

          <StatusBar barStyle="light-content" />
          <Image
            style={styles.signupLogo}
            source={require('../../images/logo_highkey_signup.png')}/>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <View
              style={styles.textFieldContainer}>
              <TextInput
                style={styles.textField}
                ref="fullName"
                placeholder="FULL NAME"
                placeholderTextColor="white"
                autoCorrect={false}
                value={this.state.fullname}
                onChangeText={fullname => this.setState({ fullname })}
                returnKeyType="next"
                onSubmitEditing={event => {
                  this.refs.nick.focus();
                }}/>
              <TextInput
                style={styles.textField}
                ref="nick"
                placeholder="USERNAME"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.nick}
                onChangeText={nick => this.setState({ nick })}
                placeholderTextColor="white"
                returnKeyType="next"
                onSubmitEditing={event => {
                  this.refs.phone.focus();
                }}/>
              <TextInput
                style={styles.textField}
                ref="phone"
                placeholder="PHONE NUMBER"
                placeholderTextColor="white"
                autoCapitalize="none"
                value={this.state.phone}
                onChangeText={phone => this.setState({ phone })}
                onFocus={() => this.setState({ phone: '+1' })}
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={event => {
                  this.refs.password.focus();
                }}/>
              <TextInput
                style={styles.textField}
                ref="password"
                placeholder="PASSWORD"
                placeholderTextColor="white"
                autoCapitalize="none"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                autoCorrect={false}
                password={true}
                blurOnSubmit={true}
                returnKeyType="done"
                onSubmitEditing={this.userRegister}
                secureTextEntry={true}
              />
            </View>
          </TouchableWithoutFeedback>
          {/* SignUp button */}
          { (this.state.fullname.length >= 3) && (this.state.nick.length >= 3) && (this.state.phone.length > 0) && (this.state.password.length >= 3) &&
            <Animatable.View
              animation='bounceIn'>
              <TouchableOpacity
                style={styles.button}
                onPress={this.userRegister}>
                <Text
                  style={styles.buttonText}>
                  SIGN UP
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          }

          <View style={styles.middleTextContainer}>
            <Text style={styles.text}>Already have an account?{' '}
              <Text
                style={styles.navigateText}
                onPress={() => navigate('UserLogin')}
                >Log in</Text>
              .
            </Text>
          </View>

          <View
            style={styles.bottomTextContainer}>
            <Text style={styles.subtext}>By signing up, you agree to the{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL('http://www.populic.com/terms-of-use.php')}
                  >Terms</Text>
              {' '}and{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL('http://www.populic.com/privacy-policy.php')}
                  >Privacy Policy</Text>.
            </Text>
          </View>
        </View>
        {/* end centered view */}
      </LinearGradient>
    );
  }
}

// for redux state, navigation
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
