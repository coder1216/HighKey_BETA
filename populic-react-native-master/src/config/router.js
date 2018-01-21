import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

//import Login from '../views/Login';
import Signup from '../views/Signup';
import Map from '../views/Map';
//import Camera from '../views/Camera';
//import Profile from '../views/Profile';

//import Login from '../views/Login/Login';
//import FBLogin from '../views/Login/FBLogin';
//import EmailLogin from '../views/Login/EmailLogin';
import Camera from '../views/Camera/CameraView';
//import Preview from '../views/Camera/Preview';
import Profile from '../views/Profile/Profile';
//import PreviewVideo from '../views/Camera/PreviewVideo';

// export const Tabs = StackNavigator({
// 		Login: {
// 			screen: Login,
// 		},
// 		Signup: {
// 			screen: Signup,
// 		},
// 		Main: {
// 			screen: Main,
// 		},
// 	},
// 	{
//     transitionConfig: () => ({
//         screenInterpolator: sceneProps => {
//             const { layout, position, scene } = sceneProps;
//             const { index } = scene;

//             const translateX = position.interpolate({
//                 inputRange: [index - 1, index, index + 1],
//                 outputRange: [layout.initWidth, 0, 0]
//             });

//             const opacity = position.interpolate({
//                 inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
//                 outputRange: [0, 1, 1, 0.3, 0]
//             });

//             return { opacity, transform: [{ translateX }] }
//         }
//     })
// });

export const Tabs = TabNavigator(
  {
    //Login: {
    //     screen: Login,
    //},
    //Signup: {
    //    screen: Signup,
    //},
    Map: {
      screen: Map
    },
    Camera: {
      screen: Camera
    },
    Profile: {
      screen: Profile
    }
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Map',
    order: ['Map', 'Camera', 'Profile'],
    lazy: true,
    swipeEnabled: false,
    scrollEnabled: true,
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: '#E24825',
      inactiveTintColor: '#E24826',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#2F2F2F'
      }
    }
  }
);
