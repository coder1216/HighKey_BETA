import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

export const {height, width} = Dimensions.get('window');

const profileHeight = height * 0.15;
//const sectionHeight = height * 0.17;
//const imgHeight = height * 0.10;
const imgHeight = height * 0.115;
// Calculated using iPhone 6/7/8 screen size as a base
// iPhone 6 screen dimensions: 375x559
// calculate the ratios so that we can size all styles accordingly
const ratioWidth  = width / 375;
const ratioHeight = height / 559;
// Take current screen width, create ratio using iPhone 6 width, multiply by spotContainerWidth
const spotContainerWidth = 100 * ratioWidth;

const styles = StyleSheet.create({

  bgImage: {
    width: width,
    height: height,
    position: 'absolute',
  },

  gradient: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    justifyContent: 'flex-end'
  },

  /*profileButton: {
    borderRadius: profileHeight / 2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#333333',
    shadowOpacity: 0.4,
  },

  profileImage: {
    //width: 100,
    //height: 100,
    width: profileHeight,
    height: profileHeight,
    //borderWidth: 5,
    //borderColor: '#FFCC00',
    borderWidth: 2,
    borderColor: 'white',
    //borderRadius: 50,
    borderRadius: profileHeight / 2,
    //shadowRadius: 5,
    //shadowOffset: { width: 10, height: 10 },
    /shadowColor: 'black',
    //shadowOpacity: 1.0,
  },*/

  nameText: {
    fontSize: 17,
    fontFamily: 'Avenir-Heavy',
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },

  nickText: {
    fontSize: 14,
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 3,
    //fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },

  detailText: {
    fontSize: 13,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir-Medium',
    color: 'white',
    //fontWeight: 'bold',
    marginRight: 8,
    textAlign: 'left',
    justifyContent: 'center',
  },

  detailTextRight: {
    fontSize: 13,
    backgroundColor: 'transparent',
    fontFamily: 'Avenir-Medium',
    color: 'white',
    //fontWeight: 'bold',
    marginLeft: 8,
    textAlign: 'left',
    justifyContent: 'center',
  },

  /*header: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
  },*/

  noPinsText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /*userSpots: {
    flex: 0,
    //height: 120,
    height: sectionHeight,
    flexDirection: 'row',
    paddingRight: 10,
    backgroundColor: '#1A1A1A',
    paddingTop: 3,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
  },

  pinnedSpots: {
    flex: 0,
    //height: 115,
    height: sectionHeight,
    flexDirection: 'column',
    backgroundColor: '#1A1A1A',
    paddingTop: 3,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
  },*/

  comName: {
    color: 'white',
  },

  itemButton: {
    borderRadius: imgHeight / 2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#333333',
    shadowOpacity: 0.6,
  },

  spotButton: {
    marginLeft: 4,
    marginRight: 4,
    width: spotContainerWidth,
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

  comImage: {
    //width: 75,
    //height: 75,
    width: imgHeight,
    height: imgHeight,
    //marginRight: 15,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: imgHeight / 2,
    //marginTop: 5,
    //marginLeft: 5,
    //marginRight: 5,
    marginBottom: 3,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },

  labelText: {
    flex: 0,
    //color: 'black',
    color: 'white',
    fontSize: 11,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    overflow: 'hidden',
    //backgroundColor: 'white',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    //borderRadius: 8,
    borderRadius: 6,
    padding: 5,
    paddingTop: 2,
    textAlign: 'center',
    //width: 80,
    height: 20,
    marginBottom: 10,
    //paddingLeft: 5,
    //paddingTop: 5,
  },

  addImage: {
    //width: 75,
    //height: 75,
    width: imgHeight,
    height: imgHeight,
    marginRight: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },

  alertBall: {
    width: 22,
    height: 22,
    backgroundColor: 'white',
  },

});

export default styles;
