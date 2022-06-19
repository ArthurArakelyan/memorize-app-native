import {useEffect, useState} from "react";

import firebase from "@react-native-firebase/app";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

const useAuth = (isInitialized: boolean) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      return;
    }

    return auth().onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user);
    });
  }, [isInitialized]);

  return { loading, user };
};

export default useAuth;
