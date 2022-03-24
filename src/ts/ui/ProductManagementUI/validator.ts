import {
  MAX_NAME_LENGTH,
  MAX_QUANTITY,
  MESSAGE,
  PRICE_RULE,
} from '../../constants';
import { isInvalidNumber } from '../../utils/validator';
import ProductImpl from '../../domain/Product';
import { ProductInfo } from '../../domain/types';

const isEmpty = (product: ProductInfo) =>
  Object.keys(product).some(key => {
    if (typeof product[key] === 'number') {
      return Number.isNaN(product[key]);
    }
    return product[key].trim() === '';
  });

const hasSameProduct = (
  products: ProductImpl[],
  newProduct: ProductInfo,
  prevProductName: string | null = null,
) =>
  products.some(productInfo => {
    if (productInfo.name === prevProductName) return false;
    return productInfo.name === newProduct.name;
  });

const isOverMaxLength = (name: string) => name.length > MAX_NAME_LENGTH;

const isQuantityRanged = (quantity: number) =>
  quantity > MAX_QUANTITY || quantity <= 0;

const generateProductInfoValidators = (
  products: ProductImpl[],
  newProduct: ProductInfo,
  prevProductName: string | null = null,
) => [
  {
    test: isEmpty(newProduct),
    errorMsg: MESSAGE.ERROR_EMPTY_VALUE,
  },
  {
    test: hasSameProduct(products, newProduct, prevProductName),
    errorMsg: MESSAGE.ERROR_SAME_PRODUCT,
  },
  {
    test: isOverMaxLength(newProduct.name),
    errorMsg: MESSAGE.ERROR_OVER_MAX_LENGTH,
  },
  {
    test: isInvalidNumber(newProduct.price, PRICE_RULE),
    errorMsg: MESSAGE.ERROR_INVALID_PRICE,
  },
  {
    test: isQuantityRanged(newProduct.quantity),
    errorMsg: MESSAGE.ERROR_OVER_MAX_QUANTITY,
  },
];

const validateProductInfo = (
  products: ProductImpl[],
  newProduct: ProductInfo,
  prevProductName: string | null = null,
) => {
  const validator = generateProductInfoValidators(
    products,
    newProduct,
    prevProductName,
  );

  return validator.every(({ test, errorMsg }) => {
    if (test) throw new Error(errorMsg);
    return true;
  });
};

export { validateProductInfo };
