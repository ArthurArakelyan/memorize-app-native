import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

// utils
import showErrorToast from "../utils/showErrorToast";
import showSuccessToast from "../utils/showSuccessToast";

// constants
import successMessages from "../constants/successMessages";

// types
import {ForgetPasswordData, NewPasswordData, SignUpData} from "../types/UserInput";

type AuthUser = FirebaseAuthTypes.User | void;

class AuthService {
  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      return user;
    } catch (e) {
      showErrorToast(e);
    }
  }

  async signUp(data: SignUpData): Promise<AuthUser> {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(data.email, data.password);
      return user;
    } catch (e) {
      showErrorToast(e);
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (e) {
      showErrorToast(e);
      throw e;
    }
  }

  async changePassword({oldPassword, password}: NewPasswordData): Promise<void> {
    try {
      let user = this.user;

      await auth().signInWithEmailAndPassword(user.email as string, oldPassword);

      user = this.user;

      await user.updatePassword(password);
    } catch (e) {
      showErrorToast(e);
      throw e;
    }
  }

  async changeEmail(email: string): Promise<void> {
    try {
      const user = this.user;
      await user.updateEmail(email);
    } catch (e) {
      showErrorToast(e);
      throw e;
    }
  }

  async resetPassword({email}: ForgetPasswordData): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email);
      showSuccessToast(successMessages.passwordReset.message1, successMessages.passwordReset.message2);
    } catch (e) {
      showErrorToast(e);
      throw e;
    }
  }

  get user(): FirebaseAuthTypes.User {
    const current = auth().currentUser;

    if (!current) {
      throw new Error('User is not signed in');
    }

    return current;
  }

  get uid(): string {
    return this.user?.uid;
  }
}

export default new AuthService();
