import CoinManagementDomain from '../domain/CoinManagementDomain/CoinManagement';
import { CASH_RULE } from '../constants';
import { MESSAGE } from '../constants/message';

describe('잔돈 도메인 동전 생성 테스트', () => {
  it('금액을 입력 받으면, 랜덤으로 동전이 생성되어 총액에 더해진다.', () => {
    const coinDomain = new CoinManagementDomain();
    const cash = 1000;

    coinDomain.addCash(cash);
    expect(coinDomain.totalCash).toBe(cash);

    const { coins } = coinDomain;
    const cashFromCoins = Object.keys(coins).reduce(
      (prev, current) => prev + Number(current) * coins[current],
      0,
    );
    expect(cashFromCoins).toBe(cash);
  });
});

describe('잔돈 도메인 유효성 검증 테스트', () => {
  const coinDomain = new CoinManagementDomain();

  it(`잔돈 입력 시, ${CASH_RULE.MAX}원 이하가 아니면 에러를 발생시킨다.`, () => {
    const invalidCash = CASH_RULE.MAX + CASH_RULE.UNIT;

    expect(() => coinDomain.validateCashInput(invalidCash)).toThrowError(
      MESSAGE.ERROR_INVALID_CASH,
    );
  });

  it(`잔돈 입력 시, ${CASH_RULE.UNIT}으로 나누어 떨어지지 않으면 에러를 발생시킨다.`, () => {
    const invalidCash = CASH_RULE.MAX + CASH_RULE.UNIT / 2;

    expect(() => coinDomain.validateCashInput(invalidCash)).toThrowError(
      MESSAGE.ERROR_INVALID_CASH,
    );
  });
});
