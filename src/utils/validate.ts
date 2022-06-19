import validateOnce from "./validateOnce";

// types
import Field from "../types/Field";

interface Data {
  [key: string]: any;
}

const validate = (data: Data, fields: Field[]): boolean => {
  const entries = Object.entries(data);

  let valid = true;

  for (const [key, value] of entries) {
    const field = fields.find((field) => field.name === key);

    if (field && validateOnce(value, field?.validators)) {
      valid = false;
    }

    if (!valid) break;
  }

  return valid;
};

export default validate;
