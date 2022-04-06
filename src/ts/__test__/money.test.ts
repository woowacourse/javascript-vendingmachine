import MoneyManagement from '../domain/MoneyManagement';
import CoinManagement from '../domain/CoinManagement';
import type { Coins } from '../domain/types';
import { coinType } from '../constants';

jest.mock('../utils', () => {
  return {
    getRandomIndex: jest
      .fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0) // 500 * 10
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0), // 500 * 10
  };
});

describe('Money 도메인 테스트', () => {
  const defaultCoins: Coins = coinType.reduce((object, type) => {
    object[type] = 0;
    return object;
  }, {});

  it('보유 금액이 추가된다.', () => {
    const moneyManagement = new MoneyManagement();
    const money = 1000;

    expect(moneyManagement.money).toBe(0);
    moneyManagement.addMoney(money);

    expect(moneyManagement.money).toBe(money);
  });

  it('보유 금액이 차감된다.', () => {
    const moneyManagement = new MoneyManagement();
    const money = 1000;

    expect(moneyManagement.money).toBe(0);

    moneyManagement.addMoney(money);
    expect(moneyManagement.money).toBe(money);

    moneyManagement.subtractMoney(money);
    expect(moneyManagement.money).toBe(0);
  });

  it('자판기에 동전이 충분히 있다면, 모두 반환받는다.', () => {
    const moneyManagement = new MoneyManagement();
    const coinManagement = new CoinManagement();

    const totalCash = 5000;
    const money = totalCash - 1000;

    coinManagement.addCash(totalCash);
    moneyManagement.addMoney(money);

    const returnableCoins = moneyManagement.returnCoins(coinManagement.coins);

    expect(returnableCoins).toEqual({ ...defaultCoins, '500': money / 500 });
  });

  it('자판기에 동전이 부족하다면, 자판기가 보유한 동전만큼 반환받는다.', () => {
    const moneyManagement = new MoneyManagement();
    const coinManagement = new CoinManagement();

    const totalCash = 5000;
    const money = totalCash + 1000;

    coinManagement.addCash(totalCash);
    moneyManagement.addMoney(money);

    const returnableCoins = moneyManagement.returnCoins(coinManagement.coins);

    expect(returnableCoins).toEqual({
      ...defaultCoins,
      '500': totalCash / 500,
    });
  });
});
