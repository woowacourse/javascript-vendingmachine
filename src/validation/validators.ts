import {
  ERROR_MESSAGE,
  MAX_CHARGABLE_MONEY,
  MAX_LENGTH_OF_PRODUCT_NAME,
  MAX_PRODUCT_PRICE,
  MAX_PRODUCT_QUANTITY,
  MIN_COIN_UNIT,
  MIN_PRODUCT_PRICE,
  MIN_PRODUCT_QUANTITY,
} from '../constants';
import { ProductItem, RawProductItem } from '../types';
import { convertToInteger } from '../utils';
import ValidationResult from './validation-result';

const isInteger = (str: string) => {
  return /^-?[0-9]+$/g.test(str);
};

export const validateProductName = (name: string, productList: Array<ProductItem>) => {
  if (!name) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  if (name.length > MAX_LENGTH_OF_PRODUCT_NAME)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_LENGTH_PRODUCT_NAME);
  if (productList.some((item) => name === item.name))
    return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);
  return new ValidationResult(false);
};

export const validateProductPrice = (price: string) => {
  if (!price) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);
  if (!isInteger(price)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_PRODUCT_PRICE);
  const priceNum = convertToInteger(price, 0);
  if (priceNum < MIN_PRODUCT_PRICE || MAX_PRODUCT_PRICE < priceNum)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_PRICE);
  if (priceNum % MIN_COIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_PRODUCT_PRICE);
  return new ValidationResult(false);
};

export const validateProductQuantity = (quantity: string) => {
  if (!quantity) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);
  if (!isInteger(quantity))
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_QUANTITY);
  const quantityNum = convertToInteger(quantity, 0);
  if (quantityNum < MIN_PRODUCT_QUANTITY || MAX_PRODUCT_QUANTITY < quantityNum)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_QUANTITY);
  return new ValidationResult(false);
};

export const validateProduct = (
  { name, price, quantity }: RawProductItem,
  productList: Array<ProductItem>
) => {
  return [
    validateProductName(name, productList),
    validateProductPrice(price),
    validateProductQuantity(quantity),
  ].filter((result) => result.hasError);
};

export const validateChargeCoins = (money: string, chargedMoney: number) => {
  if (!money) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_CHARGE_MONEY);
  if (!isInteger(money)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_CHARGE_MONEY);
  const moneyNum = convertToInteger(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, ERROR_MESSAGE.NEGATIVE_CHARGE_MONEY);
  if (moneyNum % MIN_COIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_CHARGE_MONEY);
  if (MAX_CHARGABLE_MONEY < moneyNum + chargedMoney)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_CHARGE_MONEY);
  return new ValidationResult(false);
};

export const validateInsertMoney = (money: string, totalMoney: number) => {
  if (!money) return new ValidationResult(true, '투입하신 금액이 비어있습니다.');

  if (!isInteger(money)) return new ValidationResult(true, '투입하신 금액은 숫자이어야 합니다.');

  const moneyNum = convertToInteger(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, '투입하신 금액은 양수이어야 합니다.');

  if (moneyNum % MIN_COIN_UNIT)
    return new ValidationResult(true, '투입하신 금액은 10으로 나누어 떨어져야 합니다.');

  if (moneyNum + totalMoney > 10000)
    return new ValidationResult(true, '금액은 최대 10,000원까지만 투입 가능합니다.');

  return new ValidationResult(false);
};
