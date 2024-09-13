/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import 'react-native-gesture-handler';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await notifee.incrementBadgeCount();
});

AppRegistry.registerComponent(appName, () => App);
