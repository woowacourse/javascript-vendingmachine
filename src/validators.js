import ProductStore from './domains/stores/ProductStore';
import { ERROR_MESSAGE } from './constants';

const isBlankProductName = (name) => name === '';

const isAlreadyExistProduct = (name) => {
  const products = ProductStore.instance.products ?? [];
  const existProductNames = products.map((product) => product.name);

  return existProductNames.includes(name);
};

const cannotDividedByTen = (price) => price % 10;

const checkProductValidation = ({ name, price }) => {
  if (isBlankProductName(name)) {
    throw new Error(ERROR_MESSAGE.IS_BLANK_PRODUCT_NAME);
  }
  if (isAlreadyExistProduct(name)) {
    throw new Error(ERROR_MESSAGE.IS_ALREADY_EXIST_PRODUCT);
  }
  if (cannotDividedByTen(price)) {
    throw new Error(ERROR_MESSAGE.CANNOT_DIVIDED_BY_TEN);
  }
};

export default checkProductValidation;
