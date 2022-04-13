import CoinStore from '../../domains/stores/CoinStore';
import { createAction, MONEY_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $, floatSnackbar } from '../../utils';
import { checkCustomerMoneyValidation } from '../../validators';
import { COMPLETE_MESSAGE } from '../../constants';

class MoneyInputForm extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStore.instance.subscribeCustomer(this);
  }

  template() {
    return `
      <form class="money-input-form">
        <label for="customer-money-input">상품을 구매할 금액을 투입해주세요.</label>
        <input type="number" id="customer-money-input" placeholder="금액" step="10" required>
        <button class="money-input-button">투입</button>
      </form>
      <p>투입한 금액: <span class="customer-money">0</span>원</p>
    `;
  }

  setEvent() {
    $('.money-input-form').addEventListener('submit', this.handleMoneyInputFormSubmit);
  }

  handleMoneyInputFormSubmit = (event) => {
    event.preventDefault();

    const $customerMoneyInput = $('#customer-money-input');
    const customerMoneyInputValue = $customerMoneyInput.valueAsNumber;
    const $snackbar = $('#snackbar');

    try {
      this.inputMoney(customerMoneyInputValue);
      this.initCustomerMoneyInput($customerMoneyInput);
      $snackbar.textContent = COMPLETE_MESSAGE.MONEY_INPUT;
    } catch (error) {
      $snackbar.textContent = error.message;
    }

    floatSnackbar($snackbar);
  };

  inputMoney(customerMoneyInputValue) {
    checkCustomerMoneyValidation(customerMoneyInputValue);

    CoinStore.instance.dispatch(createAction(MONEY_ACTION.INPUT, customerMoneyInputValue));
  }

  initCustomerMoneyInput($customerMoneyInput) {
    $customerMoneyInput.value = '';
    $customerMoneyInput.focus();
  }

  rerender({ money }) {
    $('.customer-money').textContent = money;
  }
}

customElements.define('money-input-form', MoneyInputForm);

export default MoneyInputForm;
