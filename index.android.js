'use strict'

import React, { Component } from 'react';
import {
  Text,
  Navigator,
  StyleSheet,
  AppRegistry
} from 'react-native';

import SearchPage from './app/search-page/SearchPage';
import SearchResults from './app/search-results/SearchResults';
import PropertyView from './app/property-view/PropertyView';

class PropertyFinderApp extends Component {
  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'SearchPage':
        return (
          <SearchPage
            title='Office Finder'
            navigator={navigator}
          />
        )
      case 'SearchResults':
        return (
          <SearchResults
            title={route.title}
            {...route.passProps}
            navigator={navigator}
          />
        )
      case 'PropertyView':
        return (
          <PropertyView
            title={route.title}
            {...route.passProps}
            navigator={navigator}
          />
        )
    }
  }

  render() {
    return (
      <Navigator
            initialRoute={{
              title: 'Office Finder',
              id: 'SearchPage'
            }}
            renderScene={
              this.navigatorRenderScene
            }
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
