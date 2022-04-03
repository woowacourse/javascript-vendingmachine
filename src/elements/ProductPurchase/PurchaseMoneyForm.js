import { $ } from '../../utils/dom';
import CustomElement from '../../abstracts/CustomElement';
import { checkPurchaseMoneyValidation } from '../../validators';

class PurchaseMoneyForm extends CustomElement {
  template() {
    return `
      <form class="purchase-money-form">
        <label class="purchase-money-label" for="purchase-money-input">상품을 구매할 금액을 투입해주세요.</label>
        <input type="number" id="purchase-money-input" placeholder="금액" required>
        <button class="purchase-money-button button">투입</button>
      </form>
    `;
  }

  setEvent() {
    $('.purchase-money-form').addEventListener('submit', this.handlePurchaseMoneyButtonSubmit);
  }

  handlePurchaseMoneyButtonSubmit = (event) => {
    event.preventDefault();

    // 입력된다. (유효성 검사)
    const $purchaseMoneyInput = $('#purchase-money-input');
    const purchaseMoneyInputValue = $purchaseMoneyInput.valueAsNumber;

    try {
      checkPurchaseMoneyValidation(purchaseMoneyInputValue);
    } catch (error) {
      alert(error.message);
    }
    // 투입 금액을 추가한다.
  };
}

customElements.define('purchase-money-form', PurchaseMoneyForm);

export default PurchaseMoneyForm;
