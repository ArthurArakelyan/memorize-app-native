import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";

// types
import Memory from "../types/Memory";
import {MemoryData} from "../types/UserInput";
import authService from "./authService";
import getImageBlob from "../utils/getImageBlob";

class MemoriesService {
  async getMemories(): Promise<Memory[] | null | undefined> {
    try {
      const response = await database()
        .ref('memories')
        .once('value');

      return response.val();
    } catch (e) {
      console.error('Error in getMemories()', e);
      e instanceof Error && alert(e.message);
    }
  }

  async getMemory(id: string): Promise<Memory | void> {
    try {
      const response = await database()
        .ref(`memories/${id}`)
        .once('value');

      return response.val();
    } catch (e) {
      console.error('Error in getMemory()', e);
      e instanceof Error && alert(e.message);
    }
  }

  async createMemory(memory: MemoryData): Promise<Memory | void> {
    try {
      const uid = authService.uid;

      const reference = database().ref('memories').push();
      const id = reference.key as string;

      // setting image of memory to storage
      const storageReference = storage().ref(`memories/${id}`);

      const blob = await getImageBlob(memory.img?.uri as string);

      await storageReference.put(blob);

      const img = await storageReference.getDownloadURL();

      // setting memory to db
      const newMemory = {
        ...memory,
        img,
        uid,
        date: new Date().toISOString(),
      };

      await reference.set(newMemory);

      return { ...newMemory, id };
    } catch (e) {
      console.error('Error in createMemory()', e);
      e instanceof Error && alert(e.message);
    }
  }

  async deleteMemory(id: string): Promise<boolean> {
    try {
      await database()
        .ref(`memories/${id}`)
        .remove();

      return true;
    } catch (e) {
      console.error('Error in deleteMemory()', e);
      e instanceof Error && alert(e.message);
      return false;
    }
  }
}

export default new MemoriesService();
