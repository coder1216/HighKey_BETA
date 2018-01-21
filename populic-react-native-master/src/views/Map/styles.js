import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 204, 1, 0.8)'
  },
  overlayBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000
  },
  overlayBlurText: {
    color: '#FFF'
  },
  calendar: {
    height: 100,
    marginTop: 60,
    width: Dimensions.get('window').width
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  map: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 96, 202, 0.2)'
  },
  content: {
    alignItems: 'center'
  },
  logo: {
    marginTop: -100,
    transform: [{ scale: 0.75 }]
  },
  mealListContainer: {
    height: 100
  },
  mealList: {
    margin: 10
  },
  mealItem: {
    width: Dimensions.get('window').width * 0.45,
    height: 100
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  mealContainerText: {
    padding: 20
  },
  mealChangeList: {
    marginTop: 10
  },
  mealChangeItem: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    padding: 10
  },
  mealChangeItemTextContainer: {
    marginLeft: 20
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: -35,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  nameLabel: {
    fontFamily: 'Avenir',
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    width: 80,
    backgroundColor: 'transparent',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'black'
  },
  bottomModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  community: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  sendBtn: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.55,
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#4da6ff'
  },
  closeButton: {
    backgroundColor: 'transparent',
    textShadowRadius: 1,
    textShadowOffset: { width: 2, height: 0 },
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  pinButton: {
    backgroundColor: 'transparent',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 2 },
    textShadowColor: 'black',
  },
  sendBtnText: {
    color: '#fff'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height - 80,
    backgroundColor: 'transparent',
    zIndex: 100
  },
  nextButton: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height - 80,
    backgroundColor: 'transparent',
    zIndex: 100
  }
});

export default styles;
