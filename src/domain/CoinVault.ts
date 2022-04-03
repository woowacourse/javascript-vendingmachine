import {
  COIN_VAULT_CONDITION,
  COIN_CONDITION,
  COINS_UNIT_TABLE,
  COINS_INIT_QUANTITY,
  CHEAPEST_COIN,
  ERROR_MESSAGE,
  CHEAPEST_PAPER_MONEY_UNIT,
} from '../utils/constants';
import { Coins } from '../utils/interface';
import { getRandomNumZeroToMax } from '../utils/domain.utils';

interface CoinVaultInterface {
  getCoins(): Coins;
  getBalance();
  chargeMoney(money: number);
  returnCoins(userMoney: number): [Coins, number];
}

export class CoinVault implements CoinVaultInterface {
  #coinsQuantity: Coins;

  constructor() {
    this.#coinsQuantity = { ...COINS_INIT_QUANTITY };
  }

  getCoins(): Coins {
    return this.#coinsQuantity;
  }

  getBalance() {
    return Object.entries(this.#coinsQuantity).reduce(
      (previous, [key, value]) => previous + COINS_UNIT_TABLE[key] * value,
      0
    );
  }

  chargeMoney(money: number): void {
    this.#validateMoney(money);
    this.#addCoins(this.#generateRandomCoins(money));
  }

  #addCoins(coins: Coins): void {
    const coinsQuantity = { ...this.#coinsQuantity };

    Object.entries(coins).forEach(([key, value]) => {
      coinsQuantity[key] += value;
    });

    this.#coinsQuantity = coinsQuantity;
  }

  #validateMoney(money: number) {
    if (money + this.getBalance() > COIN_VAULT_CONDITION.MAX_BALANCE) {
      throw new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT);
    }
    if (money % COIN_CONDITION.UNIT_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_COIN_UNIT);
    }
  }

  #generateRandomCoins(money: number): Coins {
    let balance = money;
    const generatedCoins = { ...COINS_INIT_QUANTITY };

    Object.entries(COINS_UNIT_TABLE).forEach(([key, price]) => {
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

  returnCoins(userMoney: number): [Coins, number] {
    const returnedCoins = { ...COINS_INIT_QUANTITY };
    let remainder = userMoney % CHEAPEST_PAPER_MONEY_UNIT;

    Object.entries(this.#coinsQuantity).forEach(([key, quantity]) => {
      const coinUnit = COINS_UNIT_TABLE[key];

      if (remainder === 0 || remainder < coinUnit) return;

      const maxAvailableCoinQuantity = Math.min(quantity, remainder / coinUnit);

      returnedCoins[key] = maxAvailableCoinQuantity;
      remainder -= maxAvailableCoinQuantity * coinUnit;
    });

    return [returnedCoins, remainder];
  }
}
