import Toast from "react-native-toast-message";

const showSuccessToast = (message = 'Success', message2?: string): void => {
  Toast.show({
    type: 'success',
    text1: message,
    text2: message2,
  });
};

export default showSuccessToast;
