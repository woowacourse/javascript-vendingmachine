import type { CoinCollectionType } from '../ts/vendingMachine/CoinRecharge';

import { COIN_10, COIN_100, COIN_50, COIN_500 } from '../ts/constant/rule';
import { PURCHASE_ERROR_MESSAGE } from '../ts/constant/errorMessage';
import ItemPurchase from '../ts/vendingMachine/ItemPurchase';

describe('잔돈 반환 테스트', () => {
  const vendingMachine = new ItemPurchase();
  test('잔돈을 반환하면, 잔돈(vendingMachine.change)과 반환하지 못한 나머지 금액을 알 수 있다.', () => {
    const coinCollection: CoinCollectionType = {
      [COIN_500]: 0,
      [COIN_100]: 5,
      [COIN_50]: 1,
      [COIN_10]: 1,
    };
    const remainedMoneyInput = 1000;
    const remainedMoney = vendingMachine.giveChange(remainedMoneyInput, coinCollection);
    expect(vendingMachine.calculateTotalChange()).toBe(remainedMoneyInput - remainedMoney);
  });

  test('현재 보유한 최소 개수의 동전을 계산해서 잔돈(vendingMachine.change)을 갱신한다.', () => {
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

  test('수량이 남아 있지 않은 상품을 구매하려 하면 에러가 발생한다.', () => {
    const itemQuantity = 0;
    const itemPrice = 1000;
    const remainedMoneyInput = 1000;
    expect(() =>
      vendingMachine.validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)
    ).toThrow(PURCHASE_ERROR_MESSAGE.OUT_OF_STOCK);
  });

  test('남은 투입 금액보다 가격이 비싼 상품을 구매하려 하면 에러가 발생한다.', () => {
    const itemQuantity = 1;
    const itemPrice = 1000;
    const remainedMoneyInput = 990;
    expect(() =>
      vendingMachine.validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)
    ).toThrow(PURCHASE_ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  });

  test('올바른 값을 입력하면 에러가 발생하지 않는다.', () => {
    const itemQuantity = 1;
    const itemPrice = 1000;
    const remainedMoneyInput = 1000;
    expect(() =>
      vendingMachine.validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)
    ).not.toThrow();
  });

  describe('상품 구매 테스트', () => {
    const vendingMachine = new ItemPurchase();

    test('금액을 누적하여 투입할 수 있다.', () => {
      const prevMoneyAmount = vendingMachine.money;
      const inputMoney = 3000;
      vendingMachine.insertMoney(inputMoney);

      const nextInputMoney = 1000;
      vendingMachine.insertMoney(nextInputMoney);
      expect(vendingMachine.money).toBe(prevMoneyAmount + inputMoney + nextInputMoney);
    });

    test('상품을 구입하면, 투입한 금액과 해당 상품의 수량이 감소한다.', () => {
      const prevMoneyAmount = vendingMachine.money;
      const inputMoney = 3000;
      vendingMachine.insertMoney(inputMoney);

      const itemPrice = 1000;
      vendingMachine.purchaseItem(itemPrice);
      expect(vendingMachine.money).toBe(prevMoneyAmount + inputMoney - itemPrice);
    });
  });
});
