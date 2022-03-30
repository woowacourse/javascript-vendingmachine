import { VALIDATION_ERROR_NAME } from './constants';
import { Indexable } from './types';

export const toInt = (str: string, defaultNum = 0) => {
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
  const initialObj: { [key in Indexable]: any } = {};
  return Object.keys(obj).reduce((_obj, key) => {
    if (Array.isArray(obj[key])) {
      _obj[key] = [...obj[key]];
    } else if (typeof obj[key] === 'object') {
      _obj[key] = deepCopy(obj[key]);
    } else {
      _obj[key] = obj[key];
    }
    return _obj;
  }, initialObj);
};

export const convertToLocaleString = (number: number): string => {
  return number.toLocaleString('ko-kr');
};
