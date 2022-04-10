import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import { CHARGE_AMOUNT } from '../../configs/constants';

class ChangeChargeForm extends Component {
  template() {
    return `
      <form id="change-charge-form" class="change-charge-form">
        <div>
          <label for="amount" class="description">자판기가 보유할 금액을 입력해주세요.</label>
          <input
            id="charge-amount"
            class="charge-amount-input styled-input"
            name="amount"
            placeholder="금액"
            type="number"
            min="${CHARGE_AMOUNT.MIN}"
            max="${CHARGE_AMOUNT.MAX}"
            step="${CHARGE_AMOUNT.STEP}"
            required
            autofocus
          >
        </div>
        <button id="add-charge-button" class="add-charge-button styled-button emphasized">충전</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#change-charge-form', (event) => {
      event.preventDefault();

      const amountInput = this.querySelector('#charge-amount');
      const amount = amountInput.valueAsNumber;

      try {
        vendingMachine.addCoin(amount);

        amountInput.value = '';
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('charge-form', ChangeChargeForm);
