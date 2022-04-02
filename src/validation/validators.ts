import { ERROR_MESSAGE, PRODUCT, COIN, MONEY, INSERT_MONEY } from '../constants';
import { ProductItem, RawProductItem } from '../types';
import { toInt } from '../utils';
import ValidationResult from './validation-result';

const isInteger = (str: string) => {
  return /^-?[0-9]+$/g.test(str);
};

export const validateProductName = (name: string, productList: Array<ProductItem>) => {
  const isEmptyName = !name;
  if (isEmptyName) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_NAME);

  const isOverMaxNameLength = name.length > PRODUCT.NAME.MAX_LENGTH;
  if (isOverMaxNameLength)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_LENGTH_PRODUCT_NAME);

  const isDuplicateName = productList.some((item) => name === item.name);
  if (isDuplicateName) return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);

  return new ValidationResult(false);
};

export const validateProductPrice = (price: string) => {
  const isEmptyPrice = !price;
  if (isEmptyPrice) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);

  if (!isInteger(price)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_PRODUCT_PRICE);

  const priceNum = toInt(price, 0);
  if (priceNum < PRODUCT.PRICE.MIN || PRODUCT.PRICE.MAX < priceNum)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_PRICE);

  if (priceNum % COIN.MIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_PRODUCT_PRICE);

  return new ValidationResult(false);
};

export const validateProductQuantity = (quantity: string) => {
  const isEmptyQuantity = !quantity;
  if (isEmptyQuantity) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);

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
  const isEmptyMoney = !money;
  if (isEmptyMoney) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_CHARGE_MONEY);

  if (!isInteger(money)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_CHARGE_MONEY);

  const moneyNum = toInt(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, ERROR_MESSAGE.NEGATIVE_CHARGE_MONEY);

  if (moneyNum % COIN.MIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_CHARGE_MONEY);

  if (MONEY.MAX < moneyNum + chargedMoney)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_CHARGE_MONEY);

  return new ValidationResult(false);
};

export const validateInsertMoney = (money: string, insertedMoney: number) => {
  const isEmptyMoney = !money;
  if (isEmptyMoney) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_INSERT_MONEY);

  if (!isInteger(money)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_INSERT_MONEY);

  const moneyNum = toInt(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, ERROR_MESSAGE.NEGATIVE_INSERT_MONEY);

  if (moneyNum % COIN.MIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_INSERT_MONEY);

  if (INSERT_MONEY.MAX < moneyNum + insertedMoney)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_INSERT_MONEY);

  return new ValidationResult(false);
};

export const validatePurchaseProduct = (product: ProductItem, insertedMoney: number) => {
  const { price, quantity } = product;
  if (insertedMoney < price) {
    return new ValidationResult(true, ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  }
  if (quantity === 0) {
    return new ValidationResult(true, ERROR_MESSAGE.NO_STOCK);
  }

  return new ValidationResult(false);
};
