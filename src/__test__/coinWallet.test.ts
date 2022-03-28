import CoinWallet from '../domains/coinWallet';
import { COIN_VALUES } from '../utils/constants';

describe('CoinWallet 작동 테스트', () => {
  test('랜덤으로 생성된 코인의 합이 입력된 금액과 같은지 확인한다.', () => {
    const money = 7000;
    const coinWallet = new CoinWallet();

    coinWallet.rechargeCoinWallet(money);

    const coinWalletInfo = coinWallet.getCoinWalletInfo();

    const coinTotalAmount = Object.keys(coinWalletInfo).reduce(
      (prev, key) => prev + coinWalletInfo[key] * COIN_VALUES[key],
      0,
    );

    expect(coinTotalAmount === money).toBe(true);
  });

  test('잔돈을 반환할때에, 투입한 금액보다 보유한 동전이 많을 경우 동전들을 반환한다', () => {
    const money = 3000;
    const coinWallet = new CoinWallet();
    coinWallet.rechargeCoinWallet(money);

    const change = 1200;
    const returnCoinInfo = coinWallet.returnChangeCoinInfo(change);
    const returnCoinsTotalAmount = Object.keys(returnCoinInfo).reduce(
      (prev, key) => prev + returnCoinInfo[key] * COIN_VALUES[key],
      0,
    );

    const currentCoinTotalAmount = coinWallet.computeCoinTotalAmount();

    expect(returnCoinsTotalAmount === change).toBe(true);
    expect(currentCoinTotalAmount === money - change).toBe(true);
  });
});
