import CoinManagementDomain from '../domain/CoinManagement';

describe('잔돈 도메인 테스트', () => {
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
