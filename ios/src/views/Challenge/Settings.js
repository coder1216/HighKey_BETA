import React, { Component } from 'react';
import { View, Text, Navigator, StatusBar,Image,StyleSheet, Button, Dimensions, TouchableOpacity,TouchableHighlight,Modal } from 'react-native';

import NavigationBar from 'react-native-navbar';
import SettingsList from 'react-native-settings-list';
import Challenge from '../../views/Challenge/Challenge';


export default class App extends Component {

  constructor(props){
    super(props);
    // this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: true};
  }

  clickApprove(){
      this.props.confirm();
      this.props.show(false);
  }

  clickDecline(){
        this.props.decline(true);
        this.props.show(false);
  }

  render() {
    // const {goBack} = this.props.navigation;
    // const { navigate } = this.props.navigation;
    const doneConfig = {
      title: 'Done',
      tintColor: '#4da6ff',
      handler: () => goBack(),
    };

    return (<View>
        <Modal
            animationType={'fade'}
            visible={this.props.visible}
        >
      <View style={{backgroundColor: 'white', flex: 1}}>



           {/*<Text tyle={{color: 'red'} }> Hello world!</Text>*/}
            <Image source={require('../../images/joe.png')} style={styles.container} >
                {/*<TouchableOpacity  onPress={() => { navigate('Map', {name: 'Testconfirm'}); }} >*/}
                {/*<view style={{width: 80, height: 80,}}>*/}
                    {/*<Text style={  color ='white'} >*/}
                        {/*Trojans!*/}
                    {/*</Text>*/}
                {/*/!*</TouchableOpacity>*!/*/}
                {/*</view>*/}


                    <View style={{flexDirection:'row', alignItems: 'center',}}>
                        <TouchableOpacity  onPress={() => {this.props.show(false)}}>
                            <Image
                                style = {styles.backIcon}
                                source={require('../../images/back.png')}
                            />
                        </TouchableOpacity>
                        <View>
                        {/*<Text style={{ fontWeight: 'bold',fontSize:30}}>Trojans</Text>*/}
                        {/*<Text style={{color: 'white' ,fontSize:12,top:25,left:-100}}>maggietr | 9h ago</Text>*/}
                        </View>
                    </View>

                {/*<Image source={require('../../images/sticker.png')} style={{width: 40, height: 40,top:200,left:40}}  >*/}

                {/*</Image>*/}
                <View style={styles.btns}>
              <TouchableOpacity  onPress={() => {this.clickApprove()}} style={styles.touchButton}>
                <Image source={require('../../images/approve.png')} style={styles.buttonImage}  >

                </Image>

              </TouchableOpacity>

              <TouchableOpacity  onPress={() => {this.clickDecline()}} style={styles.touchButton2}>
                  <Image source={require('../../images/decline.png')} style={styles.buttonImage2}  >
                  </Image>
              </TouchableOpacity>
                </View>


        </Image>

        {/*</View>*/}
      </View>
        </Modal>
        </View>
    )
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    },
    touchButton: {
        width:((Dimensions.get('window').width)/10) * 3,
        height:(Dimensions.get('window').width)/10,
        left: (Dimensions.get('window').width)/6,
        top: (Dimensions.get('window').height) - ((Dimensions.get('window').width)/10 )* 4,

    },

    touchButton2: {
        width:((Dimensions.get('window').width)/10) * 3,
        height:(Dimensions.get('window').width)/10,
        left: (Dimensions.get('window').width)/5+10,
        top: (Dimensions.get('window').height) - ((Dimensions.get('window').width)/10 )* 4,
    },

    backIcon:{
        width:50,
        height:50,
        alignItems: 'center',
    },

    buttonImage: {
        flex: 1,
        width:((Dimensions.get('window').width)/10) * 3,
        height: (Dimensions.get('window').width)/10,
    },

    buttonImage2: {
        flex: 1,
        width:((Dimensions.get('window').width)/10) * 3,
        height: (Dimensions.get('window').width)/10,
    },

    btns:{
        flexDirection:'row',
        alignItems:'center',
    }

})


