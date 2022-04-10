import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import { CHARGE_AMOUNT } from '../../configs/constants';

class InsertMoneyForm extends Component {
  template() {
    return `
      <form id="insert-money-form" class="insert-money-form">
        <div>
          <label for="amount" class="description">상품을 구입할 금액을 투입해주세요.</label>
          <input
            id="insert-amount"
            class="insert-amount-input styled-input"
            name="amount"
            placeholder="금액"
            type="number"
            min="10"
            max="1000000"
            step="10"
            required
            autofocus
          >
        </div>
        <button id="insert-money-button" class="insert-money-button styled-button emphasized">투입</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#insert-money-form', (event) => {
      event.preventDefault();

      const amountInput = this.querySelector('#insert-amount');
      const amount = amountInput.valueAsNumber;

      try {
        vendingMachine.insertMoney(amount);

        amountInput.value = '';
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('insert-form', InsertMoneyForm);
