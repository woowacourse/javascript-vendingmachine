import { COIN_TYPE } from '../constants';
import { getRandomNumber } from '../utils';
import { IPageManager, TCoins } from '../interface';
import VendingMachineCharge from '../state/VendingMachineCharge';

interface IVendingMachineChargeManagementState {
  coins: TCoins;
}

class VendingMachineChargeManagementPageManager implements IPageManager {
  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: Partial<IVendingMachineChargeManagementState>) {
    const changeStates: Array<string> = Object.keys(newState);

    const state = { ...this.getState(), ...newState };
    if (changeStates.includes('coins')) VendingMachineCharge.setCoins(newState.coins);

    this.subscribers.forEach(renderMethod => renderMethod({ state, changeStates }));
  }

  getState(): IVendingMachineChargeManagementState {
    return {
      coins: VendingMachineCharge.coins,
    };
  }

  getTotalAmount(): number {
    return VendingMachineCharge.getTotalAmount();
  }

  getMaxCoinIndex(baseAmount: number) {
    return COIN_TYPE.findIndex(coin => baseAmount >= coin);
  }

  getRandomCoinsFromAmount(amount: number): TCoins {
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
    const coinsToAdd: TCoins = this.getRandomCoinsFromAmount(amount);
    const totalCoins: TCoins = VendingMachineCharge.coins.map(
      (value, index) => value + coinsToAdd[index],
    );

    this.setState({
      coins: totalCoins,
    });
  }

  subtractCoins(coinsToBeReturned: TCoins) {
    const subtractedCoins: TCoins = VendingMachineCharge.coins.map((coin, index) => coin - coinsToBeReturned[index]);
    this.setState({
      coins: subtractedCoins,
    });
  }
}

export default new VendingMachineChargeManagementPageManager();
