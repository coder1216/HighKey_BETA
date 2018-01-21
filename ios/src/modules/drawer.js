import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View, Text, FlatList, TouchableOpacity} from 'react-native';

//UI
import {  Divider, Subtitle, Caption, Image as ImageShoutem, Text as TextShoutem} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AmaroImage extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}
	render() {
		return (
       <View style={styles.content}>
          <View style={styles.drawerTop}>
            <Image
              styleName="medium-avatar"
              source={require('../images/temp/profile.jpeg')}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{this.props.user.name}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.menuRow}>
              <TextShoutem>Account settings</TextShoutem>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <TextShoutem>Food preferences</TextShoutem>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <TextShoutem>Analytics</TextShoutem>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <TextShoutem>Food logs</TextShoutem>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <TextShoutem>Diet settings</TextShoutem>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <TextShoutem>Log out</TextShoutem>
            </TouchableOpacity>
          </View>
          <View style={styles.social}>
            <Icon name="facebook" style={styles.socialIcon} />
            <Icon name="twitter" style={styles.socialIcon} />
            <Icon name="instagram" style={styles.socialIcon} />
          </View>
       </View>
	    );
	}
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff'
  },
  name: {
    marginTop: 20,
    color: '#fff'
  },
  drawerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width*0.8,
    height: 200,
    backgroundColor: 'rgba(255, 204, 1, 1)'
  },
  menuRow: {
    padding: 13,
    width: Dimensions.get('window').width*0.8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  social: {
    flexDirection: 'row',
    position: 'relative',
    bottom: -40
  },
  socialIcon: {
    margin: 20
  }
});