// utils
import {emailValidator} from "../utils/customValidators";

// types
import Field from "../types/Field";

const forgetPasswordFields: Field[] = [
  {
    name: 'email',
    label: 'Email',
    validators: [
      {
        required: true,
        message: 'Email is required',
      },
      {
        custom: emailValidator,
        message: 'Email is not correct',
      },
    ],
    keyboardType: 'email-address',
  },
];

export default forgetPasswordFields;
