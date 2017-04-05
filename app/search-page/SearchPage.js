'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Platform
} from 'react-native';

import Styles from './searchPageStyles';
import SearchResults from '../search-results/SearchResults';
import SensorsPage from '../sensors/SensorsPage';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


var ImagePicker = require('react-native-image-picker');


class SearchPage extends Component {
	constructor(props) {

	  super(props);
	  this.state = {
		  searchString: Platform.OS,
		  isLoading: false,
		  message: '',
      avatarSource: require('../Resources/antagosoft.png')
		};
	};

	onSearchTextChanged(event) {
	  this.setState({ searchString: event.nativeEvent.text });
	};
	_executeQuery(query) {
	  this.setState({ isLoading: true });
	  fetch(query)
		  .then(response => response.json())
		  .then(json => this._handleResponse(json.response))
		  .catch(error =>
		     this.setState({
		      isLoading: false,
		      message: 'Something bad happened ' + error
		   }));
	};

	_handleResponse(response) {
	  this.setState({
      isLoading: false,
      message: ''
    });

	  if (response.application_response_code.substr(0, 1) === '1') {
      let navigatorScene = {
            title: 'Property',
            passProps: {listings: response.listings}
          }

      if (Platform.OS =='ios') {
        Object.assign(navigatorScene, {component: SearchResults})
      } else {
        Object.assign(navigatorScene, {id: 'SearchResults'})
      }

      this.props.navigator.push(navigatorScene);
	  } else {
	    this.setState({ message: 'Location not recognized;  try again.'});
	  }
	}

	onSearchPressed() {
	  let query = urlForQueryAndPage('place_name', this.state.searchString, 1);
	  this._executeQuery(query);
	};

  onSensorsPressed() {
    let navigatorScene = {
          title: 'Sensors'
        }

    if (Platform.OS =='ios') {
      Object.assign(navigatorScene, {component: SensorsPage})
    } else {
      Object.assign(navigatorScene, {id: 'SensorsPage'})
    }

    this.props.navigator.push(navigatorScene);
  }

  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        let search = location.coords.latitude + ',' + location.coords.longitude,
            query = urlForQueryAndPage('centre_point', search, 1);

        this.setState({
          searchString: search
        });

        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        });
      });
  }

  onLongPressed() {
    this.setState({
      isLoading: false,
      message: 'Drop it'
    });
  }

  onUploadPressed() {


    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Upload New Logo',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        this.setState({
          message: 'Canseled'
        });
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
  	let spinner = this.state.isLoading ? (<ActivityIndicator size='large' />)
      : (<View/>);

    return (
      <View style={Styles.container}>
        <Image source={this.state.avatarSource} style={Styles.image} />
        <Text style={Styles.description}>
          Help AntagoSoft find new office
        </Text>
        <View style={Styles.flowRight}>
    	    <TextInput
    		    style={Styles.searchInput}
    		    onChange={this.onSearchTextChanged.bind(this)}
    		    value={this.state.searchString}
    		    placeholder='Enter city in GB'/>
      		<TouchableHighlight
            style={Styles.button}
      		  underlayColor='#99d9f4' onPress={this.onSearchPressed.bind(this)} >
      		    <Text style={Styles.buttonText}>Go</Text>
      		</TouchableHighlight>
    	  </View>
        <View>
          <Text style={Styles.description}>OR</Text>
		      <TouchableHighlight
            style={Styles.buttonLocation}
            onPress={this.onSensorsPressed.bind(this)}
		        underlayColor='#99d9f4'
            onLongPress={this.onLongPressed.bind(this)}>
		          <Text style={Styles.buttonText}>Sensors Page</Text>
		      </TouchableHighlight>
          <Text style={Styles.description}>{this.state.message}</Text>
          {spinner}
          <TouchableHighlight
            style={Styles.buttonUpload}
            onPress={this.onUploadPressed.bind(this)}
		        underlayColor='#f811aa'>
		          <Text style={Styles.buttonText}>Upload Photo</Text>
		      </TouchableHighlight>
        </View>
        <Text style={Styles.copyright}>Made by Adam Leos</Text>
      </View>
    );
  }
}

function urlForQueryAndPage(key, value, pageNumber) {
  let data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };

  data[key] = value;

  let querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};

module.exports = SearchPage;
