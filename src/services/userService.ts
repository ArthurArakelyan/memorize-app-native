import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// services
import authService from "./authService";

// utils
import getImageBlob from "../utils/getImageBlob";

// constants
import collections from "../constants/collections";

// types
import User, {UserField} from "../types/User";

class UserService {
  async getUser(user?: string): Promise<User | undefined> {
    const uid = user || authService.uid;

    const response = await firestore()
      .collection<User>(collections.users)
      .doc(uid)
      .get();

    return response.data();
  }

  async createUser(data: User): Promise<User> {
    await firestore()
      .collection(collections.users)
      .doc(data.id)
      .set(data);

    return data;
  }

  async changeUserField(name: UserField, value: string, user?: string): Promise<void> {
    const uid = user || authService.uid;

    await firestore()
      .collection<User>(collections.users)
      .doc(uid)
      .update({
        [name]: value,
      });
  }

  async uploadUserAvatar(image: string, user?: string): Promise<string> {
    const uid = user || authService.uid;

    // setting avatar to storage
    const storageReference = storage().ref(`users/${uid}`);

    const blob = await getImageBlob(image);

    await storageReference.put(blob);

    const img = await storageReference.getDownloadURL();

    // updating user doc
    await this.changeUserField('img', img);

    return img;
  }

  async deleteUserAvatar(user?: string): Promise<void> {
    const uid = user || authService.uid;

    // deleting avatar from storage
    await storage()
      .ref(`users/${uid}`)
      .delete();

    // updating user doc
    await this.changeUserField('img', '');
  }
}

export default new UserService();
