import {Asset} from "react-native-image-picker";

export interface UserInput {
  [key: string]: string;
}

export interface UploadedImage {
  [key: string]: string | any;
  img: Asset | null;
}


export interface SignUpData extends UserInput {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}

export interface SignInData extends UserInput {
  email: string;
  password: string;
}

export interface ForgetPasswordData extends UserInput {
  email: string;
}

export interface MemoryData extends UploadedImage {
  title: string;
  description: string;
}

export interface NewPasswordData extends UserInput {
  oldPassword: string;
  password: string;
}
