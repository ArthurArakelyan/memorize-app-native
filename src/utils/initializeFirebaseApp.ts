import firebase, {ReactNativeFirebase} from "@react-native-firebase/app";

const credentials = {
  appId: process.env.APP_ID || '',
  apiKey: process.env.API_KEY || '',
  authDomain: process.env.AUTH_DOMAIN || '',
  storageBucket: process.env.STORAGE_BUCKET || '',
  messagingSenderId: process.env.MESSAGIN_SENDER_ID || '',
  projectId: process.env.PROJECT_ID || '',
  databaseURL: process.env.DATABASE_URL || '',
};

const initializeFirebaseApp = async (): Promise<ReactNativeFirebase.FirebaseApp | void> => {
  try {
    if (firebase.apps.length) {
      return firebase.app();
    }

    return firebase.initializeApp(credentials);
  } catch (e) {
    console.error('Error in initializeFirebaseApp()', e);
  }
};

export default initializeFirebaseApp;
