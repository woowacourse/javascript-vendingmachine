import {
  COIN_VAULT_CONDITION,
  COIN_CONDITION,
  COINS_UNIT_TABLE,
  COINS_INIT_QUANTITY,
  CHEAPEST_COIN,
  ERROR_MESSAGE,
} from '../utils/constants';
import { Coins } from '../utils/interface';
import { getRandomNumZeroToMax } from '../utils/utils';
import { validator } from '../utils/validator';

interface CoinVaultInterface {
  getCoins(): Coins;
  setCoins(coins: Coins);
  getBalance();
  chargeMoney(money: number);
  returnCoins(purchaseMoney: number): [Coins, number];
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
    if (this.#isValidatedMoney(money)) {
      this.#addCoins(this.generateRandomCoins(money));
    }
  }

  #addCoins(coins: Coins): void {
    const coinsQuantity = { ...this.#coins };

    Object.entries(coins).forEach(([key, value]) => {
      coinsQuantity[key] += value;
    });

    this.setCoins(coinsQuantity);
  }

  #isValidatedMoney(money: number): boolean {
    validator([
      {
        checker: () => money + this.getBalance() > COIN_VAULT_CONDITION.MAX_BALANCE,
        errorMessage: ERROR_MESSAGE.OVER_BALANCE_LIMIT,
      },
      {
        checker: () => money % COIN_CONDITION.UNIT_PRICE !== 0,
        errorMessage: ERROR_MESSAGE.NOT_DIVIDED_BY_COIN_UNIT,
      },
    ]);

    return true;
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

  returnCoins(purchaseMoney: number): [Coins, number] {
    if (this.#isValidatedReturnCoins(purchaseMoney)) {
      const returnedCoins = { ...COINS_INIT_QUANTITY };
      let remainder = purchaseMoney;

      Object.entries(this.#coins).forEach(([key, quantity]) => {
        const coinUnit = COINS_UNIT_TABLE[key];

        if (remainder === 0 || remainder < coinUnit) return;

        const maxAvailableCoinQuantity = Math.min(quantity, Math.floor(remainder / coinUnit));

        returnedCoins[key] = maxAvailableCoinQuantity;
        remainder -= maxAvailableCoinQuantity * coinUnit;
      });

      this.#substractCoins(returnedCoins);

      return [returnedCoins, remainder];
    }
  }

  #isValidatedReturnCoins(purchaseMoney: number) {
    validator([
      {
        checker: () => purchaseMoney === 0,
        errorMessage: ERROR_MESSAGE.NO_PURCHASE_MONEY,
      },
      {
        checker: () => this.getBalance() === 0,
        errorMessage: ERROR_MESSAGE.NO_COINS,
      },
    ]);

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
