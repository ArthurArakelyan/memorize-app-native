interface ErrorMessages {
  [key: string]: string;
}

const errorMessages: ErrorMessages = {
  'auth/wrong-password': 'Wrong password try again',
  'auth/too-many-requests': 'Too many attempts',
  'auth/user-not-found': 'User with this email does not exist',
  'auth/email-already-in-use': 'This email has already been taken',
};

export default errorMessages;
