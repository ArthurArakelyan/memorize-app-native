const addLeadingZero = (number: number): string => {
  if (isNaN(number)) {
    return '';
  }

  return `${(number < 10 && number > 0) ? '0' : ''}${number}`;
};

export default addLeadingZero;
