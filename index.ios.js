'use strict'

import React, { Component } from 'react';
import {
  Text,
  NavigatorIOS,
  StyleSheet,
  AppRegistry
} from 'react-native';

import SearchPage from './app/search-page/SearchPage';

class PropertyFinderApp extends Component {

  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: 'Office Finder',
          component: SearchPage
        }}
      />
    );
  }
}

AppRegistry.registerComponent(
    'PropertyFinder',
    function() {
      return PropertyFinderApp
    }
);
