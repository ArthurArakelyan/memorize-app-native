import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import changeNavigationBarColor from 'react-native-navigation-bar-color';

// components
import Providers from "./Providers";

// pages
import Home from "./pages/home";
import AddMemoryPage from "./pages/addMemoryPage";
import Zoom from "./pages/zoom";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

// hooks
import useAuth from "./hooks/useAuth";

// utils
import initializeFirebaseApp from "./utils/initializeFirebaseApp";

// constants
import appNavigatorOptions from "./constants/appNavigatorOptions";
import appNotAuthNavigatorOptions from "./constants/appNotAuthNavigatorOptions";

// assets
import {primaryDark} from "./assets/global";

const Stack = createNativeStackNavigator();

changeNavigationBarColor('#F2F2F2', true, false);
StatusBar.setBackgroundColor(primaryDark);
StatusBar.setBarStyle('light-content', true);

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const { user, loading } = useAuth(isInitialized);

  useEffect(() => {
    initializeFirebaseApp().then(() => {
      setIsInitialized(true);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Providers>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="height" style={styles.app}>
          <NavigationContainer>
            {user ?
              <Stack.Navigator screenOptions={appNavigatorOptions} initialRouteName="home">
                <Stack.Screen options={{ animation: 'fade' }} name="home" component={Home} />
                <Stack.Screen name="add-memory" component={AddMemoryPage} />
                <Stack.Screen name="zoom" component={Zoom} />
              </Stack.Navigator>
              :
              <Stack.Navigator screenOptions={appNotAuthNavigatorOptions} initialRouteName="sign-in">
                <Stack.Screen name="sign-in" component={SignIn} />
                <Stack.Screen name="sign-up" component={SignUp} />
              </Stack.Navigator>
            }
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Providers>
  );
};

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
  },
});

export default App;
