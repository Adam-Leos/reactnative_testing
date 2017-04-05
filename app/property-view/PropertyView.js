'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

import Styles from './PropertyViewStyles';

class PropertyView extends Component {
  render() {
    let property = this.props.property,
        stats = property.bedroom_number + ' bed ' + property.property_type,
        price = property.price_formatted.split(' ')[0],
        bathroomWord;

    if (property.bathroom_number) {
      bathroomWord = (property.bathroom_number > 1) ? 'bathrooms' : 'bathroom';

      stats += ', ' + property.bathroom_number + ' ' + bathroomWord;
    }

    return (
      <View style={Styles.container}>
          <Image
             style={Styles.image}
             source={{uri: property.img_url}} />
          <View style={Styles.heading}>
              <Text style={Styles.price}>{price}</Text>
              <Text style={Styles.title}>{property.title}</Text>
              <View style={Styles.separator}/>
          </View>
          <Text style={Styles.description}>{stats}</Text>
          <Text style={Styles.description}>{property.summary}</Text>
      </View>
    );
  }
}

module.exports = PropertyView;
