import { ERROR_MESSAGE, PRODUCT, COIN, MONEY, INSERT_MONEY, NAME, PASSWORD } from '../constants';
import { ProductItem, RawProductItem } from '../types';
import { findMaxRepeatingLetterCount, toInt } from '../utils';
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

export const validateLoginEmail = (email: string) => {
  if (!email) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_EMAIL);

  return new ValidationResult(false);
};

export const validateLoginPassword = (password: string) => {
  if (!password) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PASSWORD);

  return new ValidationResult(false);
};

export const validateEmail = (email: string) => {
  if (!email) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_EMAIL);

  const reg = /^[0-9a-z]([-_\.]?[0-9a-z])*@[0-9a-z]([-_\.]?[0-9a-z])*\.[a-z]{2,3}$/i;
  if (!reg.test(email)) return new ValidationResult(true, ERROR_MESSAGE.INVALID_FORMAT_EMAIL);

  return new ValidationResult(false);
};

export const validateName = (name: string) => {
  if (!name) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_NAME);

  if (name.length < NAME.MIN_LENGTH || NAME.MAX_LENGTH < name.length)
    return new ValidationResult(true, ERROR_MESSAGE.INVALID_LENGTH_NAME);

  return new ValidationResult(false);
};

export const validatePassword = (password: string) => {
  if (!password) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PASSWORD);

  if (password.length < PASSWORD.MIN_LENGTH)
    return new ValidationResult(false, ERROR_MESSAGE.INVALID_LENGTH_PASSWORD);

  const hasLetter = /[a-zA-Z]/.test(password);
  if (!hasLetter) return new ValidationResult(true, ERROR_MESSAGE.NOT_HAS_LETTER_PASSWORD);

  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) return new ValidationResult(true, ERROR_MESSAGE.NOT_HAS_NUMBER_PASSWORD);

  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password);
  if (!hasSpecialCharacter)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_HAS_SPECIAL_CHARACTER_PASSWORD);

  const hasUpperCase = /[A-Z]/.test(password);
  if (!hasUpperCase) return new ValidationResult(true, ERROR_MESSAGE.NOT_HAS_UPPERCASE_PASSWORD);

  const maxRepeatingLetterCount = findMaxRepeatingLetterCount(password);
  if (maxRepeatingLetterCount > PASSWORD.MAX_REPEAT)
    return new ValidationResult(true, ERROR_MESSAGE.REPEAT_LETTER_PASSWORD);

  return new ValidationResult(false);
};

export const validateRePassword = (password: string, repassword: string) => {
  if (password !== repassword) return new ValidationResult(true, ERROR_MESSAGE.NOT_MATCH_PASSWORD);
  return new ValidationResult(false);
};

export const validateRegister = ({
  email,
  name,
  password,
  repassword,
}: {
  email: string;
  name: string;
  password: string;
  repassword: string;
}) => {
  return [
    validateEmail(email),
    validateName(name),
    validatePassword(password),
    validateRePassword(password, repassword),
  ];
};
