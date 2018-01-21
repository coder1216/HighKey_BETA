import React, { Component } from 'react';
import { View, Text, Navigator, StatusBar } from 'react-native';

import NavigationBar from 'react-native-navbar';
import SettingsList from 'react-native-settings-list';

export default class App extends Component {
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: true};
  }
  render() {
    const {goBack} = this.props.navigation;

    const doneConfig = {
      title: 'Done',
      tintColor: '#4da6ff',
      handler: () => goBack(),
    };
    return (
      <View style={{backgroundColor: '#262626', flex: 1}}>
      <StatusBar barStyle="light-content" />
      <NavigationBar
      title={{ title: 'Settings', tintColor: 'white', }}
      rightButton={doneConfig}
      tintColor="#404040" />
        <View style={{backgroundColor: '#262626', flex: 1}}>
          <SettingsList backgroundColor= '#404040' borderColor= '#595959'
          defaultTitleStyle={{color: 'white'}} defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop: 15}}/>
            <SettingsList.Item
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title='Notifications'/>
            <SettingsList.Item
            hasSwitch={false}
            hasNavArrow={true}
            title='Legal'/>
            <SettingsList.Item
            hasSwitch={false}
            hasNavArrow={true}
            title='Support'/>
            <SettingsList.Header headerStyle={{marginTop: 15}}/>
            <SettingsList.Item
            hasSwitch={false}
            hasNavArrow={false}
            title='Log out'/>
          </SettingsList>
        </View>
      </View>
    )
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}
