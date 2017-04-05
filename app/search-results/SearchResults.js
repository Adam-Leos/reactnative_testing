'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Platform,
  Text
} from 'react-native';

import Styles from './SearchResultsStyles';
import PropertyView from '../property-view/PropertyView';

class SearchResults extends Component {

  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid}
    );

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  renderRow(rowData, sectionID, rowID) {
	  let price = rowData.price_formatted.split(' ')[0];

	  return (
	    <TouchableHighlight
        onPress={() => this.rowPressed(rowData.keywords)}
	      underlayColor='#ddd'>
	        <View>
    	        <View style={Styles.rowContainer}>
      	          <Image style={Styles.thumb} source={{ uri: rowData.img_url }} />
      	          <View  style={Styles.textContainer}>
      	            <Text style={Styles.price}>{price}</Text>
      	            <Text style={Styles.title}
      	                  numberOfLines={1}>{rowData.title}</Text>
      	          </View>
	            </View>
	            <View style={Styles.separator}/>
          </View>
	    </TouchableHighlight>
	  );
	}

  rowPressed(propertyGuid) {
    let navigatorScene,
        property;

    property = this.props.listings.filter(
      prop => prop.keywords === propertyGuid
    )[0];

    navigatorScene = {
          title: 'Property',
          passProps: {property: property},
    }

    if (Platform.OS =='ios') {
      Object.assign(navigatorScene, {component: PropertyView})
    } else {
      Object.assign(navigatorScene, {id: 'PropertyView'})
    }

    this.props.navigator.push(navigatorScene);
	}

  render() {
    return (
      <ListView style={Styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }

}

module.exports = SearchResults;
