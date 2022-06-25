import React from "react";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

// components
import AppBarUser from "../components/common/AppBarUser";

// assets
import {primaryColor} from "../assets/global";

const appNavigatorOptions: NativeStackNavigationOptions = {
  headerRight: () => <AppBarUser />,
  title: 'Memorize App',
  headerStyle: { backgroundColor: primaryColor },
  headerTintColor: '#ffffff',
  animation: 'slide_from_right',
};

export default appNavigatorOptions;
