export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const isNumberInRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;

export const isStringLengthInRange = (value: string, min: number, max: number) =>
  value.length >= min && value.length <= max;

export const isCorrectNumberUnit = (value: number, unit: number) => value % unit === 0;

export const getSearchParamsObject = (searchUrl = '') => {
  const searchString = `?${searchUrl.split('?')[1]}`;
  const searchParams = new URLSearchParams(searchString);
  return Array.from(searchParams.keys()).reduce((previous, key) => {
    previous[key] = searchParams.get(key);
    return previous;
  }, {});
};
