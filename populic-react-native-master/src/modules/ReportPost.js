/**
*
* Module for reporting a single inappropriate post.
*
*/

import React from 'react';
import { SERVER } from '../config/server';

export const ReportPost = function(id, props) {

        fetch(SERVER + '/api/posts/report', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + props.token
          },
          body: JSON.stringify({
            post_id: id,
          })
        })
        .then(response => response.json())
        .then(res => {
          console.log("Post reported!");
          alert("Post reported!");
        })
        .catch(function(error) {
          console.log('Could not report: ', error);
        })
        .done()

};
