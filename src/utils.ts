import { VALIDATION_ERROR_NAME } from './constants';
import { Indexable } from './types';

export const $ = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement;

export const convertToInteger = (str: string, defaultNum = 0) => {
  const val = parseInt(str, 10);
  return !Number.isNaN(val) ? val : defaultNum;
};

export const consoleErrorWithConditionalAlert = (
  error: Error,
  errorNameForAlert = VALIDATION_ERROR_NAME
) => {
  console.error(error);
  if (error.name === errorNameForAlert) {
    alert(error.message);
  }
};

const randomIndexFromArr = (arr: number[]): number => {
  return arr[(arr.length * Math.random()) | 0];
};

const randomIndexesFromRange = (size: number): number[] => {
  const randomIndexes: number[] = [];
  let arr = [...Array(size).keys()];

  while (arr.length > 0) {
    const randomValue = randomIndexFromArr(arr);
    randomIndexes.push(randomValue);
    arr = arr.filter((v) => v !== randomValue);
  }

  return randomIndexes;
};

export const shuffle = (arr: number[]) => {
  const randomIndexes = randomIndexesFromRange(arr.length);
  return randomIndexes.map((v) => arr[v]);
};

export const convertArrToObj = <Key extends Indexable, Val>(
  arr: Array<Key>,
  val: Val
): { [k: Indexable]: Val } => {
  return Object.fromEntries(arr.map((item) => [item, val]));
};

export const deepCopy = (obj: { [key in Indexable]: any }) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const copy: { [key in Indexable]: any } = {};
  for (const key of Object.keys(obj)) {
    if (Array.isArray(obj[key])) {
      copy[key] = [...obj[key]];
    } else {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
};

export const convertToLocaleString = (number: number): string => {
  return number.toLocaleString('ko-kr');
};

export const showSnack = (() => {
  let timer: NodeJS.Timeout;
  const $snackbar = $('.snack-bar');

  return function showSnack(message: string) {
    $snackbar.textContent = message;
    $snackbar?.classList.add('show');

    if (timer) {
      $snackbar.style.animationPlayState = 'paused';
      $snackbar.style.animationPlayState = 'running';
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      $snackbar?.classList.remove('show');
    }, 2500);
  };
})();
