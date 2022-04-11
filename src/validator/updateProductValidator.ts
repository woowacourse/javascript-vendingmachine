import { Product } from '../domain/Product';
import { ERROR_MESSAGE, CONFIGURATION } from '../constants';

const updateProductValidator = {
  isDuplicated(targetProductName: string, name: string, products: Product[]) {
    if (targetProductName === name) {
      return false;
    }

    const filteredProducts = products.filter((product) => product.name !== targetProductName);
    return filteredProducts.some((product) => product.name === name);
  },

  isIncorrectUnit(price: number) {
    return price % CONFIGURATION.PRICE.UNIT !== 0;
  },
};

export const validateUpdateProduct = (targetProductName: string, name: string, price: number, products: Product[]) => {
  if (updateProductValidator.isDuplicated(targetProductName, name, products)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  }

  if (updateProductValidator.isIncorrectUnit(price)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
  }
};
