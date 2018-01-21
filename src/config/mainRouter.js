import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

//import Login from '../views/Login';
import Signup from '../views/Signup';
import Map from '../views/Map';
//import Camera from '../views/Camera';
//import Profile from '../views/Profile';

import {Tabs} from './router';

//import Login from '../views/Login/Login';
//import FBLogin from '../views/Login/FBLogin';
//import EmailLogin from '../views/Login/EmailLogin';
import Camera  from '../views/Camera/CameraView';
import Preview from '../views/Camera/Preview';
import Profile from '../views/Profile/Profile';
import Settings from '../views/Profile/Settings';
import PreviewVideo from '../views/Camera/PreviewVideo';
import Challenges from '../views/Challenge/Challenge';

export const MainRouter = StackNavigator({
    //Login: {
      //screen: Login,
    //},
    //Signup: {
    //  screen: Signup,
    //},
    Main: {
      screen: Tabs,
    },
    Preview: {
      screen: Preview,
    },
    PreviewVideo: {
      screen: PreviewVideo,
    },
    Settings: {
      screen: Settings,
    }

  },
  {
    headerMode: 'none',
  },
  {
     transitionConfig: () => ({
         screenInterpolator: sceneProps => {
             const { layout, position, scene } = sceneProps;
             const { index } = scene;
             const translateX = position.interpolate({
                 inputRange: [index - 1, index, index + 1],
                 outputRange: [layout.initWidth, 0, 0]
             });

             const opacity = position.interpolate({
                 inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                 outputRange: [0, 1, 1, 0.3, 0]
             });

             return { opacity, transform: [{ translateX }] }
         }
     })
 });
