import { ERROR_MESSAGE } from '../constants/errorConstants';
import { checkItemExist, checkPurchaseAvailable } from './validates';

test('구매 대상의 수량이 0개 이면 에러를 throw한다.', () => {
  const quantity = 0;

  expect(() => checkItemExist(quantity)).toThrowError(ERROR_MESSAGE.ITEM_PURCHASE.NO_STOCK);
});

test('구매 대상의 가격보다 남은 투입한 금애기 작으면 에러를 throw한다.', () => {
  const money = 1000;
  const price = 1200;

  expect(() => checkPurchaseAvailable(money, price)).toThrowError(
    ERROR_MESSAGE.ITEM_PURCHASE.NO_MONEY
  );
});
