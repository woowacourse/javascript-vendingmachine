import {
  MAX_NAME_LENGTH,
  MAX_QUANTITY,
  MESSAGE,
  PRICE_RULE,
} from '../../constants';
import ProductImpl from '../../domain/Product';
import { ProductInfo } from '../../domain/types';

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

const isInvalidPrice = (price: number) => {
  const { MAX, MIN, UNIT } = PRICE_RULE;
  const isRanged = price >= MIN && price <= MAX;
  const isDivisible = price % UNIT === 0;
  return !(isRanged && isDivisible);
};

const isQuantityRanged = (quantity: number) =>
  quantity > MAX_QUANTITY || quantity <= 0;

const isEmpty = (product: ProductInfo) =>
  Object.keys(product).some(key => {
    if (typeof product[key] === 'number') {
      return Number.isNaN(product[key]);
    }
    return product[key].trim() === '';
  });

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
    test: isInvalidPrice(newProduct.price),
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
