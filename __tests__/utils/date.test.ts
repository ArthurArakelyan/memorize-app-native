import {it, describe, expect} from "vitest";

import {getMonthName, getShortMonthName} from "../../src/utils/date";

describe('getMonthName()', () => {
  it('should return a month name which is provided in Date', () => {
    const date = new Date(0);

    const month = getMonthName(date);

    expect(month).toBe('January');
  });

  it('should return undefined if Invalid Date is provided', () => {
    const invalidDate = new Date('invalid date');

    const month = getMonthName(invalidDate);

    expect(month).toBeUndefined();
  });
});

describe('getShortMonthName()', () => {
  it('should return a month name sliced to 3 symbols which is provided in Date', () => {
    const date = new Date(0);

    const month = getShortMonthName(date);

    expect(month).toBe('Jan');
  });

  it('should return an empty string if Invalid Date is provided', () => {
    const invalidDate = new Date('invalid date');

    const month = getShortMonthName(invalidDate);

    expect(month).toBe('');
  });
});
