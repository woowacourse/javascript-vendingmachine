import { COIN_VAULT_CONDITION, COIN_CONDITION, COINS_PRICE_TABLE } from '../utils/domain.const';
import { Coins } from '../utils/domain.interface';
import { getRandomNumZeroToMax } from '../utils/domain.utils';

export class CoinVault {
  private coinsQuantity: Coins;

  constructor() {
    this.coinsQuantity = {
      coin500: COIN_CONDITION.INIT_QUANTITY,
      coin100: COIN_CONDITION.INIT_QUANTITY,
      coin50: COIN_CONDITION.INIT_QUANTITY,
      coin10: COIN_CONDITION.INIT_QUANTITY,
    };
  }

  addCoins(coins: Coins) {
    [...Object.entries(coins)].forEach(([key, value]) => {
      this.coinsQuantity[key] += value;
    });
  }

  getCoins(): Coins {
    return this.coinsQuantity;
  }

  getBalance() {
    return [...Object.entries(this.coinsQuantity)].reduce(
      (previous, [key, value]) => previous + COINS_PRICE_TABLE[key] * value,
      0
    );
  }

  chargeMoney(money: number) {
    try {
      this.validateMoney(money);
      this.addCoins(this.generateRandomCoins(money));
    } catch (err) {
      throw err;
    }
  }

  validateMoney(money: number): boolean {
    if (money + this.getBalance() > COIN_VAULT_CONDITION.MAX_BALANCE) {
      throw new Error('돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.');
    }
    if (money % 10 !== 0) {
      throw new Error('상평통보는 안 받습니다. 10원단위로 넣어주세요!');
    }
    return;
  }

  generateRandomCoins(money: number): Coins {
    let balance = money;
    const generatedCoins = {
      coin500: 0,
      coin100: 0,
      coin50: 0,
      coin10: 0,
    };

    [...Object.entries(COINS_PRICE_TABLE)].forEach(([key, price]) => {
      const maxQuotient = balance / price;

      if (price === 10) {
        generatedCoins[key] = maxQuotient;
        return;
      }
      const randomQuantity = getRandomNumZeroToMax(maxQuotient);
      balance -= price * randomQuantity;
      generatedCoins[key] = randomQuantity;
    });

    return generatedCoins;
  }
}
