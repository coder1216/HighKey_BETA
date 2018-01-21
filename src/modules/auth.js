/**
*
* Auth Modul for login authorizing user's credential with server
* If credential are OK dispatchin userLogin action
* SERVER is et in src/config/server
*
*/
import React from 'react';

import { AsyncStorage } from 'react-native';

//Config
import { SERVER } from '../config/server';
import Hash from 'sha256';



export const Auth = function(state, props){
  console.log('loging attempting to log in');
  console.log(props);
  const { navigate } = props.navigation;
  navigate('Main')
  fetch(SERVER + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password
      })
  })
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    if (res.status === 'ok') {
      let data = {
        email: state.email,
        password: state.password
      };
      data = JSON.stringify(data);
      AsyncStorage.setItem('user', data);

      props.userLogin(res.data);
      navigate('Main')
    }
   })
  .done()
};
