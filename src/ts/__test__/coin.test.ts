import CoinManagement from '../domain/CoinManagement';

describe('잔돈 도메인 테스트', () => {
  const cash = 1000;

  it('금액을 입력 받으면, 총액에 더해진다.', () => {
    const coinManagement = new CoinManagement();

    expect(coinManagement.totalCash).toBe(0);
    coinManagement.addCash(cash);
    expect(coinManagement.totalCash).toBe(cash);
  });

  it('랜덤으로 생성한 동전의 총액이 투입 금액과 일치한다.', () => {
    const coinManagement = new CoinManagement();
    const { coins } = coinManagement;
    coinManagement.addCoins(cash);

    const cashFromCoins = Object.keys(coins).reduce(
      (acc, current) => acc + Number(current) * coins[current],
      0,
    );
    expect(cashFromCoins).toBe(cash);
  });
});
