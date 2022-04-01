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
