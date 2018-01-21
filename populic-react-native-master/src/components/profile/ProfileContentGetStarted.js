/*
*   ProfileContentGetStarted.js
*   Component that displays message to user urging them to start pinning spots!
*   Displayed under user's profile information.
*   By @aeged
*/

import React, { Component } from 'react';
import { Image, StyleSheet, Navigator, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import IconCustom from '../../config/icons';

export default class ProfileContentGetStarted extends Component {
  constructor(props){
    super(props);
  }

  // this component should never update, only needs to render once initially
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
        <Text style={styles.noPinsText}>Find a hotspot you'll love.</Text>
        <View style={{marginTop: 15}}>
          <TouchableOpacity onPress={() => this.props.nav("Main")}>
          <IconCustom name="Map-Icon-Fill" size={100} style={{ color: 'white' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
