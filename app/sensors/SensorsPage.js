'use strict';

import React, {
  Component
} from 'react';

import Styles from './SensorsPageStyles';

import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text
} from 'react-native';

import { Accelerometer, Gyroscope } from 'react-native-sensors';
//import { decorator as sensors } from 'react-native-sensors';


class SensorsPage extends Component {


  constructor(props) {

	  super(props);
	  this.state = {
		  accelerometer_X: 0,
      accelerometer_Y: 0,
      accelerometer_Z: 0,
		};
	};


  onStartAccelerometer() {
    const accelerationObservable = new Accelerometer({
      updateInterval: 100, // defaults to 100ms
    });

    // Normal RxJS functions
    accelerationObservable.subscribe(
      x => this.setState({
        accelerometer_X: x.x,
        accelerometer_Y: x.y,
        accelerometer_Z: x.z
      })
    );

    setTimeout(() => {
      accelerationObservable.stop();
    }, 1000);
  }


  render() {
    return (
      <View style={Styles.container}>
          <TouchableHighlight
          style={Styles.button}
            onPress={this.onStartAccelerometer.bind(this)}>
            <Text>Accelerometer</Text>
          </TouchableHighlight>
          <Text style={Styles.buttonText}>{this.state.accelerometer_X}</Text>
          <Text style={Styles.buttonText}>{this.state.accelerometer_Y}</Text>
          <Text style={Styles.buttonText}>{this.state.accelerometer_Z}</Text>
      </View>
    );
  }
}



module.exports = SensorsPage;
