type customValidator = (value: string) => boolean;

export const emailValidator: customValidator = (value) => {
  const regexp = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
  return regexp.test(value);
};
