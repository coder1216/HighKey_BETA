import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
    TouchableHighlight,
  ScrollView,
  Dimensions,
    Modal,
  View } from 'react-native';
import {connect} from "../../views/Challenge/connect";
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
var Challenge1 = require('../Challenge/startGame')
export const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

  nameText: {
    fontSize: 18,
    fontFamily: 'Verdana',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },

  header: {
    color: 'white',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
  },

  comName: {
    color: 'white',
  },

  comImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },

});

var dismissKeyboard = require('dismissKeyboard')
/*
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;*/

export default class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    gesturesEnabled: false,
      modalVisible: false,

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
     <Icon name="user" size={15} style={{ color: tintColor }}/>
    ),
  };
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,

//        this._onPress()=this.onPress().bind(this);

        }



    }


    setModalVisible(visible){
        this.setState({modalVisible: visible});
    }

    render() {
    const { navigate } = this.props.navigation;
    //console.log(this.result);
    const data = this.props.data || 'No data';
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#333333'}}>
      <StatusBar barStyle="light-content" />

        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end', margin: 25, marginBottom: 5}}>
        <TouchableOpacity onPress={() =>{ this.setModalVisible(true); } }>
            {/*navigate('Settings', {name: 'gkfjgj'})}>*/}
        <IonIcon name="ios-settings" size={40} color="#FFFFFF" style={{backgroundColor: "transparent"}} />
        </TouchableOpacity>
        </View>

        <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: 10, marginTop: 5, marginBottom: 30}}>
        <View style={{flex: 0, flexDirection: 'row', margin: 10}}>
        <Image
        style={{width: 100, height: 100, borderWidth: 4, borderColor: '#FFCC00', borderRadius: 50}}
        source={require('../../images/portrait_gold.png')} />

        </View>

          <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
            <Text style={styles.nameText}>@patriciac</Text>
            <Text style={styles.nameText}>Patricia Cole</Text>
          </View>

        </View>

        <View style={{flex: 0, flexDirection: 'column', marginTop: 30}}>
          <View style={{flex: 0, marginLeft: 25, marginBottom: 10}}>
            <Text style={styles.header}>My communities:</Text>
          </View>
          <View style={{flex: 0, flexDirection: 'row', paddingRight: 10, backgroundColor: '#4D4D4D', paddingTop: 5, paddingLeft: 20}}>
          <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
            <Image
            style={styles.comImage}
            source={require('../../images/add_button.png')} />
            <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.comName}></Text>
            </View>
          </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Image
            style={styles.comImage}
            source={require('../../images/community.png')} />
            <Image
            style={styles.comImage}
            source={require('../../images/community.png')} />
            <Image
            style={styles.comImage}
            source={require('../../images/community.png')} />
            <Image
            style={styles.comImage}
            source={require('../../images/community.png')} />
            <Image
            style={styles.comImage}
            source={require('../../images/community.png')} />
            </ScrollView>
          </View>
        </View>


        <View style={{flex: 0, flexDirection: 'column'}}>
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', margin: 20, marginTop: 30}}>
            <Image
            style={{width: 20, height: 20}}
            source={require('../../images/pin_white.png')} />
            <Text style={styles.header}>Pinned:</Text>
          </View>
          </View>
          <View style={{flex: 0, flexDirection: 'column', backgroundColor: '#4D4D4D', paddingLeft: 20, paddingRight: 20}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flex: 0, flexDirection: 'row'}}>
              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>

              <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                <Image
                style={styles.comImage}
                source={require('../../images/community.png')} />
                <Text style={styles.comName}>Community</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View  >
          <Modal
              style={""}
              animationType={"slide"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <View style = { position = "absolute"} >
                <TouchableHighlight onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                    <Image  style = { styles.button } source={require('../../images/pin.png')}/>
                </TouchableHighlight>

              <Challenge1></Challenge1>
            </View>

          </Modal>



          <TouchableHighlight onPress={() => {
              //this.props.navigator.push({component:one})
              this.setModalVisible(true)
          }}>
            <View style={styles.challenge}>
              <Text>challenge</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}
