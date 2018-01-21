import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',


  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 204, 1, 0.8)'
  },
  calendar: {
    height: 100,
    marginTop: 60,
    width: Dimensions.get('window').width,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  map: {
    //position: 'absolute',
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
    alignItems: 'center',
  },
  logo: {
    marginTop: -100,
    transform: [{ scale: 0.75 }],
  },
  mealListContainer: {
    height: 100
  },
  mealList: {
    margin: 10,
  },
  mealItem: {
    width: Dimensions.get('window').width*0.45,
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
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  community: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  challenge:{
      position: 'absolute',
      width: 22,
      height: 22,
      bottom:10,
      right:10,
      backgroundColor:"red"
  },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
    modal4: {
        height: 300
    },
    popScreen:{
      width:20,
        height:10
    },
    crossButton:{
            position:"absolute",
            left:280,
            top:(Dimensions.get('window').height)/30-10,
            height: 10,
            width:10

    }
});

export default styles;