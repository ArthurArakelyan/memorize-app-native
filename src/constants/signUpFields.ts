// utils
import {emailValidator} from "../utils/customValidators";

// types
import Field from "../types/Field";

const signUpFields: Field[] = [
  {
    name: 'name',
    label: 'Name',
    validators: [
      {
        required: true,
        message: 'Name is required',
      },
      {
        max: 120,
        message: 'Name can\'t contain more than 120 symbols',
      },
    ],
  },
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
  },
];

export default signUpFields;
