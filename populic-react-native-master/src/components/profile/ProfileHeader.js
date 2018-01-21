/*
*   ProfileHeader.js
*   Component that display's user information on the provile view
*   By @aeged
*/

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default class ProfileHeader extends Component {
  constructor(props) {
    super(props);
  }

  // only re-render if the profile pic or views statistics changes
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props);
    //console.log(nextProps);
    if((this.props.profileAvatar == nextProps.profileAvatar)
      &&
      (this.props.totalViews == nextProps.totalViews)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    //console.log('rendering ProfileHeader');

    return (
      <View style={{flex: 0, alignItems: 'center', flexDirection: 'column', margin: 10, marginTop: 0, marginBottom: 20}}>
        <View style={{flex: 0, flexDirection: 'row', margin: 10, marginTop: 0}}>
          {/* <TouchableOpacity style={styles.profileButton}>
            <Image
              style={styles.profileImage}
              source={{ uri: this.props.profileAvatar }}
            />
          </TouchableOpacity> */}
        </View>

        <View style={{flex: 0, flexDirection: 'column'}}>
          <View>
            <Text style={styles.nameText}>{this.props.fullname}</Text>
            <Text style={styles.nickText}>{`@${this.props.username}`}</Text>
          </View>
          <View style={{flex: 0, flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.detailText}>Total views: {this.props.totalViews}</Text>
            <Text style={styles.detailTextRight}>Weekly views: {this.props.weeklyViews}</Text>
          </View>
        </View>
      </View>
    );
  }
}
