import { UserMoney } from '../domain/UserMoney';

describe('사용자가 사용할 금액 테스트', () => {
  let userMoney;

  beforeEach(() => {
    userMoney = new UserMoney();
  });

  test('최초 충전 금액은 0원이다', () => {
    expect(userMoney.getMoney()).toStrictEqual(0);
  });

  test('사용자가 사용할 금액을 투입할 수 있다', () => {
    expect(userMoney.getMoney()).toStrictEqual(0);

    userMoney.setMoney(1000);
    expect(userMoney.getMoney()).toStrictEqual(1000);
  });

  test('사용자가 사용할 금액을 누적으로 투입할 수 있다', () => {
    expect(userMoney.getMoney()).toStrictEqual(0);

    userMoney.setMoney(1000);
    userMoney.setMoney(1000);
    expect(userMoney.getMoney()).toStrictEqual(2000);
  });
});
