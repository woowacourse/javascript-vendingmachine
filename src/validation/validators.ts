import { ERROR_MESSAGE, PRODUCT, COIN, MONEY } from '../constants';
import { ProductItem, RawProductItem } from '../types';
import { toInt } from '../utils';
import ValidationResult from './validation-result';

const isInteger = (str: string) => {
  return /^-?[0-9]+$/g.test(str);
};

export const validateProductName = (name: string, productList: Array<ProductItem>) => {
  if (!name) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  if (name.length > PRODUCT.NAME.MAX_LENGTH)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_LENGTH_PRODUCT_NAME);
  if (productList.some((item) => name === item.name))
    return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);
  return new ValidationResult(false);
};

export const validateProductPrice = (price: string) => {
  if (!price) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);
  if (!isInteger(price)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_PRODUCT_PRICE);
  const priceNum = toInt(price, 0);
  if (priceNum < PRODUCT.PRICE.MIN || PRODUCT.PRICE.MAX < priceNum)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_PRICE);
  if (priceNum % COIN.MIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_PRODUCT_PRICE);
  return new ValidationResult(false);
};

export const validateProductQuantity = (quantity: string) => {
  if (!quantity) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);
  if (!isInteger(quantity))
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_QUANTITY);
  const quantityNum = toInt(quantity, 0);
  if (quantityNum < PRODUCT.QUANTITY.MIN || PRODUCT.QUANTITY.MAX < quantityNum)
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
  ];
};

export const validateChargeCoins = (money: string, chargedMoney: number) => {
  if (!money) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_CHARGE_MONEY);
  if (!isInteger(money)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_CHARGE_MONEY);
  const moneyNum = toInt(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, ERROR_MESSAGE.NEGATIVE_CHARGE_MONEY);
  if (moneyNum % COIN.MIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_CHARGE_MONEY);
  if (MONEY.MAX < moneyNum + chargedMoney)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_CHARGE_MONEY);
  return new ValidationResult(false);
};
