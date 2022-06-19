import database from "@react-native-firebase/database";

// services
import authService from "./authService";

// types
import User from "../types/User";

class UserService {
  async getUser(user?: string): Promise<User | void> {
    try {
      const uid = user || authService.uid;

      const response = await database()
        .ref(`users/${uid}`)
        .once('value');

      return response.val();
    } catch (e) {
      console.error('Error in getUser()', e);
      e instanceof Error && alert(e.message);
    }
  }

  async createUser(data: User): Promise<User | void> {
    try {
      await database()
        .ref(`users/${data.id}`)
        .set(data);

      return data;
    } catch (e) {
      console.error('Error in createUser()', e);
      e instanceof Error && alert(e.message);
    }
  }
}

export default new UserService();
