import React, { Component } from 'react';
import { View, StatusBar, Image, StyleSheet, AsyncStorage, Keyboard, Easing, Slider  } from 'react-native';

//Styles
import styles from './styles';


//Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/userAction'

//UI
import { Title, TextInput, Button, TouchableOpacity, Text, Caption, View as ViewShoutem, Card } from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui'
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

class Signup extends Component {
  // static navigationOptions = { title: 'Login', header: null };
  static navigationOptions = {
    tabBarLabel: 'Progress',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
     <Icon name="bars" style={{color: '#00A8FE'}} size={15}/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  render() {
      return (
            <View style={styles.container}>
              <StatusBar
                backgroundColor="rgb(255, 204, 1)"
                barStyle="light-content"
              />
             
                  <View style={styles.overlay}>
                  </View>
                  <View>
                    <Title styleName="h-center bold bright" style={{marginTop: 80}}>SIGNUP</Title>
                    <View style={styles.inputContainer}>
                      <TextInput 
                        placeholder={'Fullname'}
                        onChangeText={this.setUsername}
                        underlineColorAndroid='rgba(255,255,255, 0.6)'
                        style={{backgroundColor: 'transparent', color: '#4B4B4B', width: 300}} 
                        placeholderTextColor='#ffffff'
                      />
                      <TextInput 
                        placeholder={'Email'}
                        onChangeText={this.setUsername}
                        underlineColorAndroid='rgba(255,255,255, 0.6)'
                        style={{backgroundColor: 'transparent', color: '#4B4B4B', width: 300}} 
                        placeholderTextColor='#ffffff'
                      />
                      <TextInput 
                        placeholder={'Password'}
                        onChangeText={this.setPassword}
                        underlineColorAndroid='rgba(255,255,255, 0.6)'
                        style={{backgroundColor: 'transparent', color: '#4B4B4B', width: 300}}
                        placeholderTextColor='#ffffff'
                        secureTextEntry
                      />
                      <TextInput 
                        placeholder={'Password'}
                        onChangeText={this.setPassword}
                        underlineColorAndroid='rgba(255,255,255, 0.6)'
                        style={{backgroundColor: 'transparent', color: '#4B4B4B', width: 300}}
                        placeholderTextColor='#ffffff'
                        secureTextEntry
                      />
                    </View>
                    <ViewShoutem styleName="horizontal" style={{margin: 15, marginTop: 40}}>
                      <Button styleName="confirmation" onPress={() => this.handleChangeSlide(1)}>
                        <Text>Sign up</Text>
                      </Button>
                    </ViewShoutem>
                  </View>
                    <View style={styles.termsContainer}>
                      <Caption styleName="h-center">By registering, you accept our</Caption><Caption styleName="h-center">Terms of Use and Privacy Policy</Caption>
                    </View>
              
            </View>          
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);