/*
*   ProfileContentPinnedGroups.js
*   Component that display's user's spots on the provile view.
*   Displayed below profile information.
*   By @aeged
*/

import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Carousel from '../../components/map/Carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconCustom from '../../config/icons';
import NewIcon from 'react-native-icon-badge';
import { FetchPosts } from '../../modules/FetchPosts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/postAction';

import {
  Lightbox,
  Spinner,
} from '@shoutem/ui';

function mapStateToProps(state) {
  return {
    token: state.userReducer.token,
    user: state.userReducer.user,
    spot: state.locationReducer,
    posts: state.postReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class ProfileContentPinnedGroups extends Component {
  constructor(props){
    super(props);
  }

  // only re-render if pinnedGroups changes
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props);
    //console.log(nextProps);
    if(this.props.pinnedGroups == nextProps.pinnedGroups) {
      return false;
    } else {
      return true;
    }
  }

  fetchPosts = id => {
    //console.log('pressed ' + id);
    //console.log("Test", this.props);
    FetchPosts(id, this.props.data);
    this.renderList();
  };

  renderList = (item) => {

    //console.log("Render called.");
    //index = 0;
    //console.log("Testing post: ", this.props.posts.posts);
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
        <Carousel
        name={item}/>
      </View>
    );
  };

  render() {
    //console.log("Render list.");
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
        data={this.props.pinnedGroups}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity key={item.id} style={styles.spotButton}>
          <Lightbox
            swipeToDismiss={false}
            pinchToZoom={false}
            renderContent={() => this.renderList(item.name)}
            renderHeader={close => (
              <View>
              <View style={{ position: 'absolute', top: 15, left: 15}}>
                <TouchableOpacity onPress={close} style={{padding: 15}}>
                  <IconCustom
                    name="Back-Icon"
                    size={20}
                    color="#FFFFFF"
                    style={styles.closeButton}
                  />
                </TouchableOpacity>
              </View>
             
              </View>
            )}
            onOpen={() => this.fetchPosts(item.id)}
            underlayColor={'transparent'}
            backgroundColor={'transparent'}>
            <View style={{flex: 1, alignItems: 'center'}}>
                 <Image
                    style={styles.comImage}
                    resizeMethod={'resize'}
                    source={{ uri: item.image_video_url }}
                  />
              <Text style={styles.labelText}>{item.name}</Text>
            </View>
            </Lightbox>
          </TouchableOpacity>
        )} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContentPinnedGroups);
