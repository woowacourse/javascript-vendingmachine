export const toInt = (str: string, defaultNum = 0) => {
  const val = parseInt(str, 10);
  return !Number.isNaN(val) ? val : defaultNum;
};
