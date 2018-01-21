import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  closeButton: {
    backgroundColor: 'transparent',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 2 },
    textShadowColor: 'black',
  },
  pinButton: {
    backgroundColor: 'transparent',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 2 },
    textShadowColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 0,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height - 150,
    backgroundColor: 'transparent',
    zIndex: 100
  },
  nextButton: {
    position: 'absolute',
    top: 100,
    right: 0,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height - 200,
    backgroundColor: 'transparent',
    zIndex: 100
  },
  blurred: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent'
  },
  blurred: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  spinner: {
    position: 'absolute',
    top: Dimensions.get('window').height/2 - 40,
    left: Dimensions.get('window').width/2 - 40,
  },
});

export default styles;
