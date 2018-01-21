import React, { Component } from 'react';
import { View, Text, Navigator, StatusBar, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import NavigationBar from 'react-native-navbar';
import SettingsList from 'react-native-settings-list';
import IconCustom from '../../config/icons';

export const { height, width } = Dimensions.get('window');

// resets the Navigation Stack (gets rid of old screens, navigates back to Landing screen)
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Landing'})
  ]
})

export default class App extends Component {
  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = { switchValue: true };
  }

  logoutUser = () => {
    console.log('logoutUser() called.')
    AsyncStorage.removeItem('userToken').then(() => {
      //const { navigate } = this.props.navigation;
      //navigate('Landing');
      this.props.navigation.dispatch(resetAction)
    });
  };

  render() {
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;

    const titleConfig = {
      title: 'Settings',
      style: {fontFamily: 'Avenir-Heavy', fontWeight: '700', fontSize: 18},
      tintColor: 'white'
    }

    const doneConfig = {
      title: 'Done',
      tintColor: '#4da6ff',
      handler: () => goBack()
    };
    return (
      <View style={{ backgroundColor: '#262626', flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationBar
          title={titleConfig}
          rightButton={doneConfig}
          tintColor="#262626"
        />
        <View style={{marginTop: 10}}/>
        <View style={{ backgroundColor: '#262626', flex: 1 }}>
          <SettingsList
            backgroundColor="#262626"
            borderColor="#FFFFFF"
            defaultTitleStyle={{ color: 'white' }}
            defaultItemSize={70}>
            <SettingsList.Item
              hasSwitch={false}
              hasNavArrow={true}
              onPress={() => navigate('AppInfo')}
              arrowIcon={
                <IconCustom
                  name="Upcoming"
                  size={20}
                  color="#E24825"
                  style={{marginTop: 25, marginRight: width / 1.6}}
                />
              }
              title="Upcoming"
              titleStyle={{fontFamily: "Avenir-Heavy", fontSize: 16, color: 'white'}}
            />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title="Notifications"
              titleStyle={{fontFamily: "Avenir-Heavy", fontSize: 16, color: 'white'}}
            />
            <SettingsList.Item
              hasSwitch={false}
              hasNavArrow={false}
              onPress={() => navigate('AppInfo')}
              title="About"
              titleStyle={{fontFamily: "Avenir-Heavy", fontSize: 16, color: 'white'}}
            />
          </SettingsList>
          </View>
          <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', marginTop: 30}}>
          <TouchableOpacity
          style={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'white',
          borderRadius: 22,
          width: 110,
          height: 40,
          justifyContent: 'center'}}
          onPress={this.logoutUser}>
            <Text
            style={{color: 'white',
            fontSize: 16,
            fontFamily: 'Avenir',
            fontWeight: 'bold',
            //marginTop: 12,
            textAlign: 'center',
            backgroundColor: 'transparent'}}>
            LOG OUT
            </Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}
