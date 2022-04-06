import { Product } from '../domain/Product';
import { ERROR_MESSAGE, CONFIGURATION } from '../constants';

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

export const validateUpdateProduct = (targetName: string, name: string, price: number, products: Product[]): void => {
  if (updateProductValidator.isDuplicated(targetName, name, products)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  }

  if (updateProductValidator.isIncorrectUnit(price)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
  }
};
