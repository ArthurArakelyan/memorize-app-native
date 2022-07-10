interface User {
  id: string;
  name: string;
  email: string;
  img: string;
}

export type UserField = 'name' | 'email' | 'img';

export interface IUpdateUserFieldData {
  name: UserField;
  value: string;
}

export default User;
