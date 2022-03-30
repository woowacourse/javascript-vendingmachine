export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const isNumberInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isStringLengthInRange = (value: string, min: number, max: number): boolean =>
  value.length >= min && value.length <= max;

export const isCorrectNumberUnit = (value: number, unit: number): boolean => value % unit === 0;

export const getSearchParamsParse = (searchUrl = '') => `?${searchUrl.split('?')[1]}`;

export const getSearchParamsObject = (searchUrl = '') =>
  Object.fromEntries(new URLSearchParams(searchUrl));
