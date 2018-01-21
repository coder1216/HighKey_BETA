import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Button,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

  viewBackground: {
    color: 'red',
  },

  textField: {
    height: 40,
    width: width * 0.75,
    margin: 3,
    fontFamily: 'Verdana',
    textAlign: 'left',
    backgroundColor: 'white',
    borderColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  signButton: {
    backgroundColor: 'green',
    width: width,
    height: 50,
    margin: 20,
    borderColor: 'white',
    alignSelf: 'center',
  },

  cancelButton: {
    backgroundColor: '#002080',
    width: width,
    height: 50,
    margin: 20,
    borderColor: 'white',
    alignSelf: 'center',
  },

});

let user = [
  {
  "name" : "",
  "firstName" : "",
  "lastName" : "",
  "email" : "",
  "imageUrl" : "",
},
];

registerUser = () => {
  alert("User registered!");
}

const titleConfig = {
  title: 'Create Account',
  tintColor: 'white',
  style: {
    fontFamily: "Verdana",
  },
};

export default class Login extends Component {
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#4AA0DF'}} >
      <StatusBar barStyle="light-content" />
      <NavigationBar
      style={{borderColor: 'white', borderBottomWidth: 1}}
      title={titleConfig}
      leftButton={
      <Icon
        name="ios-arrow-back"
        size={30}
        color="#FFFFFF"
        style={{backgroundColor: "transparent", marginTop: 9, marginLeft: 15}}
        onPress={() => goBack()}  />}
      rightButton={
        <Icon
        name="ios-checkmark"
        size={50}
        color="#FFFFFF"
        style={{backgroundColor: "transparent", marginRight: 15}}
        onPress={() => registerUser()} />}
      tintColor="#4AA0DF" />

      <TouchableWithoutFeedback onPress= { () => {Keyboard.dismiss()} }>
      <View style={{flex: 0, marginTop: 40, alignItems: 'center'}}>
        <TextInput style={styles.textField}
        placeholder="  Username"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={(event) => {
          this.refs.nameInput.focus();
        }} />
        <TextInput style={styles.textField}
        ref="nameInput"
        placeholder="  Full name"
        returnKeyType="next"
        onSubmitEditing={(event) => {
          this.refs.emailInput.focus();
        }} />
        <TextInput style={styles.textField}
        ref="emailInput"
        placeholder="  Email              example@abc.com"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={(event) => {
          this.refs.passwordInput.focus();
        }} />
        <TextInput style={styles.textField}
        ref="passwordInput"
        placeholder="  Password            min 6 characters"
        autoCapitalize="none"
        autoCorrect={false}
        password={true}
        returnKeyType="done"
        onSubmitEditing={(event) => {
          registerUser();
        }} />
      </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }
}
