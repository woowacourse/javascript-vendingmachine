import {
  COIN_VAULT_CONDITION,
  COIN_CONDITION,
  COINS_PRICE_TABLE,
  COINS_INIT_QUANTITY,
  CHEAPEST_COIN,
} from '../constants/domain';
import { Coins } from '../interfaces/interface';
import { getRandomNumZeroToMax } from '../utils/domain.utils';
import { ERR_COIN_VAULT } from '../constants/errorMessage';

export class CoinVault {
  private coinsQuantity: Coins;
  private customerInput: number;

  constructor() {
    this.coinsQuantity = { ...COINS_INIT_QUANTITY };
    this.customerInput = 0;
  }

  addCoins(coins: Coins) {
    Object.entries(coins).forEach(([key, value]) => {
      this.coinsQuantity[key] += value;
    });
  }

  getCoins(): Coins {
    return this.coinsQuantity;
  }

  getBalance() {
    return Object.entries(this.coinsQuantity).reduce(
      (previous, [key, value]) => previous + COINS_PRICE_TABLE[key] * value,
      0
    );
  }

  chargeChanges(money: number) {
    try {
      this.validateMoney(money);
      this.addCoins(this.generateRandomCoins(money));
    } catch (err) {
      throw err;
    }
  }

  validateMoney(money: number): boolean {
    if (money + this.getBalance() > COIN_VAULT_CONDITION.MAX_BALANCE) {
      throw new Error(ERR_COIN_VAULT.EXCEED_MAX_BALANCE);
    }
    if (money % COIN_CONDITION.UNIT_PRICE !== 0) {
      throw new Error(ERR_COIN_VAULT.SMALL_INPUT_THAN_UNIT);
    }
    return;
  }

  generateRandomCoins(money: number): Coins {
    let balance = money;
    const generatedCoins = { ...COINS_INIT_QUANTITY };

    Object.entries(COINS_PRICE_TABLE).forEach(([key, price]) => {
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

  chargeCustomerInput(money: number) {
    try {
      this.validateMoney(money);
      this.customerInput += money;
    } catch (err) {
      throw err;
    }
  }

  deductCustomerInput(money: number) {
    try {
      this.validateMoney(money);
      this.customerInput -= money;
    } catch (err) {
      throw err;
    }
  }

  getCustomerInput() {
    return this.customerInput;
  }

  giveChanges(): Coins {
    const result: Coins = { coin500: 0, coin100: 0, coin50: 0, coin10: 0 };

    Object.entries(this.coinsQuantity).forEach(([key, possessedQuantity]) => {
      let needQuantity = Math.floor(this.customerInput / COINS_PRICE_TABLE[key]);
      if (needQuantity > possessedQuantity) {
        result[key] = possessedQuantity;
        this.coinsQuantity[key] -= possessedQuantity;
        this.customerInput -= possessedQuantity * COINS_PRICE_TABLE[key];
        return;
      }
      result[key] = needQuantity;
      this.coinsQuantity[key] -= possessedQuantity;
      this.customerInput -= needQuantity * COINS_PRICE_TABLE[key];
    });
    return result;
  }
}
