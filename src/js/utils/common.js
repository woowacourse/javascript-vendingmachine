export const isEmpty = (name) => {
  return !name;
};

export const isMaximumLength = (value, max) => {
  return value.length > max;
};

export const isDivideUnit = (number, unit) => {
  return number % unit !== 0;
};

export const isRangeNumber = (number, min, max) => {
  return number < min || number > max;
};
