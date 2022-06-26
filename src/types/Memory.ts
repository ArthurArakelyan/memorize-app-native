import User from "./User";

interface Memory {
  id: string;
  uid: string;
  user?: User;
  title: string;
  description: string;
  date: Date | string;
  dateCode: number;
  img: string;
}

export default Memory;
