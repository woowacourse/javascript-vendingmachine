import type { CoinCollectionType } from '../ts/vendingMachine/CoinRecharge';

import { COIN_10, COIN_100, COIN_50, COIN_500 } from '../ts/constant/rule';
import { PURCHASE_ERROR_MESSAGE } from '../ts/constant/errorMessage';
import ItemPurchase from '../ts/vendingMachine/ItemPurchase';

describe('잔돈 반환 테스트', () => {
  const vendingMachine = new ItemPurchase();
  test('남은 투입 금액을 반환할 수 있다.', () => {
    const coinCollection: CoinCollectionType = {
      [COIN_500]: 0,
      [COIN_100]: 5,
      [COIN_50]: 1,
      [COIN_10]: 1,
    };
    const remainedMoneyInput = 1000;
    const remainedMoney = vendingMachine.giveChange(remainedMoneyInput, coinCollection);
    expect(vendingMachine.calculateTotalChange(vendingMachine.change)).toBe(
      remainedMoneyInput - remainedMoney
    );
  });

  test('현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.', () => {
    const coinCollection: CoinCollectionType = {
      [COIN_500]: 3,
      [COIN_100]: 15,
      [COIN_50]: 10,
      [COIN_10]: 10,
    };
    const remainedMoneyInput = 1500;
    vendingMachine.giveChange(remainedMoneyInput, coinCollection);
    expect(vendingMachine.change[COIN_500]).toBe(3);
  });
});

describe('구매 가능 여부 확인', () => {
  const vendingMachine = new ItemPurchase();

  test('수량이 남아 있지 않은 상품은 구매할 수 없다.', () => {
    const itemQuantity = 0;
    const itemPrice = 1000;
    const remainedMoneyInput = 1000;
    expect(() =>
      vendingMachine.validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)
    ).toThrow(PURCHASE_ERROR_MESSAGE.OUT_OF_STOCK);
  });

  test('남은 투입 금액보다 가격이 비싸면 구매할 수 없다.', () => {
    const itemQuantity = 1;
    const itemPrice = 1000;
    const remainedMoneyInput = 990;
    expect(() =>
      vendingMachine.validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)
    ).toThrow(PURCHASE_ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  });
});
