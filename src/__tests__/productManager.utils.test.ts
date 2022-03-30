import { Product } from '../ts/types/vendingMachineProductManager';

import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../ts/components/validator';
import {
  ERROR_MESSAGE,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
} from '../ts/constants';
import { checkDuplicatedProductName } from '../ts/domains/validator';

describe('올바른 상품명 확인', () => {
  test(`상품명은 최소 ${PRODUCT_NAME.MIN_LENGTH}글자 부터 최대 ${PRODUCT_NAME.MAX_LENGTH}글자까지 가능하다. (성공 케이스, 입력: "콜라")`, () => {
    const productName = '콜라';

    expect(() => {
      checkValidLengthProductName(productName);
    }).not.toThrowError();
  });

  test('상품명은 빈 문자열일 수 없다. (실패 케이스, 입력: "")', () => {
    const productName = '';

    expect(() => {
      checkValidLengthProductName(productName);
    }).toThrowError(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  });

  test(`${PRODUCT_NAME.MAX_LENGTH}글자가 넘는 상품명은 입력할 수 없다. (실패 케이스, 입력: "열 글자가 넘는 상품명")`, () => {
    const productName = '열 글자가 넘는 상품명';

    expect(() => {
      checkValidLengthProductName(productName);
    }).toThrowError(ERROR_MESSAGE.WRONG_LENGTH_PRODUCT_NAME);
  });

  test('중복된 상품명은 입력할 수 없다.', () => {
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
  test(`상품 가격은 ${PRODUCT_PRICE.MIN_PRICE}원 부터 ${PRODUCT_PRICE.MAX_PRICE}원까지 가능하다. 그리고 ${PRODUCT_PRICE.UNIT}원으로 나누어 떨어져야 한다. (성공 케이스, 입력: 1500)`, () => {
    const productPrice = 1500;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).not.toThrowError();
  });

  test(`상품 가격은 ${PRODUCT_PRICE.MIN_PRICE}원 미만일 수 없다. (실패 케이스, 입력: 90)`, () => {
    const productPrice = 90;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).toThrowError(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  });

  test(`상품 가격은 ${PRODUCT_PRICE.MAX_PRICE}원 초과일 수 없다. (실패 케이스, 입력: 11000)`, () => {
    const productPrice = 11000;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).toThrowError(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  });

  test(`상품 가격은 ${PRODUCT_PRICE.UNIT}원으로 나누어 떨어져야 한다. (실패 케이스, 입력: 155)`, () => {
    const productPrice = 155;

    expect(() => {
      checkValidProductPrice(productPrice);
    }).toThrowError(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
  });
});

describe('올바른 상품 수량 확인', () => {
  test(`한 제품당 수량은 최소 ${PRODUCT_QUANTITY.MIN_QUANTITY}개 최대 ${PRODUCT_QUANTITY.MAX_QUANTITY}개까지 넣을 수 있다. (성공 케이스, 입력: 15)`, () => {
    const productQuantity = 15;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).not.toThrowError();
  });

  test('제품의 수량은 정수여야 한다. (실패 케이스, 입력: 1.3)', () => {
    const productQuantity = 1.3;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).toThrowError(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  });

  test(`한 제품당 수량은 ${PRODUCT_QUANTITY.MIN_QUANTITY}개 미만일 수 없다. (실패 케이스, 입력: 0)`, () => {
    const productQuantity = 0;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).toThrowError(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  });

  test(`한 제품당 수량은 ${PRODUCT_QUANTITY.MAX_QUANTITY}개 초과일 수 없다. (실패 케이스, 입력: 21)`, () => {
    const productQuantity = 21;

    expect(() => {
      checkValidProductQuantity(productQuantity);
    }).toThrowError(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  });
});
