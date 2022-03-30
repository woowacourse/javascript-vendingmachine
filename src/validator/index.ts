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
