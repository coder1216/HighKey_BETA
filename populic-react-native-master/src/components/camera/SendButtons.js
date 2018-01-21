import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

export const { height, width } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    markers: state.locationReducer.locs,
    spot: state.postReducer.spot
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({
  comImage: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: '#1A91E7',
    borderRadius: 35,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },

  sendButton: {
    alignSelf: 'flex-end'
  }
});

class SendButtons extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props == nextProps) {
      return false;
    }
    else {
      return true;
    }
  }
  render() {
    //const {navigate} = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          width: width
        }}
      >
        <View
          style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start' }}
        >
          <TouchableOpacity onPress={this.props.hideSelection}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              style={styles.comImage}
              source={{ uri: this.props.spot.image_url }}
            />
            <Text style={{ flex: 0, color: 'white', fontSize: 12 }}>
              {this.props.spot.name}
            </Text>
          </View>
          </TouchableOpacity>
        </View>

        {this.props.isVideo ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: 60,
              marginBottom: 15
            }}
          >
            <TouchableOpacity
              style={styles.sendButton}
              onPress={this.changeRate}
            >
              <Text
                style={{
                  color: 'white',
                  backgroundColor: 'transparent',
                  fontSize: 24,
                  fontWeight: 'bold'
                }}
              >
                {/* {this.props.rateText} */}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignSelf: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.props.sendMedia}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                marginBottom: 15,
                marginRight: 10,
                alignSelf: 'flex-end',
                alignItems: 'flex-end'
              }}
              source={require('../../images/send_button.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendButtons);
