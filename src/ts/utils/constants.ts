const PRODUCT = {
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  UNIT: 10,
  MAX_LENGTH: 10,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 20,
};

const CHARGE = {
  MIN_PRICE: 10,
  MAX_PRICE: 100000,
  UNIT: 10,
  RETURN_CHARGE_UNIT: 1000,
};

const specialSymbolAsc = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126];
const upperCaseAsc = [65, 66, 67, 68 ,69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
const lowerCaseAsc = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
const numberAsc = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

export { 
  PRODUCT, 
  CHARGE, 
  specialSymbolAsc,
  upperCaseAsc,
  lowerCaseAsc,
  numberAsc,
};
