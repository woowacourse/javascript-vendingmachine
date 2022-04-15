import Product from '../domain/Product';
import { ERROR_MESSAGE, CONFIGURATION } from '../constants';

const productValidator = {
  isDuplicated(name: string, products: Product[]) {
    return products.some((product) => product.name === name);
  },

  isIncorrectUnit(price: number) {
    return price % CONFIGURATION.PRICE.UNIT !== 0;
  },
};

export const validateProduct = (product: Product, products: Product[]) => {
  if (productValidator.isDuplicated(product.name, products)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  }

  if (productValidator.isIncorrectUnit(product.price)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
  }
};

const changeValidator = {
  isOverMax(inputMoney: number, currentChange: number) {
    return inputMoney + currentChange > CONFIGURATION.AMOUNT.MAX;
  },

  isIncorrectUnit(inputMoney: number) {
    return inputMoney % CONFIGURATION.AMOUNT.UNIT !== 0;
  },
};

export const validateChange = (inputMoney: number, currentChange: number) => {
  if (changeValidator.isOverMax(inputMoney, currentChange)) {
    throw new Error(ERROR_MESSAGE.OVER_AMOUNT);
  }

  if (changeValidator.isIncorrectUnit(inputMoney)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
  }
};

const updateProductValidator = {
  isDuplicated(targetName: string, name: string, products: Product[]) {
    if (targetName === name) {
      return false;
    }

    const filterArr = products.filter((product) => product.name !== targetName);
    return filterArr.some((product) => product.name === name);
  },

  isIncorrectUnit(price: number) {
    return price % CONFIGURATION.PRICE.UNIT !== 0;
  },
};

export const validateUpdateProduct = (targetName: string, name: string, price: number, products: Product[]) => {
  if (updateProductValidator.isDuplicated(targetName, name, products)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  }

  if (updateProductValidator.isIncorrectUnit(price)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
  }
};

const userInputMoneyValidator = {
  isOverMax(userAmount: number, userInputMoney: number) {
    return userAmount + userInputMoney > 10000;
  },
};

export const validateUserInputMoney = (userInputMoney: number, userAmount: number) => {
  if (productValidator.isIncorrectUnit(userInputMoney)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
  }

  if (userInputMoneyValidator.isOverMax(userAmount, userInputMoney)) {
    throw new Error(ERROR_MESSAGE.OVER_USER_AMOUNT);
  }
};

const purchableValidator = {
  isInsufficientCash(userAmount: number, product: Product) {
    return userAmount < product.price;
  },
};

export const validatePurchable = (userAmount: number, product: Product) => {
  if (purchableValidator.isInsufficientCash(userAmount, product)) {
    throw new Error(ERROR_MESSAGE.INSUFFICIENT_CASH);
  }
};

const returnValidator = {
  isInsufficientUserAmount(userAmount: number) {
    return userAmount <= 0;
  },
};

export const validateReturn = (userAmount: number) => {
  if (returnValidator.isInsufficientUserAmount(userAmount)) {
    throw new Error(ERROR_MESSAGE.NO_RETURN_CHANGE);
  }
};
