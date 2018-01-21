import React from 'react';
import { StyleSheet } from 'react-native';
import {
  height,
  width,
  template_width,
  template_height,
  scaleDimension,
  ratio
} from './StyleDimensions';

const styles = StyleSheet.create({
  viewBackground: {
    color: 'red'
  },

  bgImage: {
    width: width,
    height: height,
    position: 'absolute'
  },

  backButton: {
    flex: 1,
    position: 'absolute',
    marginLeft: 20,
    top: 25,
    justifyContent: 'flex-start'
  },

  signupLogo: {
    width: 91,
    height: 90,
    //width: scaleDimension(width, ratio(170, template_width)),
    //height: scaleDimension(height, ratio(170, template_height)),
    //marginTop: 100,
    //marginTop: 68,
    marginTop: 58,
    marginBottom: 100,
    //resizeMode: 'cover'
    resizeMode: 'contain'
  },

  loginLogo: {
    width: 72,
    height: 90,
    //width: scaleDimension(width, ratio(140, template_width)),
    //height: scaleDimension(height, ratio(140, template_height)),
    marginTop: 68,
    marginBottom: 100,
    //resizeMode: 'cover',
    resizeMode: 'contain'
  },

  textFieldContainer: {
    flex: 0,
    flexDirection: 'column',
    //marginTop: 40,
    alignItems: 'center'
  },

  textField: {
    height: 40,
    width: width * 0.8,
    margin: 3,
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1
    //borderRadius: 5,
  },

  button: {
    marginTop: 40,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 22,
    //width: 120,
    width: scaleDimension(width, ratio(120, template_width)),
    //height: 45,
    height: scaleDimension(width, ratio(45, template_width)),
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    //marginTop: 12,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  bottomTextContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    //alignItems: 'center',
    position: 'absolute',
    bottom: 20
  },

  middleTextContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    //alignItems: 'center',
    position: 'absolute',
    bottom: 100
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir',
    textAlign: 'center'
  },

  navigateText :{
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },

  subtext: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Avenir',
    textAlign: 'center'
  },

  linkText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});

export default styles;
