import ProductStoreInstance from './domains/stores/ProductStore';
import CoinStoreInstance from './domains/stores/CoinStore';
import { ERROR_MESSAGE, MONEY, PASSWORD, PRODUCT } from './constants';

const isBlank = (value) => value === '';

const isNotInteger = (number) => !Number.isInteger(number);

const cannotDividedByTen = (number) => number % 10;

const isOverMaxProductNameLength = (name) => name.length > PRODUCT.NAME.MAX_LENGTH;

const isAlreadyExistProduct = (name) => {
  const products = ProductStoreInstance.products ?? [];
  const existProductNames = products.map((product) => product.name);

  return existProductNames.includes(name);
};

const isUnderMinPrice = (price) => price < PRODUCT.PRICE.MIN;

const isOverMaxPrice = (price) => price > PRODUCT.PRICE.MAX;

const isOverPurchaseInputMaxPrice = (price) => price > PRODUCT.PRICE.PURCHASE_INPUT_MAX;

const isUnderMinQuantity = (quantity) => quantity < PRODUCT.QUANTITY.MIN;

const isOverMaxQuantity = (quantity) => quantity > PRODUCT.QUANTITY.MAX;

const isOverMaxMoney = (inputMoney) => {
  const currentMoney = CoinStoreInstance.money;

  return currentMoney + inputMoney > MONEY.MAX;
};

const isProductPriceMoreExpensive = (moneyInput, productPrice) => productPrice > moneyInput;

const isUnderMinPasswordLength = (password) => {
  return password.length < PASSWORD.MIN_LENGTH;
};

const isUnderMinCombinationCount = (password) => {
  let upperCaseCount = 0;
  let lowerCaseCount = 0;
  let numberCount = 0;

  if (password.match(/[A-Z]/g)) {
    upperCaseCount += 1;
  }
  if (password.match(/[a-z]/g)) {
    lowerCaseCount += 1;
  }
  if (password.match(/[0-9]/g)) {
    numberCount += 1;
  }
  return upperCaseCount + lowerCaseCount + numberCount < PASSWORD.MIN_COMBINATION_COUNT;
};

const isNotCorrectedPassword = (password) => {
  return isUnderMinPasswordLength(password) || isUnderMinCombinationCount(password);
};

const isNotMatchedPassword = (password, passwordConfirm) => {
  return password !== passwordConfirm;
};

export const checkProductValidation = ({ name, price, quantity }) => {
  if (isBlank(name)) {
    throw new Error(ERROR_MESSAGE.IS_BLANK_PRODUCT_NAME);
  }
  if (isOverMaxProductNameLength(name)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MAX_PRODUCT_NAME_LENGTH);
  }

  if (isNotInteger(price)) {
    throw new Error(ERROR_MESSAGE.IS_NOT_INTEGER_PRICE);
  }
  if (isUnderMinPrice(price)) {
    throw new Error(ERROR_MESSAGE.IS_UNDER_MIN_PRICE);
  }
  if (isOverMaxPrice(price)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MAX_PRICE);
  }
  if (cannotDividedByTen(price)) {
    throw new Error(ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);
  }

  if (isNotInteger(quantity)) {
    throw new Error(ERROR_MESSAGE.IS_NOT_INTEGER_QUANTITY);
  }
  if (isUnderMinQuantity(quantity)) {
    throw new Error(ERROR_MESSAGE.IS_UNDER_MIN_QUANTITY);
  }
  if (isOverMaxQuantity(quantity)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MAX_QUANTITY);
  }
};

export const checkProductAddValidation = (product) => {
  if (isAlreadyExistProduct(product.name)) {
    throw new Error(ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT_WHEN_ADD);
  }

  checkProductValidation(product);
};

export const checkDuplicateProductWhenModify = (product) => {
  if (isAlreadyExistProduct(product.name)) {
    throw new Error(ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT_WHEN_MODIFY);
  }
};

export const checkCoinValidation = (coinInputValue) => {
  if (isOverMaxMoney(coinInputValue)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MAX_MONEY);
  }
  if (cannotDividedByTen(coinInputValue)) {
    throw new Error(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
  }
};

export const checkPurchaseMoneyValidation = (purchaseMoneyInputValue) => {
  if (isUnderMinPrice(purchaseMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.IS_UNDER_PRODUCT_MIN_PRICE);
  }
  if (isOverPurchaseInputMaxPrice(purchaseMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_PRODUCT_MAX_PRICE);
  }
  if (cannotDividedByTen(purchaseMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
  }
};

export const checkCanPurchaseValidation = (moneyInput, productPrice) => {
  if (isProductPriceMoreExpensive(moneyInput, productPrice)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MONEY_INPUT);
  }
};

export const checkNewUserInfoValidation = ({ email, name, password, passwordConfirm }) => {
  if (isNotCorrectedPassword(password)) {
    throw new Error(ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
  }
  if (isNotMatchedPassword(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD);
  }
};
