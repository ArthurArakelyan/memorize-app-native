import {StatusBar} from "react-native";
import changeNavigationBarColor from "react-native-navigation-bar-color";

// assets
import {primaryDark} from "../assets/global";

const initializeColors = () => {
  changeNavigationBarColor('#F2F2F2', true, false);
  StatusBar.setBackgroundColor(primaryDark, true);
  StatusBar.setBarStyle('light-content', true);
};

export default initializeColors;
