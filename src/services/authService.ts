import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

// types
import {SignUpData} from "../types/UserInput";

type AuthUser = FirebaseAuthTypes.User | void;

class AuthService {
  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      return user;
    } catch (e) {
      console.error('Error in signIn()', e);
      e instanceof Error && alert(e.message);
    }
  }

  async signUp(data: SignUpData): Promise<AuthUser> {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(data.email, data.password);
      return user;
    } catch (e) {
      console.error('Error in signUp()', e);
      e instanceof Error && alert(e.message);
    }
  }

  async signOut(): Promise<boolean> {
    try {
      await auth().signOut();
      return true;
    } catch (e) {
      console.error('Error in signOut()', e);
      e instanceof Error && alert(e.message);
      return false;
    }
  }

  get uid(): string {
    const uid = auth().currentUser?.uid;

    if (!uid) {
      throw new Error('User is not registered');
    }

    return uid;
  }
}

export default new AuthService();
