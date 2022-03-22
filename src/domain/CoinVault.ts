interface Coins {
  coin500: number;
  coin100: number;
  coin50: number;
  coin10: number;
}

export class CoinVault {
  private coinsQuantity: Coins;
  private coinsPrice: Coins;

  constructor() {
    this.coinsQuantity = {
      coin500: 0,
      coin100: 0,
      coin50: 0,
      coin10: 0,
    };

    this.coinsPrice = {
      coin500: 500,
      coin100: 100,
      coin50: 50,
      coin10: 10,
    };
  }

  setCoin500(quantity: number) {}
  setCoin100(quantity: number) {}
  setCoin50(quantity: number) {}
  setCoin10(quantity: number) {}

  getCoins(): Coins {
    return this.coinsQuantity;
  }

  getBalance() {
    return [...Object.entries(this.coinsQuantity)].reduce(
      (previous, [key, value]) => previous + this.coinsPrice[key] * value,
      0
    );
  }

  chargeMoney(money: number) {
    try {
      this.validateMoney(money);
      this.generateRandomCoins(money);
    } catch (err) {
      throw err;
    }
  }

  validateMoney(money: number): boolean {
    if (money > 100000) {
      throw new Error('돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.');
    }
    if (money % 10 !== 0) {
      throw new Error('상평통보는 안 받습니다. 10원단위로 넣어주세요!');
    }
    return;
  }

  generateRandomCoins(money: number) {}
}
