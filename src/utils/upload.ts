import {Asset, launchImageLibrary} from "react-native-image-picker";

const upload = (callback: (img: Asset) => void) => {
  launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, (response) => {
    const img = response.assets?.[0];

    if (img && img.type?.includes('image')) {
      callback(img);
    }
  });
};

export default upload;
