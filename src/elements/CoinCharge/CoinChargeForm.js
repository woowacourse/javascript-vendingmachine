import CoinStore from '../../domains/stores/CoinStore';
import { createAction, COIN_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';
import { checkMachineMoneyValidation } from '../../validators';

class CoinChargeForm extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStore.instance.subscribeMachine(this);
  }

  template() {
    return `
      <form class="coin-charge-form">
        <label for="machine-money-input">자판기가 보유할 금액을 입력해주세요.</label>
        <input type="number" id="machine-money-input" placeholder="금액" step="10" required>
        <button class="coin-charge-button">충전</button>
      </form>
      <p>현재 보유 금액: <span class="machine-money">0</span>원</p>
    `;
  }

  setEvent() {
    $('.coin-charge-form').addEventListener('submit', this.handleCoinChargeFormSubmit);
  }

  handleCoinChargeFormSubmit = (event) => {
    event.preventDefault();

    const $machineMoneyInput = $('#machine-money-input');
    const machineMoneyInputValue = $machineMoneyInput.valueAsNumber;

    try {
      this.chargeCoin(machineMoneyInputValue);
      this.initMachineMoneyInput($machineMoneyInput);
    } catch (error) {
      alert(error.message);
    }
  };

  chargeCoin(machineMoneyInputValue) {
    checkMachineMoneyValidation(machineMoneyInputValue);

    CoinStore.instance.dispatch(createAction(COIN_ACTION.CHARGE, machineMoneyInputValue));
  }

  initMachineMoneyInput($machineMoneyInput) {
    $machineMoneyInput.value = '';
    $machineMoneyInput.focus();
  }

  rerender({ money }) {
    $('.machine-money').textContent = money;
  }
}

customElements.define('coin-charge-form', CoinChargeForm);

export default CoinChargeForm;
