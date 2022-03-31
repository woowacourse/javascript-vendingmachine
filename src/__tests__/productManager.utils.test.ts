import { Product } from '../ts/types/vendingMachineProductManager';

import {
  checkDuplicatedProductName,
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../ts/validation/checkProduct';

import { ERROR_MESSAGE } from '../ts/constants/errorMessage';
import {
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
} from '../ts/constants/product';

describe('올바른 상품명 확인', () => {
  test(`상품명이 ${PRODUCT_NAME.MAX_LENGTH}글자일 경우 error가 발생하지 않는다.`, () => {
    const productName = '정확히열글자인상품명';

    expect(() => {
      checkValidLengthProductName(productName);
    }).not.toThrowError();
  });

  test(`상품명에 빈 값이 들어올 경우 error가 발생된다.`, () => {
    const productName = '   ';

    expect(() => {
      checkValidLengthProductName(productName);
    }).toThrowError(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  });

  test(`상품명이 ${PRODUCT_NAME.MAX_LENGTH}글자가 넘는 경우 error가 발생된다.`, () => {
    const productName = '열 글자가 넘는 상품명';

    expect(() => {
      checkValidLengthProductName(productName);
    }).toThrowError(ERROR_MESSAGE.WRONG_LENGTH_PRODUCT_NAME);
  });

  test('중복된 상품명을 입력할 경우 error가 발생된다.', () => {
    const products: Product[] = [
      {
        name: '콜라',
        price: 1500,
        quantity: 20,
      },
      {
        name: '사이다',
        price: 1500,
        quantity: 20,
      },
    ];
    const duplicateProduct: Product = {
      name: '콜라',
      price: 1800,
      quantity: 10,
    };

    expect(() => {
      checkDuplicatedProductName(products, duplicateProduct);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  });
});

describe('올바른 상품 가격 확인', () => {
  test(`상품 가격이 ${PRODUCT_PRICE.UNIT}원 단위로 작성되고, ${PRODUCT_PRICE.MIN_PRICE}원 이상 ${PRODUCT_PRICE.MAX_PRICE}원 이하 일경우 error가 발생되지 않는다.`, () => {
    const productPrice = 1500;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).not.toThrowError();
  });

  test(`상품 가격이 ${PRODUCT_PRICE.MIN_PRICE}원 미만일 경우 error가 발생된다.`, () => {
    const productPrice = 90;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).toThrowError(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  });

  test(`상품 가격이 ${PRODUCT_PRICE.MAX_PRICE}원을 초과할 경우 error가 발생된다.`, () => {
    const productPrice = 10010;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).toThrowError(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  });

  test(`상품 가격이 ${PRODUCT_PRICE.UNIT}원 단위가 아닐 경우 error가 발생된다.`, () => {
    const productPrice = 155;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).toThrowError(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
  });
});

describe('올바른 상품 수량 확인', () => {
  test(`제품의 수량이 ${PRODUCT_QUANTITY.MIN_QUANTITY}에서 ${PRODUCT_QUANTITY.MAX_QUANTITY}사이일 경우 error가 발생되지 않는다.`, () => {
    const productQuantity = 15;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).not.toThrowError();
  });

  test(`제품의 수량이 소수일 경우 error가 발생된다.`, () => {
    const productQuantity = 1.3;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).toThrowError(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  });

  test(`제품의 수량이 ${PRODUCT_QUANTITY.MIN_QUANTITY}보다 작을 경우 error가 발생된다.`, () => {
    const productQuantity = 0;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).toThrowError(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  });

  test(`제품의 수량이 ${PRODUCT_QUANTITY.MAX_QUANTITY}이 넘을 경우 error가 발생된다.`, () => {
    const productQuantity = 21;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).toThrowError(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  });
});
