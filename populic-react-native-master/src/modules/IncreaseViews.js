/**
 *
 * Module for server image information to server
 * SERVER is et in src/config/server
 *
 */
import React from 'react';
import { SERVER } from '../config/server';

export const IncreaseViews = function(id, props) {

  console.log('attempting to increase views');
  console.log('id' + id);
  fetch(SERVER + '/api/posts/increaseViews', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.token
    },
    body: JSON.stringify({
      spot_id: id
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      
    })
    .catch(function(error) {
      console.log(error);
      //props.sfetchPostsFail();
    })
    .done();
};
