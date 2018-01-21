/**
 *
 * Module for server image information to server
 * SERVER is et in src/config/server
 *
 */
import React from 'react';
import { SERVER } from '../config/server';

export const SaveMedia = function(data, props) {
  console.log('attempting to save media');
  props.saveMediaInformation();
  console.log(data);
  fetch(SERVER + '/api/posts/save', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.token
    },
    body: JSON.stringify({
      community_id: data.community_id,
      key: data.key,
      type: data.type
    })
  })
    .then(response => response.json())
    .then(res => {
      //console.log("Sending video!");
      if (res.status.status === 'success') {
        props.selectSpot(null);
        props.setText(null);
        props.saveMediaInformationSuccess();
        const { navigate } = props.navigation;
        navigate('Main');
      }
    })
    .catch(function(error) {
      console.log(error);
      props.saveMediaInformationFail();
    })
    .done();
};
