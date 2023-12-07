/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import EmailAuth from './src/EmailAuth';

AppRegistry.registerComponent(appName, () => EmailAuth);
