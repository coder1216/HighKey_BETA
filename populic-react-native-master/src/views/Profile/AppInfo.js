/* Simple view to show information about the app  */

import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import NavigationBar from 'react-native-navbar';



export const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bgImage: {
    width: width,
    height: height,
    position: 'absolute'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  logo: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    width: 201,
    height: 170,
    //marginTop: 80,
    marginBottom: 60,
    resizeMode: 'contain'
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Avenir',
    fontWeight: 'normal',
  },
  emailText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  subtext :{
    color: 'white',
    fontSize: 13,
    fontFamily: 'Avenir'
  },
  linkText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  }
});

export default class AppInfo extends Component {
  constructor() {
    super();
  }

  render() {
    const { goBack } = this.props.navigation;
    const doneConfig = {
      title: 'Done',
      tintColor: '#4da6ff',
      handler: () => goBack()
    };
    return(
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent'
        }}
      >
        <Image
          style={styles.bgImage}
          source={require('../../images/bg_color.png')}
        />
        <StatusBar barStyle="light-content" />
        <View style={{flex: 1, width: width}}>
          <NavigationBar
            title={{ title: 'About', tintColor: 'white' }}
            rightButton={doneConfig}
            tintColor="#404040"
          />
        </View>
        <View
          style={styles.container}
        >
          <Image
            style={styles.logo}
            source={require('../../images/logo_highkey.png')}
          />
          <Text style={styles.text}>
            Thanks for using our app!
          </Text>
          <Text style={styles.text}>
            For contact and support, email {' '}
          </Text>
          <Text
            style={styles.emailText}
            onPress={() => Linking.openURL('mailto:populicoy@gmail.com')}>
            populicoy@gmail.com
          </Text>
        </View>

        <View
          style={{
            flex: 0,
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 20
          }}
        >
          <Text style={styles.subtext}>
            By using our app, you agree to the{' '}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('http://www.populic.com/terms-of-use.php')}>Terms</Text>
            {' '}and{' '}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('http://www.populic.com/privacy-policy.php')}
                >Privacy Policy</Text>.
          </Text>
        </View>

      </View>

    );
  }

}
