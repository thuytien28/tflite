/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });
    await tf.ready();
    this.setState({isTfReady: true});

    const converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir);
    const tflite_model = converter.convert();
    open('converted_model.tflite', 'wb').write(tflite_model);

    //  const modelJSON = require('./assets/model/model.json');
    //  const modelWeights = require('./assets/model/weights.bin');
    //  const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights));
    //  model.summary();
    // this.setState({model});
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>TF: {this.state.isTfReady ? 'Ready' : 'Waitingg'}</Text>
        <Text>MODEL: {this.state.model ? 'Ready' : 'Waiting'}</Text>
      </View>
    );
  }
}
