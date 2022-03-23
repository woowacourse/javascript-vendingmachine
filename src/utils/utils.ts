export const isValidLengthProductName = (name: string): boolean =>
  name.length >= 1 && name.length <= 10;
