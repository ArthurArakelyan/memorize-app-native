// types
import Field from "../types/Field";

const newPasswordFields: Field[] = [
  {
    name: 'oldPassword',
    label: 'Old Password',
    validators: [
      {
        required: true,
        message: 'Old Password is required',
      },
      {
        min: 6,
        message: 'Minimum 6 symbols',
      },
    ],
    secureTextEntry: true,
  },
  {
    name: 'password',
    label: 'New Password',
    validators: [
      {
        required: true,
        message: 'New Password is required',
      },
      {
        min: 6,
        message: 'Minimum 6 symbols',
      },
    ],
    secureTextEntry: true,
  },
];

export default newPasswordFields;
