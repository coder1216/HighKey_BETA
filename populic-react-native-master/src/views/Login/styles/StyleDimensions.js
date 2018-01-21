import React from 'react';
import { Dimensions } from 'react-native'

export const { height, width } = Dimensions.get('window');

// exact dimensions based off Theo's sketch dimensions (iPhone 6/7/8 Plus sizes)
// (used to create accurate ratios and placement of UI elements)
export const template_width = 414;
export const template_height = 736;

// simple function to calculate ratios (for easier to read code)
// this is used to get the ratio of original UI elements to better create adaptable layouts
export const ratio = (numerator, denominator) => {
  return (numerator/denominator);
}

// simple function to calculate the proper dimension of a UI element
// just need the width of screen and the ratio of the UI element
export const scaleDimension = (newDimension, dimensionRatio) => {
  return newDimension * dimensionRatio;
}
