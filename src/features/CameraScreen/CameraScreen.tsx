import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CameraPermission } from 'models/defaults';
import { Routes } from 'navigation/routes';
import { NavigationActions } from 'react-navigation';
import { observer, inject } from 'mobx-react';
import { USER_SETTINGS_STORE } from 'store/userSettings';
import CameraRoll from '@react-native-community/cameraroll';

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

@inject(USER_SETTINGS_STORE)
@observer
export class CameraScreen extends PureComponent<IProps> {
  public takePicture = async (camera) => {
    const options = { quality: 0.5, base64: false };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    await CameraRoll.saveToCameraRoll(data.uri, 'photo');
    this.props[USER_SETTINGS_STORE].setUserPhoto(data.uri)
    this.props.navigation.navigate(
      Routes.UserStack,
      {},
      NavigationActions.navigate({
        routeName: Routes.UserScreen,
      }),
    );
  };

  public render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={CameraPermission}>
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
