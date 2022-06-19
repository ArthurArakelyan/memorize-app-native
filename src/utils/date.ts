export const months: string[] = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

export const getMonthName = (date: Date): string => {
  return months[date.getMonth()];
};

export const getShortMonthName = (date: Date): string => {
  return getMonthName(date).slice(0, 3);
};
