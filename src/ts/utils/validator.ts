import { MAX_NAME_LENGTH, MESSAGE } from '../constants';
import ProductImpl from '../domain/Product';
import { ProductInfo } from '../domain/types';

const hasSameProduct = (products: ProductImpl[], newProduct: ProductInfo) => {
  return products.some(productInfo => productInfo.name === newProduct.name);
};

const isOverMaxLength = (name: string) => {
  return name.length > MAX_NAME_LENGTH;
};

const isInvalidPrice = (price: number) => {
  const isRanged = price >= 100 && price <= 10000;
  const isDivisible = price % 10 === 0;
  return !(isRanged && isDivisible);
};

const productInfoValidator = (
  products: ProductImpl[],
  newProduct: ProductInfo,
) => [
  {
    test: hasSameProduct(products, newProduct),
    errorMsg: MESSAGE.ERROR_SAME_PRODUCT,
  },
  {
    test: isOverMaxLength(newProduct.name),
    errorMsg: MESSAGE.ERROR_OVER_MAX_LENGTH,
  },
  {
    test: isInvalidPrice(newProduct.price),
    errorMsg: MESSAGE.ERROR_INVALID_PRICE,
  },
];

const validateProductInfo = (
  products: ProductImpl[],
  newProduct: ProductInfo,
) => {
  const validator = productInfoValidator(products, newProduct);

  validator.every(({ test, errorMsg }) => {
    if (test) throw new Error(errorMsg);
    return true;
  });
};

export { validateProductInfo };
