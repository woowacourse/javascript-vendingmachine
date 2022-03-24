import CoinManagementDomain from '../domain/CoinManagement';

describe('잔돈 도메인 테스트', () => {
  const coinDomain = new CoinManagementDomain();
  const clearDomain = () => {
    coinDomain.addCash(-coinDomain.totalCash);
  };
  const cash = 1000;

  beforeEach(() => {
    clearDomain();
  });

  it('금액을 입력 받으면, 총액에 더해진다.', () => {
    expect(coinDomain.totalCash).toBe(0);
    coinDomain.addCash(cash);
    expect(coinDomain.totalCash).toBe(cash);
  });

  it('랜덤으로 생성한 동전의 총액이 투입 금액과 일치한다.', () => {
    coinDomain.addCoins(cash);
    const coins = coinDomain.coins;
    const cashFromCoins = Object.keys(coins).reduce(
      (prev, current) => prev + Number(current) * coins[current],
      0,
    );
    expect(cashFromCoins).toBe(cash);
  });
});
