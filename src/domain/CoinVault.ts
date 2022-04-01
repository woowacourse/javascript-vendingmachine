import {
  COIN_VAULT_CONDITION,
  COIN_CONDITION,
  COINS_PRICE_TABLE,
  COINS_INIT_QUANTITY,
  CHEAPEST_COIN,
  ERROR_MESSAGE,
} from '../utils/constants';
import { Coins } from '../utils/interface';
import { getRandomNumZeroToMax } from '../utils/domain.utils';

export class CoinVault {
  #coinsQuantity: Coins;

  constructor() {
    this.#coinsQuantity = { ...COINS_INIT_QUANTITY };
  }

  getCoins(): Coins {
    return this.#coinsQuantity;
  }

  getBalance() {
    return [...Object.entries(this.#coinsQuantity)].reduce(
      (previous, [key, value]) => previous + COINS_PRICE_TABLE[key] * value,
      0
    );
  }

  chargeMoney(money: number) {
    this.validateMoney(money);
    this.addCoins(this.generateRandomCoins(money));
  }

  private addCoins(coins: Coins) {
    const coinsQuantity = { ...this.#coinsQuantity };

    [...Object.entries(coins)].forEach(([key, value]) => {
      coinsQuantity[key] += value;
    });

    this.#coinsQuantity = coinsQuantity;
  }

  private validateMoney(money: number) {
    if (money + this.getBalance() > COIN_VAULT_CONDITION.MAX_BALANCE) {
      throw new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT);
    }
    if (money % COIN_CONDITION.UNIT_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_COIN_UNIT);
    }
  }

  private generateRandomCoins(money: number): Coins {
    let balance = money;
    const generatedCoins = { ...COINS_INIT_QUANTITY };

    [...Object.entries(COINS_PRICE_TABLE)].forEach(([key, price]) => {
      const maxQuotient = balance / price;

      if (price === CHEAPEST_COIN) {
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
