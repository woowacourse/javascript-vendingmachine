import { MESSAGE } from '../constants/message';
import ProductImpl from '../domain/Product';
import { ProductInfo } from '../domain/types';

const hasSameProduct = (products: ProductImpl[], newProduct: ProductInfo) => {
  return products.some(productInfo => productInfo.name === newProduct.name);
};

const productInfoValidator = [
  { test: hasSameProduct, errorMsg: MESSAGE.ERROR_SAME_PRODUCT },
];

const validateProductInfo = (
  products: ProductImpl[],
  newProduct: ProductInfo,
) =>
  productInfoValidator.every(({ test, errorMsg }) => {
    if (test(products, newProduct)) throw new Error(errorMsg);
    return true;
  });

export { validateProductInfo };
