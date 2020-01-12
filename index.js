import {AppRegistry} from 'react-native';
import {App} from './src/App.tsx';
import {name as appName} from './app.json';
import './Reactotron.config';

AppRegistry.registerComponent(appName, () => App);
