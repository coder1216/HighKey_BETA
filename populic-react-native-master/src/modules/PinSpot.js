/**
*
* Module for pinning a spot.
*
*/

import React from 'react';
import { SERVER } from '../config/server';
import { FetchPinned } from '../modules/FetchPinned';

export const PinSpot = function(id, props) {

  fetch(SERVER + '/api/spots/pinSpot', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.token
    },
    body: JSON.stringify({
      spot_id: id,
    })
  })
  .then(response => response.json())
  .then(res => {
    console.log("Spot pinned!");
    props.pinnedSpotUpdate();
    FetchPinned(props);
  })
  .catch(function(error) {
    console.log('Could not pin spot: ', error);
  })
  .done();

};
