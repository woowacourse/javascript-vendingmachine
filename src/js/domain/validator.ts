import { PRODUCT_RULES, VENDING_MACHINE_RULES } from '../constants';
import {
  changeValidationData,
  moneyInsertValidationData,
  ProductData,
  Validator,
} from './interface';

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
