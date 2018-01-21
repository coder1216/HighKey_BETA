/**
 *
 * Module for server image information to server
 * SERVER is et in src/config/server
 *
 */
import React from 'react';
import { SERVER } from '../config/server';
import FastImage from 'react-native-fast-image';

export const FetchPosts = function(id, props) {
  console.log('attempting to save media');
  props.fetchPosts();
  fetch(SERVER + '/api/posts/postsBySpot', {
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
      if (res.status.status === 'success') {
        let posts = [];
        for (let i = 0; i < res.data.posts.length; i++) {
          console.log(res.data.posts[i]);
          if(res.data.posts[i].type == "image") {
            posts.push({
              uri: res.data.posts[i].image_video_url
            });
          }
        }

        console.log(posts);
        FastImage.preload(posts);
        
        props.fetchPostsSuccess(res.data);
        //console.log("Images array: ", res.data);
      }
    })
    .catch(function(error) {
      console.log(error);
      props.fetchPostsFail();
    })
    .done();
};
