import {AppRegistry, StatusBar} from 'react-native';

// components
import App from './src/App';

// assets
import {primaryDark} from "./src/assets/global";

// json
import {name as appName} from './app.json';

StatusBar.setBackgroundColor(primaryDark);
StatusBar.setBarStyle('light-content');

AppRegistry.registerComponent(appName, () => App);
