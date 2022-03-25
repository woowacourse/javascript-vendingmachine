import { VENDING_MACHINE } from '@Constants/index';
import { IProduct } from '@Domain/Store/Interface';
import { isStringLengthInRange, isNumberInRange, isCorrectNumberUnit } from '@Utils/index';

export const validateProduct = (product: IProduct) => {
  const { name, price, quantity } = product;

  const {
    MIN_PRODUCT_NAME,
    MAX_PRODUCT_NAME,
    MIN_PRODUCT_PRICE,
    MAX_PRODUCT_PRICE,
    MONEY_UNIT,
    MIN_PRODUCT_QUANTITY,
    MAX_PRODUCT_QUANTITY,
  } = VENDING_MACHINE;

  if (name === '') throw new Error('상품명을 입력해주세요.');
  if (!isStringLengthInRange(name, MIN_PRODUCT_NAME, MAX_PRODUCT_NAME))
    throw new Error(
      `상품명은 ${MIN_PRODUCT_NAME}자에서 ${MAX_PRODUCT_NAME}자까지 입력할 수 있습니다.`,
    );

  if (!Number.isInteger(price)) throw new Error('상품 가격은 숫자만 입력할 수 있습니다.');

  if (!isNumberInRange(price, MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE))
    throw new Error(
      `상품 가격은 ${MIN_PRODUCT_PRICE}원에서 ${MAX_PRODUCT_PRICE}원까지 입력할 수 있습니다.`,
    );

  if (!isCorrectNumberUnit(price, MONEY_UNIT))
    throw new Error(`상품 가격은 ${MONEY_UNIT}원 단위로 입력할 수 있습니다.`);

  if (!Number.isInteger(quantity)) throw new Error('상품 수량은 숫자만 입력할 수 있습니다.');

  if (!isNumberInRange(quantity, MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY))
    throw new Error(
      `상품 수량은 ${MIN_PRODUCT_QUANTITY}개에서 최대 ${MAX_PRODUCT_QUANTITY}개까지만 입력할 수 있습니다.`,
    );
};

export const validateHoldingAmountToAdd = (holdingAmountToAdd: number, totalAmount: number) => {
  const { MAX_HOLDING_AMOUNT, MONEY_UNIT } = VENDING_MACHINE;

  if (!Number.isInteger(holdingAmountToAdd))
    throw new Error('추가할 보유 금액은 숫자만 입력할 수 있습니다.');

  if (!isCorrectNumberUnit(holdingAmountToAdd, MONEY_UNIT))
    throw new Error(`추가할 보유 금액은 ${MONEY_UNIT}원 단위로 입력할 수 있습니다.`);
  if (holdingAmountToAdd + totalAmount > MAX_HOLDING_AMOUNT)
    throw new Error(`보유 금액은 ${MAX_HOLDING_AMOUNT}원까지 충전할 수 있습니다.`);
};
