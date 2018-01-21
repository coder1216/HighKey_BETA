import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
export const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  turn: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 25
  },

  shutter: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },

  progress: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
  },

  //IMAGE VIEW STYLES
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  containerVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  exitIcon: {
    backgroundColor: 'transparent',
    padding: 10,
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 2 },
    textShadowColor: 'black'
  },

  dragArea: {
    flex: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 400
  },

  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  buttons: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    top: height - 100
  },

  comList: {
    width: width,
    height: 100,
    backgroundColor: 'rgba(77, 77, 77, 0.5)'
  },

  sendButton: {
    alignSelf: 'flex-end'
  },

  textField: {
    fontSize: 32,
    width: 195,
    textAlign: 'left',
    flex: 0,
    color: 'white'
  },

  animatedText: {
    flex: 0
  },

  comImage: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: '#1A91E7',
    borderRadius: 35,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },

  selectedCom: {
    width: 75,
    height: 75,
    marginLeft: 10,
    marginBottom: 10
  }
});
