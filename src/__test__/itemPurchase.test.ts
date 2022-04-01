import type { CoinCollectionType } from '../ts/vendingMachine/CoinRecharge';
import { COIN_10, COIN_100, COIN_50, COIN_500 } from '../ts/constant/rule';
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

const validatePurchasingBehavior = (
  itemQuantity: number,
  itemPrice: number,
  remainedMoneyInput: number
) => {
  if (itemQuantity === 0) {
    throw new Error('재고가 없습니다. 해당 상품은 더 이상 구매할 수 없습니다.');
  }

  if (itemPrice > remainedMoneyInput) {
    throw new Error('잔돈이 부족합니다. 해당 상품 구매를 원하신다면 금액을 투입해 주세요.');
  }
};

describe('구매 가능 여부 확인', () => {
  test('수량이 남아 있지 않은 상품은 구매할 수 없다.', () => {
    const itemQuantity = 0;
    const itemPrice = 1000;
    const remainedMoneyInput = 1000;
    expect(() => validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)).toThrow(
      '재고가 없습니다. 해당 상품은 더 이상 구매할 수 없습니다.'
    );
  });

  test('남은 투입 금액보다 가격이 비싸면 구매할 수 없다.', () => {
    const itemQuantity = 1;
    const itemPrice = 1000;
    const remainedMoneyInput = 990;
    expect(() => validatePurchasingBehavior(itemQuantity, itemPrice, remainedMoneyInput)).toThrow(
      '잔돈이 부족합니다. 해당 상품 구매를 원하신다면 금액을 투입해 주세요.'
    );
  });
});
