import { Product } from '../domain/Product';
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

    const filteredProducts = products.filter((product) => product.name !== targetName);
    return filteredProducts.some((product) => product.name === name);
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
  isOverMax(currentInputMoney: number, userInputMoney: number) {
    return currentInputMoney + userInputMoney > CONFIGURATION.INPUT.MAX;
  },

  isIncorrectUnit(inputMoney: number) {
    return inputMoney % CONFIGURATION.AMOUNT.UNIT !== 0;
  },
};

export const validateInputMoney = (money: number, userInputMoneyAmount: number) => {
  if (userInputMoneyValidator.isOverMax(money, userInputMoneyAmount)) {
    throw new Error(ERROR_MESSAGE.OVER_INPUT_MONEY);
  }

  if (userInputMoneyValidator.isIncorrectUnit(money)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_INPUT_MONEY);
  }
};

const purchaseProductValidator = {
  isNotEnoughMoney(targetName, products, userInputMoneyAmount) {
    const targetProduct = products.find((product) => product.name === targetName);
    const targetProductPrice = targetProduct.price;

    return targetProductPrice > userInputMoneyAmount;
  },
};

export const validatePurchaseProduct = (targetName: string, products: Product[], userInputMoneyAmount: number) => {
  if (purchaseProductValidator.isNotEnoughMoney(targetName, products, userInputMoneyAmount)) {
    throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  }
};

const returnChangeValidator = {
  isEmptyChange(chargedCoin) {
    return chargedCoin.getAmount() === 0;
  },
};

export const validateReturnCharge = (chargedCoin) => {
  if (returnChangeValidator.isEmptyChange(chargedCoin)) {
    throw new Error(ERROR_MESSAGE.EMPTY_CHANGE);
  }
};

const passwordValidator = {
  isNotEqual(password, passwordConfirm) {
    return password !== passwordConfirm;
  },

  isInvalid(password) {
    return !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  },
};

export const validatePasswordCondition = (password) => {
  if (passwordValidator.isInvalid(password)) {
    throw new Error(ERROR_MESSAGE.NOT_MATCH_PASSWORD_REGEXP);
  }
};

export const validatePasswordIsEqual = (password, passwordConfirm) => {
  if (passwordValidator.isNotEqual(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.PASSWORD_CONFIRM);
  }
};
