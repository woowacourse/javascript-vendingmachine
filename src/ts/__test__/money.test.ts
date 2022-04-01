import MoneyManagement from '../domain/MoneyManagement';

describe('Money 도메인 테스트', () => {
  let moneyDomain;
  beforeEach(() => {
    moneyDomain = new MoneyManagement();
  });

  it('보유 금액이 추가된다.', () => {
    const money = 1000;

    expect(moneyDomain.money).toBe(0);
    moneyDomain.addMoney(money);

    expect(moneyDomain.money).toBe(money);
  });

  it('보유 금액이 차감된다.', () => {
    const money = 1000;

    expect(moneyDomain.money).toBe(0);

    moneyDomain.addMoney(money);
    expect(moneyDomain.money).toBe(money);

    moneyDomain.subtractMoney(money);
    expect(moneyDomain.money).toBe(0);
  });
});
