import ProductStore from './domains/stores/ProductStore';
import CoinStore from './domains/stores/CoinStore';
import { ERROR_MESSAGE, MONEY } from './constants';

const isBlankProductName = (name) => name === '';

const isAlreadyExistProduct = (name) => {
  const products = ProductStore.instance.products ?? [];
  const existProductNames = products.map((product) => product.name);

  return existProductNames.includes(name);
};

const cannotDividedByTen = (number) => number % 10;

const isOverMaxMoney = (inputMoney) => {
  const currentMoney = CoinStore.instance.money;

  return currentMoney + inputMoney > MONEY.MAX;
};

export const checkProductValidation = ({ name, price }) => {
  if (isBlankProductName(name)) {
    throw new Error(ERROR_MESSAGE.IS_BLANK_PRODUCT_NAME);
  }
  if (isAlreadyExistProduct(name)) {
    throw new Error(ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT);
  }
  if (cannotDividedByTen(price)) {
    throw new Error(ERROR_MESSAGE.PRICE_CANNOT_DIVIDED_BY_TEN);
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
