import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from "react-native";
import Toast from "react-native-toast-message";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// components
import Providers from "./Providers";

// pages
import Home from "./pages/home";
import AddMemoryPage from "./pages/addMemoryPage";
import Profile from "./pages/profile";
import ProfileEdit from "./pages/profileEdit";
import Zoom from "./pages/zoom";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import ForgetPassword from "./pages/forgetPassword";

// hooks
import useAuth from "./hooks/useAuth";

// utils
import initializeFirebaseApp from "./utils/initializeFirebaseApp";
import initializeColors from "./utils/initializeColors";

// constants
import appNavigatorOptions from "./constants/appNavigatorOptions";
import appNotAuthNavigatorOptions from "./constants/appNotAuthNavigatorOptions";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const { user, loading } = useAuth(isInitialized);

  useEffect(() => {
    initializeColors();

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
                <Stack.Screen name="home" component={Home} options={{ animation: 'fade' }} />
                <Stack.Screen name="add-memory" component={AddMemoryPage} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="profile-edit" component={ProfileEdit} options={{ title: 'Profile Edit' }} />
                <Stack.Screen name="zoom" component={Zoom} options={{ animation: 'none', headerStyle: {backgroundColor: '#000'} }} />
              </Stack.Navigator>
              :
              <Stack.Navigator screenOptions={appNotAuthNavigatorOptions} initialRouteName="sign-in">
                <Stack.Screen name="sign-in" component={SignIn} />
                <Stack.Screen name="sign-up" component={SignUp} />
                <Stack.Screen name="forget-password" component={ForgetPassword} />
              </Stack.Navigator>
            }
          </NavigationContainer>
          <Toast />
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
