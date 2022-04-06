import { PRODUCT_RULES, VENDING_MACHINE_RULES } from '../constants';
import { moneyValidationData, ProductData, Validator } from './interface';

// product data validation
export function hasEmptyInput({ name, price, stock }: ProductData): boolean {
  return !name || !price || !stock;
}

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

// money data validation
export function isBelowMinCharge({ money }: moneyValidationData): boolean {
  return money <= 0;
}

export function inValidUnitMoney({ money }: moneyValidationData): boolean {
  return money % VENDING_MACHINE_RULES.CHANGE_UNIT !== 0;
}

export function isExceedMaxTotalChange({
  money,
  totalMoney: totalChange,
}: moneyValidationData): boolean {
  return totalChange + money > VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE;
}

export function isExceedMaxTotalMoney({
  money,
  totalMoney,
}: moneyValidationData): boolean {
  return totalMoney + money > VENDING_MACHINE_RULES.MAX_TOTAL_INPUT_MONEY;
}

// user data validation
export function isInvalidLengthName(name: string): boolean {
  return name.length < 2 || name.length > 6;
}

export function isInvalidPassword(password: string): boolean {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*\W)).{8,16}$/;
  return !regExp.test(password);
}

// validator function
export function validateData<T>(data: T, validator: Validator<T>[]): boolean {
  validator.forEach(({ testFunc, errorMsg }) => {
    if (testFunc(data)) {
      throw new Error(errorMsg);
    }
  });
  return true;
}
