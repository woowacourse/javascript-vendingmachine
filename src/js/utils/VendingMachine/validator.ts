import { IProduct } from '@Domain/Store/Interface';
import { isStringLengthInRange, isNumberInRange, isCorrectNumberUnit } from '@Utils/index';

export const validateProduct = (product: IProduct) => {
  const { name, price, quantity } = product;

  if (name === '') throw new Error('상품명을 입력해주세요.');
  if (!isStringLengthInRange(name, 1, 10))
    throw new Error('상품명은 1자에서 10자까지 입력할 수 있습니다.');

  if (!Number.isInteger(price)) throw new Error('상품 가격은 숫자만 입력할 수 있습니다.');
  if (!isNumberInRange(price, 100, 10000))
    throw new Error('상품 가격은 100원에서 10000원까지 입력할 수 있습니다.');
  if (!isCorrectNumberUnit(price, 10))
    throw new Error('상품 가격은 10원 단위로 입력할 수 있습니다.');

  if (!Number.isInteger(quantity)) throw new Error('상품 수량은 숫자만 입력할 수 있습니다.');
  if (!isNumberInRange(quantity, 1, 20))
    throw new Error('상품 수량은 1개에서 최대 20개까지만 입력할 수 있습니다.');
};

export const validateHoldingAmountToAdd = (holdingAmountToAdd: number, totalAmount: number) => {
  if (!Number.isInteger(holdingAmountToAdd))
    throw new Error('추가할 보유 금액은 숫자만 입력할 수 있습니다.');
  if (!isCorrectNumberUnit(holdingAmountToAdd, 10))
    throw new Error('추가할 보유 금액은 10원 단위로 입력할 수 있습니다.');
  if (holdingAmountToAdd + totalAmount > 100000)
    throw new Error('보유 금액은 100,000원까지 충전할 수 있습니다.');
};
