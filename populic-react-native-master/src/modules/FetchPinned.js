/**
 *
 * Module for fetching pinned communities.
 */
import React from 'react';
import { SERVER } from '../config/server';
import axios from 'axios';

export const FetchPinned = function(props) {

  axios.get(SERVER + '/api/users/getPins', {
    headers: {
      'Authorization': `Bearer ${props.token}`
    }
  })
  .then((response) => {
    console.log("Pins fetched: ", response.data.data);
    props.pinnedGroups(response.data.data.pins);
  })
  .catch(function (error) {
    console.log("Could not get pinned spots: ", error);
  });

};
