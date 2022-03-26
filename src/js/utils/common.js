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

export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

export const isOverMaxNumber = (number, max) => {
  return number > max;
};
