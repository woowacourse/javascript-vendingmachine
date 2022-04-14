import SnackBar from './components/modules/side-toast';
import { USER_INFO_KEY, VALIDATION_ERROR_NAME } from './constants';
import { CoinRecord, Indexable, LoggedInUser, ToastType } from './types';

export const toInt = (str: string, defaultNum = 0) => {
  const val = parseInt(str, 10);
  return Number.isNaN(val) ? defaultNum : val;
};

export const consoleErrorWithConditionalToast = (
  error: Error,
  errorNameForToast = VALIDATION_ERROR_NAME
) => {
  console.error(error);
  if (error.name === errorNameForToast) {
    toast(ToastType.Error, error.message);
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

export const coinToMoney = (coins: CoinRecord) => {
  return Object.keys(coins)
    .map(Number)
    .reduce((acc, unit) => {
      return acc + coins[unit] * unit;
    }, 0);
};

export const findMaxRepeatingLetterCount = (_str: string) => {
  const str = _str.trim();
  let [start, end, max] = [0, 0, 0];
  while (end < str.length) {
    if (str[start] === str[end]) {
      max = Math.max(max, end - start + 1);
      end += 1;
    } else {
      start = end;
    }
  }
  return max;
};

export const getUserInfoFromLocalStorage = (): LoggedInUser | undefined => {
  let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}');
  if (
    !Object.prototype.hasOwnProperty.call(userInfo, 'name') ||
    !Object.prototype.hasOwnProperty.call(userInfo, 'email')
  ) {
    userInfo = undefined;
  }
  return userInfo;
};

export const toast = (type: ToastType, message: string) => {
  const $toast = document.querySelector('side-toast') as SnackBar;
  if (type === ToastType.Success) {
    $toast.success(message);
  } else if (type === ToastType.Error) {
    $toast.error(message);
  }
};

export const krLocaleStringToInt = (str: string) => {
  return toInt(str.replace(/,/g, ''));
};
