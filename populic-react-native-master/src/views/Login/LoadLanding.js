import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import axios from 'axios';
import { SERVER } from '../../config/server';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bgImage: {
    width: width,
    height: height,
    position: 'absolute'
  }
});

class LoadLanding extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('userToken').then(value => {
      const { navigate } = this.props.navigation;
      if (value != null) {
        // put REVOKE API right here when avail
        axios
          .post(SERVER + '/api/auth/updateToken', {
            token: value
          })
          .then(response => {
            //console.log(response);
            let data = {
              token: response.data.data.token,
              user: {
                id: response.data.data.user.id,
                username: response.data.data.user.username,
                fullname: response.data.data.user.fullname
              }
            };

            this.props.userLogin(data);

            AsyncStorage.setItem('userToken', response.data.data.token).then(
              () => {
                //console.log("Token updated!");
                //const { navigate } = this.props.navigation;
                navigate('Main');
              }
            );
            //console.log("User: ", this.props.user)
          })
          .catch(error => {
            console.log('Could not fetch new token: ', error);
            navigate('Landing');
          });
      } else {
        console.log('Not logged in.');
        navigate('Landing');
      }
    });
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent'
        }}
      >
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.bgImage}
          source={require('../../images/bg_color.png')}
        />
      </View>
    );
  }
}

// Redux
export default connect(mapStateToProps, mapDispatchToProps)(LoadLanding);
