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
