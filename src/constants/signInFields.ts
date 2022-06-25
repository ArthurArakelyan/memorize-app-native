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
        message: 'Password can contain minimum 6 symbols',
      },
    ],
    secureTextEntry: true,
  },
];

export default singInFields;
