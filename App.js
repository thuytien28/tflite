/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import {View, Text} from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import {bundleResourceIO} from '@tensorflow/tfjs-react-native';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isTfReady: false,
//     };
//   }

//   async componentDidMount() {
//     // Wait for tf to be ready.
//     await tf.ready();
//     // Signal to the app that tensorflow.js can now be used.
//     this.setState({
//       isTfReady: true,
//     });
//     await tf.ready();
//     this.setState({isTfReady: true});

//     // const converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir);
//     // const tflite_model = converter.convert();
//     // open('converted_model.tflite', 'wb').write(tflite_model);

//     // const modelJSON = require('./assets/logo.png');
//     const modelJSON = require('./assets/models/model.json');
//     const modelWeights = require('./assets/models/model.bin');
//     const model = await tf.loadLayersModel(
//       bundleResourceIO(modelJSON, modelWeights),
//     );
//     model.summary();
//     this.setState({model});
//   }

//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text>TF: {this.state.isTfReady ? 'Ready' : 'Waitingg'}</Text>
//         <Text>MODEL: {this.state.model ? 'Ready' : 'Waiting'}</Text>
//       </View>
//     );
//   }
// }

import React from 'react';
import {View, Text} from 'react-native';
// import {Camera} from 'expo-camera';
import {RNCamera} from 'react-native-camera';
import * as tf from '@tensorflow/tfjs';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

// const TensorCamera = cameraWithTensors(Camera);

export default class MyComponent extends React.Component {
  state = {
    isTfReady: false,
  };

  async componentDidMount() {
    await tf.ready();
    this.setState({isTfReady: true});
    console.log(this.state.isTfReady);
  }

  handleCameraStream(images, updatePreview, gl) {
    const loop = async () => {
      const nextImageTensor = images.next().value;

      //
      // do something with tensor here
      //

      // if autorender is false you need the following two lines.
      // updatePreview();
      // gl.endFrameEXP();

      requestAnimationFrame(loop);
    };
    loop();
  }

  render() {
    // Currently expo does not support automatically determining the
    // resolution of the camera texture used. So it must be determined
    // empirically for the supported devices and preview size.

    let textureDims;
    if (Platform.OS === 'ios') {
      textureDims = {
        height: 1920,
        width: 1080,
      };
    } else {
      textureDims = {
        height: 1200,
        width: 1600,
      };
    }

    return (
      <View>
        <Text>{this.state.isTfReady ? 'Ready' : 'Waiting'}</Text>
        {/* {this.state.isTfReady && (
          <TensorCamera
            // Standard Camera props
            style={{
              zIndex: 0.5,
              width: 200,
              height: 200,
            }}
            type={Camera.Constants.Type.front}
            // Tensor related props
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={200}
            resizeWidth={152}
            resizeDepth={3}
            onReady={this.handleCameraStream}
            autorender={true}
          />
        )} */}
      </View>
    );
  }
}
