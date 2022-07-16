import Toast from "react-native-toast-message";

// constants
import errorMessages from "../constants/errorMessages";

const regexp = /\] /g;
const SWW = 'Something went wrong';

const showErrorToast = (error?: any): void => {
  if (!error || !(error instanceof Error)) {
    return Toast.show({
      type: 'error',
      text1: SWW,
    });
  }

  const match = regexp.exec(error.message);

  const searchError = error.message.slice(1, match?.index);

  const message = errorMessages[searchError];

  Toast.show({
    type: 'error',
    text1: message || SWW,
  });
};

export default showErrorToast;
