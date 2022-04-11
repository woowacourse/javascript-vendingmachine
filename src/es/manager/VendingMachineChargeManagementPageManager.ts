import { COIN_TYPE } from '../constants';
import { getRandomNumber } from '../utils';
import { PageManagerMethods, Coins } from '../interface';
import VendingMachineCharge from '../state/VendingMachineCharge';

interface VendingMachineChargeManagementState {
  coins: Coins;
}

class VendingMachineChargeManagementPageManager implements PageManagerMethods {
  private subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: Partial<VendingMachineChargeManagementState>) {
    const changeStates: Array<string> = Object.keys(newState);

    const state = { ...this.getState(), ...newState };
    if (changeStates.includes('coins')) VendingMachineCharge.setCoins(newState.coins);

    this.subscribers.forEach(renderMethod => renderMethod({ state, changeStates }));
  }

  getState(): VendingMachineChargeManagementState {
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

  getRandomCoinsFromAmount(amount: number): Coins {
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
    const coinsToAdd: Coins = this.getRandomCoinsFromAmount(amount);
    const totalCoins: Coins = VendingMachineCharge.coins.map(
      (value, index) => value + coinsToAdd[index],
    );

    this.setState({
      coins: totalCoins,
    });
  }

  subtractCoins(coinsToBeReturned: Coins) {
    const subtractedCoins: Coins = VendingMachineCharge.coins.map((coin, index) => coin - coinsToBeReturned[index]);
    this.setState({
      coins: subtractedCoins,
    });
  }
}

export default new VendingMachineChargeManagementPageManager();
