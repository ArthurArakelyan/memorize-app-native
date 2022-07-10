// utils
import {emailValidator} from "../utils/customValidators";

// types
import Field from "../types/Field";

const singInFields: Field[] = [
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
  {
    name: 'password',
    label: 'Password',
    validators: [
      {
        required: true,
        message: 'Password is required',
      },
      {
        min: 6,
        message: 'Minimum 6 symbols',
      },
    ],
    secureTextEntry: true,
  },
];

export default singInFields;
