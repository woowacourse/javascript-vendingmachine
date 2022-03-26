import CoinStore from '../domains/stores/CoinStore';
import { createAction, COIN_ACTION } from '../domains/actions';

import CustomElement from '../abstracts/CustomElement';
import { $ } from '../utils/dom';
import { checkCoinValidation } from '../validators';

class CoinChargeForm extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStore.instance.subscribeMoney(this);
  }

  template() {
    return `
      <form class="coin-charge-form">
        <label for="coin-input">자판기가 보유할 금액을 입력해주세요.</label>
        <input type="number" id="coin-input" placeholder="금액">
        <button class="coin-charge-button">충전</button>
      </form>
      <p>현재 보유 금액: <span class="money">0</span>원</p>
    `;
  }

  setEvent() {
    $('.coin-charge-form').addEventListener('submit', this.handleCoinChargeFormSubmit);
  }

  handleCoinChargeFormSubmit = (event) => {
    event.preventDefault();

    const coinInputValue = $('#coin-input').valueAsNumber;

    try {
      this.chargeCoin(coinInputValue);
    } catch (error) {
      alert(error.message);
    }
  };

  chargeCoin(coinInputValue) {
    checkCoinValidation(coinInputValue);

    CoinStore.instance.dispatch(createAction(COIN_ACTION.MONEY_CHARGE, coinInputValue));
    CoinStore.instance.dispatch(createAction(COIN_ACTION.COIN_ADD, coinInputValue));
  }

  rerender(newMoney) {
    $('.money').textContent = newMoney;
  }
}

customElements.define('coin-charge-form', CoinChargeForm);

export default CoinChargeForm;
