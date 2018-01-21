import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
  View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  textField: {
    height: 40,
    width: width * 0.75,
    backgroundColor: 'white',
    margin: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  buttonStyle: {
    backgroundColor: '#3B5998',
    width: width * 0.75,
    height: 50,
    margin: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 12,
    borderColor: '#2B1291',
    alignSelf: 'center',
  },
});

var dismissKeyboard = require('dismissKeyboard')

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

export default class FBLogin extends Component {
  render() {
    //console.log(this.result);
    const data = this.props.data || 'No data';
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333333'}} >
      <StatusBar barStyle="light-content" />
        <Text style={{color: 'white', fontSize: 22, margin: 20}}>
          Hi {data.firstName}!
        </Text>
        <Image
          style={{width: 100, height: 100, borderRadius: 50}}
          source={{uri: data.imageUrl}}
        />
        <Text style={{color: 'white', fontSize: 18, margin: 20}}>
          Enter your username and you're ready to go!
        </Text>
        <TextInput
          style={styles.textField}
        />
        <TouchableOpacity style={styles.buttonStyle}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center', margin: 12}}>Done</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
