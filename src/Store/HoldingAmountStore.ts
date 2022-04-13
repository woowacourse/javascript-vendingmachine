import { getRandomNumber } from 'Utils';
import { COIN_TYPE } from 'Constants';
import Store from './Abstract';

class HoldingAmountStore extends Store {
  protected state: IStoreUniqueState = {
    holdingCoins: [0, 0, 0, 0],
    returnCoins: [0, 0, 0, 0],
    chargedAmount: 0,
  };

  public getTotalAmount(): number {
    return this.state.holdingCoins.reduce(
      (previous, coin, index) => (previous += COIN_TYPE[index] * coin),
      0,
    );
  }

  private getMaxCoinIndex(baseAmount) {
    return COIN_TYPE.findIndex(coin => baseAmount >= coin);
  }

  private getRandomCoinsFromAmount(amount: number): Array<number> {
    let leftAmount: number = amount;
    const randomCoins = [0, 0, 0, 0];

    while (leftAmount > 0) {
      const coinIndex: number = getRandomNumber(
        this.getMaxCoinIndex(leftAmount),
        COIN_TYPE.length - 1,
      );
      const randomCoin: number = COIN_TYPE[coinIndex];

      randomCoins[coinIndex] += 1;
      leftAmount -= randomCoin;
    }
    return randomCoins;
  }

  public addHoldingAmount(amount: number): void {
    const coinsToAdd: Array<number> = this.getRandomCoinsFromAmount(amount);
    const totalCoins: Array<number> = this.state.holdingCoins.map(
      (value, index) => value + coinsToAdd[index],
    );

    this.setState({
      holdingCoins: totalCoins,
    });
  }

  public updateChargeAmount(updateType: 'charge' | 'subtract', amount: number): void {
    const chargedAmount =
      updateType === 'charge'
        ? this.state.chargedAmount + amount
        : this.state.chargedAmount - amount;

    this.setState({
      chargedAmount,
    });
  }

  private getReturnCoinQuantity(
    coinAmount: number,
    quantity: number,
    currentChange: number,
  ): number {
    const limit = Math.floor(currentChange / coinAmount);
    return limit < quantity ? limit : quantity;
  }

  public returnCoins(): void {
    const holdingCoins = [...this.state.holdingCoins];
    const returnCoins = Array(COIN_TYPE.length - 1).fill(0);

    const change = holdingCoins.reduce((previous, quantity, index) => {
      const returnQuantity = this.getReturnCoinQuantity(COIN_TYPE[index], quantity, previous);

      returnCoins[index] = returnQuantity;
      holdingCoins[index] -= returnQuantity;
      return previous - COIN_TYPE[index] * returnQuantity;
    }, this.state.chargedAmount);

    this.setState({
      holdingCoins,
      chargedAmount: change,
      returnCoins,
    });
  }

  public isNotEnoughMoney(requiredMoney: number) {
    const { chargedAmount } = this.state;
    return chargedAmount < requiredMoney;
  }
}

export default new HoldingAmountStore();
