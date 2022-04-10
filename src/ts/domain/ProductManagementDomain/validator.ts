import Product from '../Product';
import { MAX_NAME_LENGTH, MAX_QUANTITY, PRICE_RULE } from '../../constants';
import { VENDING_MACHINE_MESSAGE } from '../../constants/message';
import { isInvalidNumber } from '../../utils/validator';
import { ProductInfo, ProductInfoUnionType } from '../types';

const findEmptyField = (
  product: ProductInfo,
): { isEmpty: boolean; target: ProductInfoUnionType } => {
  let target: ProductInfoUnionType;

  const isEmpty = Object.keys(product).some((key: ProductInfoUnionType) => {
    target = key;
    if (typeof product[key] === 'number') {
      return Number.isNaN(product[key]);
    }
    return product[key].toString().trim() === '';
  });

  return { isEmpty, target };
};

const hasSameProduct = (
  products: Product[],
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

interface Validator {
  test: boolean;
  errorMsg: string;
  target: ProductInfoUnionType;
}

const generateProductInfoValidators = (
  products: Product[],
  newProduct: ProductInfo,
  prevProductName: string | null = null,
): Validator[] => [
  {
    test: findEmptyField(newProduct).isEmpty,
    errorMsg: VENDING_MACHINE_MESSAGE.ERROR_EMPTY_VALUE,
    target: findEmptyField(newProduct).target,
  },
  {
    test: hasSameProduct(products, newProduct, prevProductName),
    errorMsg: VENDING_MACHINE_MESSAGE.ERROR_SAME_PRODUCT,
    target: 'name',
  },
  {
    test: isOverMaxLength(newProduct.name),
    errorMsg: VENDING_MACHINE_MESSAGE.ERROR_OVER_MAX_LENGTH,
    target: 'name',
  },
  {
    test: isInvalidNumber(newProduct.price, PRICE_RULE),
    errorMsg: VENDING_MACHINE_MESSAGE.ERROR_INVALID_PRICE,
    target: 'price',
  },
  {
    test: isQuantityRanged(newProduct.quantity),
    errorMsg: VENDING_MACHINE_MESSAGE.ERROR_OVER_MAX_QUANTITY,
    target: 'quantity',
  },
];

const validateProductInfo = (
  products: Product[],
  newProduct: ProductInfo,
  prevProductName: string | null = null,
) => {
  const validator = generateProductInfoValidators(
    products,
    newProduct,
    prevProductName,
  );

  return validator.every(({ test, errorMsg, target }) => {
    if (test) {
      const error = new Error(errorMsg);
      error.name = target;
      throw error;
    }
    return true;
  });
};

export { validateProductInfo };
