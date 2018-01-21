import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  Easing,
  FlatList,
  ScrollView,
  InteractionManager,
  Dimensions,
  TouchableOpacity
} from 'react-native';

//Styles
import styles from './styles';

//Component
import DrawerComponent from '../../modules/drawer';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

//UI
import {
  Title,
  TextInput,
  Button,
  Text,
  Caption,
  View as ViewShoutem,
  NavigationBar,
  Image,
  Divider,
  Subtitle,
  Spinner
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';

//Charts
import { VictoryLine, VictoryGroup, VictoryChart } from 'victory-native';

import Recorder from 'react-native-screcorder';

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Login extends Component {
  static navigationOptions = {
    tabBarLabel: 'Camera',
    tabBarVisible: false,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="camera-retro" style={{ color: tintColor }} size={15} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      interactionsComplete: false,
      url: ''
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ interactionsComplete: true });
    });
  }

  preview = () => {
    this.refs.recorder.save((err, url) => {
      console.log('url = ', url);
      this.setState({ url: url });
    });
  };

  render() {
    const drawerStyles = {
      drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        backgroundColor: '#fff'
      },
      main: { paddingLeft: 3 }
    };
    return (
      <View style={styles.container}>
        <NavigationBar centerComponent={<Title>Camera</Title>} />
        <Recorder
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          device={'back'}
          ref="recorder"
          config={{
            autoSetVideoOrientation: false,

            video: {
              enabled: true,
              bitrate: 2000000, // 2Mbit/s
              timescale: 1, // Higher than 1 makes a slow motion, between 0 and 1 makes a timelapse effect
              format: 'MPEG4',
              quality: 'HighestQuality', // HighestQuality || MediumQuality || LowQuality
              filters: [
                {
                  CIfilter: 'CIColorControls',
                  animations: [
                    {
                      name: 'inputSaturation',
                      startValue: 100,
                      endValue: 0,
                      startTime: 0,
                      duration: 0.5
                    }
                  ]
                },
                { CIfilter: 'CIColorControls', inputSaturation: 0 },
                { CIfilter: 'CIExposureAdjust', inputEV: 0.7 }
              ]
            },
            audio: {
              enabled: true,
              bitrate: 128000, // 128kbit/s
              channelsCount: 1, // Mono output
              format: 'MPEG4AAC',
              quality: 'HighestQuality' // HighestQuality || MediumQuality || LowQuality
            }
          }}
        >
          <TouchableOpacity
            onPress={this.preview}
            style={{ height: 300, justifyContent: 'flex-end' }}
          >
            <Text>Preview</Text>
          </TouchableOpacity>
        </Recorder>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
