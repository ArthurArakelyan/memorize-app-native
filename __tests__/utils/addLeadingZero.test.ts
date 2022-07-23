import {it, expect} from "vitest";

import addLeadingZero from "../../src/utils/addLeadingZero";

it('should return a string with 0 in start when number in 1-9 range is provided', () => {
  const number = 2;

  const numberWithLeadingZero = addLeadingZero(number);

  expect(numberWithLeadingZero).toBe(`0${number}`);
});

it('should return a string without 0 in start because provided number is not in 1-9 range', () => {
  const number = 12;
  const number2 = -5;

  const numberWithoutLeadingZero = addLeadingZero(number);
  const numberWithoutLeadingZero2 = addLeadingZero(number2);

  expect(numberWithoutLeadingZero).toBe(number.toString());
  expect(numberWithoutLeadingZero2).toBe(number2.toString());
});

it('should return a 0 if 0 is provided', () => {
  const number = 0;

  const zero = addLeadingZero(number);

  expect(zero).toBe(number.toString());
});

it('should return an empty string if NaN is provided', () => {
  const number = NaN;

  const leadingZero = addLeadingZero(number);

  expect(leadingZero).toBe('');
});

it('should return \'Infinity\' if Infinity is provided', () => {
  const number = Infinity;
  const negativeNumber = -Infinity;

  const leadingZero = addLeadingZero(number);
  const negativeLeadingZero = addLeadingZero(negativeNumber);

  expect(leadingZero).toBe(`${Infinity}`);
  expect(negativeLeadingZero).toBe(`${-Infinity}`);
});

it('should return a 10 bit number in string if 16 bit number is provided', () => {
  const number = 0xff;

  const leadingZero = addLeadingZero(number);

  expect(leadingZero).toBe(number.toString());
});
