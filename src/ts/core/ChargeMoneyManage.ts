import { $ } from '../utils/dom';
import { ChargeMoney } from '../declarations/coreDeclaration';
import { Coin } from '../declarations/resourceDeclaration';
import { renderCoins } from '../views/render';
import { generateRandomCoins } from '../utils/productUtil';
import VerifyValueValidation from '../validations/verifyValueValidation';

class ChargeMoneyManage implements ChargeMoney {
  private coins: Array<Coin>;
  verifyValue: VerifyValueValidation;

  constructor(coins: Array<Coin>, verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    this.coins = coins;
    window.addEventListener('load', () => {
      $('#tab__charge-button').addEventListener('click', renderCoins.bind(this));
      $('#charge-money-form').addEventListener('submit', this.handleChargeMoney.bind(this));
    });
  }

  handleChargeMoney(e) {
    e.preventDefault();
    const inputMoney = Number($('#charge-money-input').value);

    if (this.verifyValue.verifyChargeMoney(inputMoney)) {
      const coinList = generateRandomCoins.call(this, inputMoney);
      this.chargeMoney(coinList);
      renderCoins.call(this);
    }
  }

  chargeMoney(coinList: Array<number>) {
    this.coins.forEach((coin, index) => (coin.count += coinList[index]));
  }
}

export default ChargeMoneyManage;
