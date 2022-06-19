import Validator from "../types/Validator";

const validateOnce = (val: string, validators: Validator[]): string => {
  const value = val.trim();
  const length = value.length;

  let errorMessage = '';

  for (const { required, max, min, custom, message } of validators) {
    if (required && !value) {
      errorMessage = message;
      break;
    }

    if (min && length < min) {
      errorMessage = message;
    }

    if (max && length > max) {
      errorMessage = message;
    }

    if (custom && !custom(value)) {
      errorMessage = message;
    }
  }

  return errorMessage;
};

export default validateOnce;
