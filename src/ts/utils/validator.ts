import { MAX_NAME_LENGTH, MESSAGE } from '../constants';
import ProductImpl from '../domain/Product';
import { ProductInfo } from '../domain/types';

const hasSameProduct = (products: ProductImpl[], newProduct: ProductInfo) => {
  return products.some(productInfo => productInfo.name === newProduct.name);
};

const isOverMaxLength = name => {
  return name.length > MAX_NAME_LENGTH;
};

const validateProductInfo = (
  products: ProductImpl[],
  newProduct: ProductInfo,
) => {
  const productInfoValidator = [
    {
      test: hasSameProduct(products, newProduct),
      errorMsg: MESSAGE.ERROR_SAME_PRODUCT,
    },
    {
      test: isOverMaxLength(newProduct.name),
      errorMsg: MESSAGE.ERROR_OVER_MAX_LENGTH,
    },
  ];

  productInfoValidator.every(({ test, errorMsg }) => {
    if (test) throw new Error(errorMsg);
    return true;
  });
};

export { validateProductInfo };
