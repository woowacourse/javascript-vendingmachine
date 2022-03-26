import { ProductItem, RawProductItem } from '../types';
import { toInt } from '../utils';
import ValidationResult from './validation-result';

const isInteger = (str: string) => {
  // Number => 소수점도 허용하기 때문에 사용하지 않는다
  // parseInt => 중간에 문자가 있어도 숫자를 리턴하기 때문에 사용하지 않는다
  return /^-?[0-9]+$/g.test(str);
};

export const validateProductName = (name: string, productList: Array<ProductItem>) => {
  if (!name) return new ValidationResult(true, '상품명을 입력해 주세요');
  if (name.length > 10) return new ValidationResult(true, '상품명은 10글자 이내이어야 합니다');
  if (productList.some((item) => name === item.name))
    return new ValidationResult(true, '이미 등록된 상품입니다');
  return new ValidationResult(false);
};

export const validateProductPrice = (price: string) => {
  if (!price) return new ValidationResult(true, '상품 기격을 입력해 주세요');
  if (!isInteger(price)) return new ValidationResult(true, '상품 가격은 숫자이어야 합니다');
  const priceNum = toInt(price, 0);
  if (priceNum < 100 || 10000 < priceNum)
    return new ValidationResult(true, '상품가격은 100원 ~ 10,000원 이내이어야 합니다');
  if (priceNum % 10) return new ValidationResult(true, '상품 가격은 10원 단위이어야 합니다');
  return new ValidationResult(false);
};

export const validateProductQuantity = (quantity: string) => {
  if (!quantity) return new ValidationResult(true, '상품 수량을 입력해 주세요');
  if (!isInteger(quantity)) return new ValidationResult(true, '상품 수량은 숫자이어야 합니다');
  const quantityNum = toInt(quantity, 0);
  if (quantityNum < 1 || 20 < quantityNum)
    return new ValidationResult(true, '상품 수량은 1개 ~ 20개 이내이어야 합니다');
  return new ValidationResult(false);
};

export const validateProduct = (
  { name, price, quantity }: RawProductItem,
  productList: Array<ProductItem>
) => {
  return [
    validateProductName(name, productList),
    validateProductPrice(price),
    validateProductQuantity(quantity),
  ];
};
