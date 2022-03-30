import { Product } from '../domain/Product';
import { CONFIGURATION } from '../constants';

export const productValidator = {
  isDuplicated(name: string, products: Product[]) {
    return products.some((product) => product.name === name);
  },

  isIncorrectUnit(price: number) {
    return price % CONFIGURATION.PRICE.UNIT !== 0;
  },
};

export const changeValidator = {
  isOverMax(inputMoney: number, currentChange: number) {
    return inputMoney + currentChange > CONFIGURATION.AMOUNT.MAX;
  },

  isIncorrectUnit(inputMoney: number) {
    return inputMoney % CONFIGURATION.AMOUNT.UNIT !== 0;
  },
};

export const updateProductValidator = {
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
