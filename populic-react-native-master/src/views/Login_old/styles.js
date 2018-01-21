import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  overlay: {
    backgroundColor: 'rgba(135, 183, 232, 0.9)',
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 30
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 96, 202, 0.2)'
  },
  topLoginImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200
  },
  content: {
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent'
  },
  logoImage: {
    width: 100,
    height: 100
    // marginTop: -70,
    // padding: 30,
    // borderColor: '#e9e9e9',
    // borderWidth: 1
  },
  inputTop: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    padding: 10,
    marginTop: 7,
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomColor: '#999',
    borderBottomWidth: 1
  },
  inputBottom: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  forget: {
    color: '#fff',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#fff',
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  logo: {
    marginTop: -100,
    transform: [{ scale: 0.75 }]
  }
});

export default styles;
