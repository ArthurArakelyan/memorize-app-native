import {Asset, ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";

const upload = (callback?: (img: Asset) => void): Promise<Asset | undefined> => {
  const successCallback = (response: ImagePickerResponse) => {
    const img = response.assets?.[0];

    if (img && img.type?.includes('image')) {
      callback && callback(img);
    }

    return img;
  };

  return launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, successCallback)
    .then(successCallback);
};

export default upload;
