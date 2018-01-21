/**
 *
 * Module for sending image data to server
 */
import React from 'react';
import { SERVER } from '../config/server';
import { SaveMedia } from './SaveMedia';
import RNFS from 'react-native-fs';

export const SendBack = function(url, image, key, isVideo, props) {
    const { navigate } = props.navigation;
    navigate('Main');
    if (isVideo) {
      var file = {
        uri: image,
        type: 'video/quicktime',
        name: 'video.png'
      };

    } else {
      var file = {
        uri: image,
        type: 'image/png',
        name: 'image.png'
      };
    }
    console.log(file);
    let imgSize = 0;

    RNFS.stat(image)
      .then(result => {
        imgSize = result.size;

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        console.log(imgSize);
        xhr.setRequestHeader('Content-Length', imgSize);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Image uploaded!(from module)', xhr);
              let type = '';
              if(isVideo) {
                type = 'video';
              }
              else {
                type = 'image';
              }
              let data = {
                community_id: props.post.spot.id,
                key: key,
                type: type
              };
              SaveMedia(data, props);
            } else {
              console.log('Could not upload image: ', xhr);
            }
          }
        };
        xhr.send(file);
     })
      .catch(err => {
        console.log('Could not get file info.');
    });
};
