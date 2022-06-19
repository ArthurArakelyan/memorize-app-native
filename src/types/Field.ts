import Validator from "./Validator";

interface Field {
  name: string;
  label: string;
  validators: Validator[];
}

export default Field;
