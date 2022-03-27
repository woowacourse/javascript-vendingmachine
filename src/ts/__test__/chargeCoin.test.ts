import { CoinCollection } from '../../index.d';
import CoinCollectionImpl from '../entity/CoinCollectionImpl';

describe('동전 충전 테스트', () => {
  let coinCollection: CoinCollection;

  beforeEach(() => {
    coinCollection = new CoinCollectionImpl();
  });

  it('투입 금액만큼 동전이 만들어져야 한다.', () => {
    const inputMoney = 89500;

    coinCollection.generateCoins(inputMoney);

    expect(coinCollection.calculateTotalAmount()).toBe(inputMoney);
  });
});
