import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

interface DefaultObject {
  id: string;
}

const collectionToArray = <T extends DefaultObject> (collection: FirebaseFirestoreTypes.QueryDocumentSnapshot<T>[], callback?: (item: T) => void) => {
  return collection.map((item) => {
    const data = item.data();
    data.id = item.id;

    callback && callback(data);

    return data;
  });
};

export default collectionToArray;
