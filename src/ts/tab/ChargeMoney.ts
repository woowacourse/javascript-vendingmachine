import vendingMachineResource from "../resource/vendingMachineResource";
import { $ } from "../util/dom";
import { ChargeMoney } from './declaration';

class ChargeMoneyImpl implements ChargeMoney {
  addEvent() {
    $('#charge-money-form').addEventListener('submit', this.handleChargeMoney.bind(this));
  }

  handleChargeMoney(e) {
    e.preventDefault();

    const inputMoney = Number($('#charge-money-input').value);

    if (this.isValidMoney(inputMoney)) {
      const coinList = this.generateRandomCoins(inputMoney);
      this.chargeMoney(coinList);
      this.drawCoins();
    }
  }

  chargeMoney(coinList: Array<number>) {
    vendingMachineResource.coins.forEach((coin, index) => coin.count += coinList[index]);
  }

  isValidMoney(inputMoney: number) {
    if (inputMoney < 1000 || inputMoney % 10 !== 0) {
      return false;
    }
    const totalAmout = vendingMachineResource.coins.reduce(
      (acc, { amount, count }) => acc + amount * count, 0);
      
    if (totalAmout + inputMoney > 100000) {
      return false;
    }
    return true;
  }

  generateRandomCoins(inputMoney: number) {
    const coins = [10, 50, 100, 500];
    const coinList = [0, 0, 0, 0];

    while (inputMoney > 0) {
      const pickLength = coins.filter((coin) => inputMoney >= coin);
      const coinIndex = Math.floor(Math.random() * pickLength.length);

      coinList[coinIndex] += 1;
      inputMoney -= coins[coinIndex];
    }

    return coinList;
  }  

  drawCoins() {
    vendingMachineResource.coins.forEach(({ amount, count }) => {
      $(`#coin-${amount}-count`).innerText = `${count}개`;
    });
  }
}

export default ChargeMoneyImpl;
