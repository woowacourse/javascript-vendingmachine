import { COIN_UNITS, ERROR_MESSAGE } from '../constants';
import Store from '../flux/store';
import {
  validateChargeCoins,
  validateProductName,
  validateProductPrice,
  validateProductQuantity,
} from '../validation/validators';

const store = new Store({
  activeTab: 'product-manage-tab',
  chargedMoney: 0,
  chargedCoins: COIN_UNITS,
  productList: [
    {
      name: '콜라',
      price: 1500,
      quantity: 20,
      isEditing: false,
    },
  ],
});

describe('상품 추가 시 유효성 검사를 한다.', () => {
  const { productList } = store.getState();

  test('상품명은 최소 1글자, 최대 10글자까지 가능하다.', () => {
    const productName = '사이다';
    const { hasError } = validateProductName(productName, productList);
    console.log(productList, validateProductName(productName, productList));
    expect(hasError).toBe(false);
  });

  test('상품명이 중복되면 에러를 발생시킨다.', () => {
    const productName = '콜라';
    const { errorMessage } = validateProductName(productName, productList);
    expect(errorMessage).toBe(ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);
  });

  test('상품 가격은 100원 ~ 10,000원 이내가 아니면 에러를 발생시킨다.', () => {
    const price = '10000000';
    const { errorMessage } = validateProductPrice(price);
    expect(errorMessage).toBe(ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_PRICE);
  });

  test('상품 가격은 10원으로 나누어 떨어지지 않으면 에러를 발생시킨다.', () => {
    const price = '1231';
    const { errorMessage } = validateProductPrice(price);
    expect(errorMessage).toBe(ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_PRODUCT_PRICE);
  });

  test('한 제품당 수량이 1개 ~ 20개 이내가 아니며 에러를 발생시킨다.', () => {
    const quantity = '21';
    const { errorMessage } = validateProductQuantity(quantity);
    expect(errorMessage).toBe(ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_QUANTITY);
  });
});

describe('잔돈 충전 시 유효성 검사를 한다.', () => {
  test('잔돈 입력 시 빈 값을 허용하지 않는다.', () => {
    const money = '';
    const { errorMessage } = validateChargeCoins(money, 0);
    expect(errorMessage).toBe(ERROR_MESSAGE.EMPTY_CHARGE_MONEY);
  });

  test('잔돈은 숫자만 입력 가능하다.', () => {
    const money = 'airman55';
    const { errorMessage } = validateChargeCoins(money, 0);
    expect(errorMessage).toBe(ERROR_MESSAGE.NOT_NUMBER_CHARGE_MONEY);
  });

  test('잔돈은 양수이어야 한다.', () => {
    const money = '-100';
    const { errorMessage } = validateChargeCoins(money, 0);
    expect(errorMessage).toBe(ERROR_MESSAGE.NEGATIVE_CHARGE_MONEY);
  });

  test('잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다.', () => {
    const money = '1231';
    const { errorMessage } = validateChargeCoins(money, 0);
    expect(errorMessage).toBe(ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_CHARGE_MONEY);
  });

  test('잔돈으로 보유할 수 있는 최대 금액은 100,000원이다.', () => {
    const money = '20000';
    const { errorMessage } = validateChargeCoins(money, 90000);
    expect(errorMessage).toBe(ERROR_MESSAGE.OVER_MAX_CHARGE_MONEY);
  });
});
