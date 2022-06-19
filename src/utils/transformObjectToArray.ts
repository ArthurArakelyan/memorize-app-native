interface ResponseObject {
  [key: string]: any;
}

const transformObjectToArray = <T extends object> (object: ResponseObject, callback?: (object: T) => void): T[] => {
  const array: T[] = [];

  for (const key in object) {
    const value = object[key] as T;

    const obj = {
      ...value,
      id: key,
    };

    callback && callback(obj);

    array.push(obj);
  }

  return array;
};

export default transformObjectToArray;
