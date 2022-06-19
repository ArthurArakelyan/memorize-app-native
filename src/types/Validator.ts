interface Validator {
  message: string;

  required?: boolean;
  max?: number;
  min?: number;
  custom?: (value: string) => boolean;
}

export default Validator;
