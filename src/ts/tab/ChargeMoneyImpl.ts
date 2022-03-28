import { $ } from '../util/dom';
import { ChargeMoney } from './declaration';
import { Coin } from '../resource/declaration';
import { INPUT_MONEY_RULES } from '../constants/index';

class ChargeMoneyImpl implements ChargeMoney {
  private coins: Array<Coin>;

  constructor(coins: Array<Coin>) {
    this.coins = coins;
    window.addEventListener('load', () => {
      $('#charge-money-form').addEventListener(
        'submit',
        this.handleChargeMoney.bind(this),
      );
    });
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
    this.coins.forEach((coin, index) => (coin.count += coinList[index]));
  }

  isValidMoney(inputMoney: number) {
    if (
      inputMoney < INPUT_MONEY_RULES.MIN ||
      inputMoney % INPUT_MONEY_RULES.MOD_UNIT !== 0
    ) {
      alert(
        `투입금액은 ${INPUT_MONEY_RULES.MOD_UNIT}으로 나누어 떨어져야하며, 최소 ${INPUT_MONEY_RULES.MIN} 값 이상만 가능합니다.`,
      );
      return false;
    }
    if (this.totalAmount() + inputMoney > INPUT_MONEY_RULES.MAX) {
      alert(
        `투입금액과 자판기 보유금액의 합이 ${INPUT_MONEY_RULES.MAX}를 초과할 수 없습니다.`,
      );
      return false;
    }
    return true;
  }

  totalAmount() {
    return this.coins.reduce(
      (acc, { amount, count }) => acc + amount * count,
      0,
    );
  }

  generateRandomCoins(inputMoney: number) {
    const coins: Array<number> = this.coins.map(({ amount }) => amount);
    const coinList = [0, 0, 0, 0];

    while (inputMoney > 0) {
      const pickLength = coins.filter(coin => inputMoney >= coin);
      const coinIndex = Math.floor(Math.random() * pickLength.length);

      coinList[coinIndex] += 1;
      inputMoney -= coins[coinIndex];
    }

    return coinList;
  }

  drawCoins() {
    this.coins.forEach(({ amount, count }) => {
      $(`#coin-${amount}-count`).innerText = `${count}개`;
    });
  }
}

export default ChargeMoneyImpl;
