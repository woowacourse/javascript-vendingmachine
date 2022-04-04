import { PRODUCT_RULES, USER_REGISTER_RULES, VENDING_MACHINE_RULES } from '../constants';
import {
  changeValidationData,
  moneyInsertValidationData,
  ProductData,
  Validator,
} from './interface';

interface UserRegisterData {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

// general data validation
export function hasEmptyInput(data: ProductData | UserRegisterData): boolean {
  return Object.keys(data).some((key) => {
    if (typeof data[key] === 'string') return !data[key].trim();
    return !data[key];
  });
}

// user data validation
export function isOutOfRangeUserNameLength({ name }: UserRegisterData): boolean {
  return (
    name.length < USER_REGISTER_RULES.NAME_MIN_LENGTH ||
    name.length > USER_REGISTER_RULES.NAME_MAX_LENGTH
  );
}

export function isInvalidPassword({ password }: UserRegisterData): boolean {
  return !USER_REGISTER_RULES.PASSWORD_REGEX.test(password);
}

export function isDifferentPassword({
  password,
  passwordConfirm,
}: UserRegisterData): boolean {
  return password !== passwordConfirm;
}

// product data validation
export function isOverMaxLengthName({ name }: ProductData): boolean {
  return name.length > PRODUCT_RULES.MAX_NAME_LENGTH;
}

export function isPriceOutOfRange({ price }: ProductData): boolean {
  return price < PRODUCT_RULES.MIN_PRICE || price > PRODUCT_RULES.MAX_PRICE;
}

export function isInvalidUnitPrice({ price }: ProductData): boolean {
  return price % PRODUCT_RULES.PRICE_UNIT !== 0;
}

export function isStockOutOfRange({ stock }: ProductData): boolean {
  return stock > PRODUCT_RULES.MAX_STOCK || stock < PRODUCT_RULES.MIN_STOCK;
}

export function isNotIntegerStock({ stock }: ProductData): boolean {
  return !Number.isInteger(stock);
}

// change, moneyInsert data validation
export function isBelowMinCharge({
  money,
}: changeValidationData | moneyInsertValidationData): boolean {
  return money <= 0;
}

export function inValidUnitChange({
  money,
}: changeValidationData | moneyInsertValidationData): boolean {
  return money % VENDING_MACHINE_RULES.CHANGE_UNIT !== 0;
}

export function isExceedMaxTotalChange({
  money,
  totalChange,
}: changeValidationData): boolean {
  return totalChange + money > VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE;
}

export function isExceedMaxTotalMoneyInsert({
  money,
  moneyInsert,
}: moneyInsertValidationData): boolean {
  return moneyInsert + money > VENDING_MACHINE_RULES.MAX_TOTAL_MONEY_INSERT;
}

// validator function
export function validateData<T>(data: T, validator: Validator<T>[]): never | void {
  validator.forEach(({ testFunc, errorMsg }) => {
    if (testFunc(data)) {
      throw new Error(errorMsg);
    }
  });
}
