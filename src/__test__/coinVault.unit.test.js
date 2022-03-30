import { CoinVault } from '../domain/CoinVault.ts';

test('자판기가 최초 보유한 금액은 0원이다.', () => {
  const coinValut = new CoinVault();
  const { coin500, coin100, coin50, coin10 } = coinValut.getCoins();

  expect(coin500).toStrictEqual(0);
  expect(coin100).toStrictEqual(0);
  expect(coin50).toStrictEqual(0);
  expect(coin10).toStrictEqual(0);
  expect(coinValut.getBalance()).toStrictEqual(0);
});

test('자판기 보유 금액은 최대 100,000원 이다.', () => {
  const coinValut = new CoinVault();
  expect(() => {
    coinValut.chargeMoney(110000);
  }).toThrowError('돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.');
});

test('자판기 잔돈이 10원 단위가 아닐시 에러 메세지를 보여준다', () => {
  const coinValut = new CoinVault();
  expect(() => {
    coinValut.chargeMoney(1234);
  }).toThrowError('상평통보는 안 받습니다. 10원단위로 넣어주세요!');
});

test('자판기 보유 금액만큼의 동전을 생성한다.', () => {
  const coinValut = new CoinVault();
  expect(coinValut.getBalance()).toStrictEqual(0);
  coinValut.chargeMoney(5000);
  expect(coinValut.getBalance()).toStrictEqual(5000);
});

test('자판기 보유 금액을 누적하여 충전할 수 있다', () => {
  const coinValut = new CoinVault();
  expect(coinValut.getBalance()).toStrictEqual(0);

  coinValut.chargeMoney(5000);
  expect(coinValut.getBalance()).toStrictEqual(5000);

  coinValut.chargeMoney(5000);
  expect(coinValut.getBalance()).toStrictEqual(10000);
});

test('추가 충전후 합산 금액도 100,000 을 넘을 수 없다', () => {
  const coinValut = new CoinVault();
  expect(coinValut.getBalance()).toStrictEqual(0);

  coinValut.chargeMoney(50000);
  expect(coinValut.getBalance()).toStrictEqual(50000);

  expect(() => {
    coinValut.chargeMoney(60000);
  }).toThrowError('돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.');
});
