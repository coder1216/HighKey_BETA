import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

  viewBackground: {
    color: 'red',
  },
  /*
  textField: {
    height: 40,
    width: 250,
    margin: 20,
    fontFamily: 'Avenir',
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },*/

  logo: {
    width: 170,
    height: 170,
    marginTop: 80,
    marginBottom: 50,
  },

  fbButton: {
    backgroundColor: '#3B5998',
    width: width * 0.75,
    height: 50,
    margin: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 12,
    borderColor: 'white',
    alignSelf: 'center',
  },

  mailButton: {
    backgroundColor: '#1473EA',
    width: width * 0.75,
    height: 50,
    margin: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 12,
    borderColor: 'white',
    alignSelf: 'center',
  },

});

const FBSDK = require('react-native-fbsdk');
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
};

export default class Login extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#4AA0DF'}} >
      <Image
      style={styles.logo}
      source={require('../../images/logo_new.png')} />
      <Icon.Button name="facebook" backgroundColor="#3B5998" size={25} style={{height: 40, width: width * 0.6, paddingLeft: 10}} onPress={logFB}>
        <Text style={{flex: 1, paddingRight: 15, fontSize: 15, fontFamily: "Verdana", color: "white", textAlign: 'center'}}>Sign in with Facebook</Text>
      </Icon.Button>
      <Text style={{color: 'white', fontSize: 11, marginBottom: 28, fontFamily: "Verdana", marginTop: 7}}>We'll never post to Facebook without your permission.</Text>
      <Icon.Button name="envelope" backgroundColor="#1473EA" size={25} style={{height: 40, width: width * 0.6, paddingLeft: 10}} onPress={() => Actions.email({title: 'Email'})}>
        <Text style={{flex: 1, paddingRight: 25, fontSize: 15, fontFamily: "Verdana", color: "white", textAlign: 'center'}}>Sign up with Email</Text>
      </Icon.Button>
      <Text style={{color: 'white', fontSize: 14, fontFamily: "Verdana", marginBottom: 28, marginTop: 7}}>Already have an account?
        <TouchableOpacity style={{width: 59, height: 13}}>
        <Text style={{color: 'white', fontSize: 14, fontFamily: "Verdana", fontWeight: 'bold'}}> Log in!</Text>
        </TouchableOpacity>
      </Text>
      <View style={{flex: 0, justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', bottom: 10}}>
      <Text style={{color: 'white', fontSize: 11, fontFamily: "Verdana"}}>By using Spotlight you agree to the terms and conditions.</Text>
      </View>
      </View>
    );
  }
}
