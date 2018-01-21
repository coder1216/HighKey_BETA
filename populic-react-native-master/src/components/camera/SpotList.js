import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Animated
} from 'react-native';
import * as Progress from 'react-native-progress';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/postAction';

import * as Animatable from 'react-native-animatable';

export const { height, width } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    spot: state.spotReducer,
    userLocation: state.locationReducer.userLocation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({
  comList: {
    width: width,
    height: 100,
    backgroundColor: 'rgba(77, 77, 77, 0.5)'
  },

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
  }
});

var isEmpty = true;

class SpotList extends Component {
  constructor(props) {
    super(props);
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  seeDistance = (item) => {
    //console.log("Teest: ", item);
    let radius = 6371;
    //let aSpot = [];

    let dLat = this.degreesToRadians(item.latitude - this.props.userLocation.latitude);
    let dLong = this.degreesToRadians(item.longitude - this.props.userLocation.longitude);

    lat1 = this.degreesToRadians(this.props.userLocation.latitude);
    lat2 = this.degreesToRadians(item.latitude);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLong/2) * Math.sin(dLong/2)
      * Math.cos(lat1) * Math.cos(lat2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      let result = radius * c * 1000;
      console.log("Radius test: ", item.radius);
      console.log("Result test: ", result);

      if (result > item.radius) {
        console.log("Out of range!");
        return false;
      } else {
        console.log("Within a spot radius!");
        isEmpty = false;
        return true;
      }
    }

  setSpot = item => {
    //console.log("Item: ", item);
    let spot = {
      id: item.id,
      name: item.name,
      radius: item.radius,
      latitude: item.latitude,
      longitude: item.longitude,
      image_url: item.image_url
    };
    this.props.selectSpot(spot);
    this.props.setFunction;
    //this.props.elementVisibility = true;
    //this.props.comVisibility = true;
  };

  render() {
    //()=> this.props.onClick()
    /*
    <ScrollView
      horizontal={true}
      swipeToDismiss={true}
      showsHorizontalScrollIndicator={false}
      style={styles.comList}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          zIndex: 3
        }}>
        { this.props.markers.map((item) => (
          <View key={item.id}>
          { this.seeDistance(item) == true ?
          <TouchableOpacity onPress={() => this.setSpot(item)}>
            <View
            style={{ flex: 1, alignItems: 'center' }}>
              <Image
                style={styles.comImage}
                resizeMethod={'resize'}
                source={{ uri: item.image_url }} />
              <Text style={{ flex: 0, color: 'white', fontSize: 12 }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          :
          <View/>
          }
          </View>
        ))}
      </View>
    </ScrollView>
    */
    return (
      <ScrollView
        horizontal={true}
        swipeToDismiss={true}
        showsHorizontalScrollIndicator={false}
        style={styles.comList}>
          <View
          style={{
            flex: 1,
            flexDirection: 'row',
            zIndex: 3
          }}>
          { this.props.markers.map((item) => (
            <View key={item.id}>
            { this.seeDistance(item) == true ?
            <TouchableOpacity
              style={{height: 100}}
              onPress={() => this.setSpot(item)}>
              <View
              style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  style={styles.comImage}
                  resizeMethod={'resize'}
                  source={{ uri: item.image_url }} />
                <Text style={{ flex: 0, color: 'white', fontSize: 12 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
            :
            <View/>
            }
            </View>
          ))}
          { isEmpty == true ?
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', width: width}}>
              <Text style={{fontFamily: 'Avenir-Medium', fontSize: 13, color: 'white', backgroundColor: 'transparent', textAlign: 'center'}}>
              Looks like you're too far away from a spot to post.
              </Text>
              <Text style={{fontFamily: 'Avenir-Medium', fontSize: 13, color: 'white', backgroundColor: 'transparent', textAlign: 'center'}}>
              Try moving closer.
              </Text>
            </View>
            :
            <View/>
          }
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotList);
