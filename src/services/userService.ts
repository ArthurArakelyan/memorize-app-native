import firestore from "@react-native-firebase/firestore";

// services
import authService from "./authService";

// types
import User from "../types/User";

class UserService {
  async getUser(user?: string): Promise<User | undefined> {
    const uid = user || authService.uid;

    const response = await firestore()
      .collection<User>('Users')
      .doc(uid)
      .get();

    return response.data();
  }

  async createUser(data: User): Promise<User> {
    await firestore()
      .collection('Users')
      .doc(data.id)
      .set(data);

    return data;
  }
}

export default new UserService();
