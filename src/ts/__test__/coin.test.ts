import CoinManagementDomain from '../domain/CoinManagement';

describe('잔돈 도메인 테스트', () => {
  const cash = 1000;

  it('금액을 입력 받으면, 총액에 더해진다.', () => {
    const coinDomain = new CoinManagementDomain();

    expect(coinDomain.totalCash).toBe(0);
    coinDomain.addCash(cash);
    expect(coinDomain.totalCash).toBe(cash);
  });

  it('랜덤으로 생성한 동전의 총액이 투입 금액과 일치한다.', () => {
    const coinDomain = new CoinManagementDomain();
    const coins = coinDomain.coins;
    coinDomain.addCoins(cash);

    const cashFromCoins = Object.keys(coins).reduce(
      (prev, current) => prev + Number(current) * coins[current],
      0,
    );
    expect(cashFromCoins).toBe(cash);
  });
});
