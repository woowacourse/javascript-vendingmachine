import {
  COIN_VAULT_CONDITION,
  COIN_CONDITION,
  COINS_UNIT_TABLE,
  COINS_INIT_QUANTITY,
  CHEAPEST_COIN,
  ERROR_MESSAGE,
} from '../utils/constants';
import { Coins } from '../utils/interface';
import { getRandomNumZeroToMax } from '../utils/domain.utils';

interface CoinVaultInterface {
  getCoins(): Coins;
  setCoins(coins: Coins);
  getBalance();
  chargeMoney(money: number);
  returnCoins(purhcaseMoney: number): [Coins, number];
}

export class CoinVault implements CoinVaultInterface {
  #coins: Coins;

  constructor() {
    this.#coins = JSON.parse(localStorage.getItem('coins')) ?? { ...COINS_INIT_QUANTITY };
  }

  getCoins(): Coins {
    return this.#coins;
  }

  setCoins(coins: Coins) {
    this.#coins = coins;

    localStorage.setItem('coins', JSON.stringify(this.#coins));
  }

  getBalance() {
    return Object.entries(this.#coins).reduce(
      (previous, [key, value]) => previous + COINS_UNIT_TABLE[key] * value,
      0
    );
  }

  chargeMoney(money: number): void {
    this.#validateMoney(money);
    this.#addCoins(this.generateRandomCoins(money));
  }

  #addCoins(coins: Coins): void {
    const coinsQuantity = { ...this.#coins };

    Object.entries(coins).forEach(([key, value]) => {
      coinsQuantity[key] += value;
    });

    this.setCoins(coinsQuantity);
    // this.#coins = coinsQuantity;
  }

  #validateMoney(money: number) {
    if (money + this.getBalance() > COIN_VAULT_CONDITION.MAX_BALANCE) {
      throw new Error(ERROR_MESSAGE.OVER_BALANCE_LIMIT);
    }
    if (money % COIN_CONDITION.UNIT_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_COIN_UNIT);
    }
  }

  generateRandomCoins(money: number): Coins {
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

  returnCoins(purhcaseMoney: number): [Coins, number] {
    if (this.#isValidatedReturnCoins(purhcaseMoney)) {
      const returnedCoins = { ...COINS_INIT_QUANTITY };
      let remainder = purhcaseMoney;

      Object.entries(this.#coins).forEach(([key, quantity]) => {
        const coinUnit = COINS_UNIT_TABLE[key];

        if (remainder === 0 || remainder < coinUnit) return;

        const maxAvailableCoinQuantity = Math.min(quantity, remainder / coinUnit);

        returnedCoins[key] = maxAvailableCoinQuantity;
        remainder -= maxAvailableCoinQuantity * coinUnit;
      });

      this.#substractCoins(returnedCoins);

      return [returnedCoins, remainder];
    }
  }

  #isValidatedReturnCoins(purhcaseMoney: number): true | Error {
    if (purhcaseMoney === 0) throw Error(ERROR_MESSAGE.NO_PURCHASE_MONEY);

    if (this.getBalance() === 0) throw Error(ERROR_MESSAGE.NO_COINS);

    return true;
  }

  #substractCoins(returnedCoins: Coins) {
    const currentCoins = { ...this.#coins };

    Object.entries(returnedCoins).forEach(([key, quantity]) => {
      currentCoins[key] -= quantity;
    });

    this.setCoins(currentCoins);
  }
}
