import React, { Component } from 'react';
import { View, StatusBar, Image, StyleSheet, AsyncStorage, Keyboard, Easing  } from 'react-native';

//Styles
import styles from './styles';


//Modules
import { Auth } from '../../modules/auth';


//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/userAction'

//UI
import { Title, TextInput, Button, TouchableOpacity, Text, Caption, View as ViewShoutem, } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';


import Hash from 'sha256';


function mapStateToProps(state) {
  return {
    test: 'test'
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


class Login extends Component {
  // static navigationOptions = { title: 'Login', header: null };
  static navigationOptions = {
    tabBarLabel: 'Login',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
     <Icon name="bars" style={{color: '#00A8FE'}} size={15}/>
    ),
    tabBarVisible: false,
    showTab: false
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  signup = () => {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }
  login = () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);
    Auth(data, this.props);
    Keyboard.dismiss();
  }
              // <Image source={require('../../images/login_bg.jpeg')} style={styles.topLoginImage}/>
  render() {
      return (
       <View style={styles.container}>
          <StatusBar
            backgroundColor="rgb(135, 183, 232)"
            barStyle="light-content"
          />  
              
              <View style={styles.overlay} >
              </View>
                <View style={styles.inputContainer}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <Icon name="envelope" style={{color: '#333', marginRight: -20}} />
                    <TextInput 
                      placeholder={'Email'}
                      onChangeText={(text) => this.setState({email: text})}
                      underlineColorAndroid='#D0D2D5'
                      style={{backgroundColor: 'transparent', color: '#333', width: 270, paddingLeft: 30}} 
                      placeholderTextColor='#ffffff'
                    />
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <Icon name="lock" style={{color: '#333', marginRight: -20}} />
                    <TextInput 
                      placeholder={'Password'}
                      onChangeText={(text) => this.setState({password: text})}
                      underlineColorAndroid='#D0D2D5'
                      style={{backgroundColor: 'transparent', color: '#333', width: 270, paddingLeft: 30}} 
                      placeholderTextColor='#ffffff'
                      secureTextEntry
                    />
                  </View>
                </View>
                <ViewShoutem styleName="horizontal" style={{margin: 15, marginTop: 40, width: 305}}>
                  <Button styleName="confirmation" onPress={this.login} style={{backgroundColor: '#00A8FE'}}>
                    <Text style={{color: '#fff'}}>LOGIN</Text>
                  </Button>

                </ViewShoutem>

                <TouchableOpacity style={{marginTop: 100}} onPress={this.signup}>
                  <Caption styleName="h-center" style={{color: '#D0D2D5'}}>CREATE NEW ACCOUNT</Caption>
                </TouchableOpacity>
          
        </View>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);