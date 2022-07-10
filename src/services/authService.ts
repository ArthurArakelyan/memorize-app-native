import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

// types
import {NewPasswordData, SignUpData} from "../types/UserInput";

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

  async signOut(): Promise<void> {
    await auth().signOut();
  }

  async changePassword({oldPassword, password}: NewPasswordData): Promise<void> {
    let user = auth().currentUser;

    if (!user) {
      throw new Error('User is not signed in');
    }

    await auth().signInWithEmailAndPassword(user.email as string, oldPassword);

    user = auth().currentUser;

    if (!user) {
      throw new Error('User is not signed in');
    }

    await user.updatePassword(password);
  }

  async changeEmail(email: string): Promise<void> {
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not signed in');
    }

    await user.updateEmail(email);
  }

  get uid(): string {
    const uid = auth().currentUser?.uid;

    if (!uid) {
      throw new Error('User is not signed in');
    }

    return uid;
  }
}

export default new AuthService();
