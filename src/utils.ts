import { VALIDATION_ERROR_NAME } from './constants';

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
