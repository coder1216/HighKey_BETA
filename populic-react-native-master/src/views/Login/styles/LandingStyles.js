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
    position: 'absolute',
  },

  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  fullScreen: {
    position: 'absolute',
    //height: height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  centerContentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    //bottom: 200
    bottom: scaleDimension(height, ratio(243, template_height))
  },

  logo: {
    width: 256,
    //width: scaleDimension(width, ratio(190, template_width)),
    height: 82,
    //height: scaleDimension(height, ratio(190, template_height)),
    //marginTop: 80,
    //marginBottom: 60,
    marginBottom: scaleDimension(height, ratio(125, template_height)),
    resizeMode: 'contain'
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  signupButton: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 22,
    //width: 120,
    width: scaleDimension(width, ratio(120, template_width)),
    //height: 45,
    height: scaleDimension(width, ratio(45, template_width)),
    justifyContent: 'center',
    //marginRight: 34
    marginRight: scaleDimension(width, ratio(49, template_width))
  },

  signupText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  loginButton: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 22,
    //width: 120,
    width: scaleDimension(width, ratio(120, template_width)),
    //height: 45,
    height: scaleDimension(width, ratio(45, template_width)),
    justifyContent: 'center'
  },

  loginText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  textContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20
  },

  text: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Avenir'
  },

  linkText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
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
    alignSelf: 'center'
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
    alignSelf: 'center'
  },

});

export default styles;
