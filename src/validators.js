import ProductStore from './domains/stores/ProductStore';
import CoinStore from './domains/stores/CoinStore';
import { ERROR_MESSAGE, MONEY, PRODUCT } from './constants';

const isBlank = (value) => value === '';

const isNotInteger = (number) => !Number.isInteger(number);

const cannotDividedByTen = (number) => number % 10;

const isOverMaxProductNameLength = (name) => name.length > PRODUCT.NAME.MAX_LENGTH;

const isAlreadyExistProduct = (name) => {
  const products = ProductStore.instance.products ?? [];
  const existProductNames = products.map((product) => product.name);

  return existProductNames.includes(name);
};

const isUnderMinPrice = (price) => price < PRODUCT.PRICE.MIN;

const isOverMaxPrice = (price) => price > PRODUCT.PRICE.MAX;

const isUnderMinQuantity = (quantity) => quantity < PRODUCT.QUANTITY.MIN;

const isOverMaxQuantity = (quantity) => quantity > PRODUCT.QUANTITY.MAX;

const isOverMaxMachineMoney = (inputMachineMoney) => {
  const currentMachineMoney = CoinStore.instance.machine.money;

  return currentMachineMoney + inputMachineMoney > MONEY.MACHINE_MAX;
};

const isOverMaxCustomerMoney = (inputCustomerMoney) => {
  const currentCustomerMoney = CoinStore.instance.customer.money;

  return currentCustomerMoney + inputCustomerMoney > MONEY.CUSTOMER_MAX;
};

const isSoldOut = (quantity) => {
  return quantity === 0;
};

const isPriceOverCustomerMoney = (price) => {
  return price > CoinStore.instance.customer.money;
};

const isNoCustomerMoney = () => {
  return CoinStore.instance.customer.money === 0;
};

// eslint-disable-next-line max-lines-per-function
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

export const checkMachineMoneyValidation = (machineMoneyInputValue) => {
  if (isOverMaxMachineMoney(machineMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MAX_MACHINE_MONEY);
  }
  if (cannotDividedByTen(machineMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
  }
};

export const checkCustomerMoneyValidation = (customerMoneyInputValue) => {
  if (isOverMaxCustomerMoney(customerMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.IS_OVER_MAX_CUSTOMER_MONEY);
  }
  if (cannotDividedByTen(customerMoneyInputValue)) {
    throw new Error(ERROR_MESSAGE.MONEY_CANNOT_DIVIDED_BY_TEN);
  }
};

export const checkProductPurchaseValidation = (productPrice, productQuantity) => {
  if (isPriceOverCustomerMoney(productPrice)) {
    throw new Error(ERROR_MESSAGE.IS_PRICE_OVER_CUSTOMER_MONEY);
  }
  if (isSoldOut(productQuantity)) {
    throw new Error(ERROR_MESSAGE.IS_SOLD_OUT);
  }
};

export const checkChangeReturnValidation = () => {
  if (isNoCustomerMoney()) {
    throw new Error(ERROR_MESSAGE.IS_NO_CUSTOMER_MONEY);
  }
};
