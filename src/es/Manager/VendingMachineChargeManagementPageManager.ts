import { COIN_TYPE } from '../constants';
import { getRandomNumber } from '../utils';
import { IPageManager } from './Interface';
import VendingMachineCharge from '../data/VendingMachineCharge';

interface IVendingMachineChargeStoreState {
  coins: Array<number>;
}

class VendingMachineChargeManagementPageManager implements IPageManager {
  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState) {
    const changeStates: Array<string> = Object.keys(newState);

    const state = { ...this.getState(), ...newState };
    if (changeStates.includes('coins')) VendingMachineCharge.setCoins(newState.coins);

    this.subscribers.forEach(renderMethod => renderMethod({ state, changeStates }));
  }

  getState(): IVendingMachineChargeStoreState {
    return {
      coins: VendingMachineCharge.coins,
    };
  }

  getTotalAmount(): number {
    return VendingMachineCharge.getTotalAmount();
  }

  getMaxCoinIndex(baseAmount) {
    return COIN_TYPE.findIndex(coin => baseAmount >= coin);
  }

  getRandomCoinsFromAmount(amount: number): Array<number> {
    let leftAmount: number = amount;
    const returnCoins = [0, 0, 0, 0];

    while (leftAmount > 0) {
      const coinIndex: number = getRandomNumber(
        this.getMaxCoinIndex(leftAmount),
        COIN_TYPE.length - 1,
      );
      const randomCoin: number = COIN_TYPE[coinIndex];

      returnCoins[coinIndex] += 1;
      leftAmount -= randomCoin;
    }
    return returnCoins;
  }

  addCharge(amount: number): void {
    const coinsToAdd: Array<number> = this.getRandomCoinsFromAmount(amount);
    const totalCoins: Array<number> = VendingMachineCharge.coins.map(
      (value, index) => value + coinsToAdd[index],
    );

    this.setState({
      coins: totalCoins,
    });
  }

  subtractCoins(coinsToBeReturned: Array<number>) {
    const subtractedCoins: Array<number> = VendingMachineCharge.coins.map((coin, index) => coin - coinsToBeReturned[index]);
    this.setState({
      coins: subtractedCoins,
    });
  }
}

export default new VendingMachineChargeManagementPageManager();
