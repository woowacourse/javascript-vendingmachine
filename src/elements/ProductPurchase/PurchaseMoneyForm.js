import { $ } from '../../utils/dom';
import CustomElement from '../../abstracts/CustomElement';
import { checkPurchaseMoneyValidation } from '../../validators';
import CoinStoreInstance from '../../domains/stores/CoinStore';
import { COIN_ACTION } from '../../domains/actions';
import { SUCCESS } from '../../constants';
import showSnackbar from '../../utils/showSnackbar';

class PurchaseMoneyForm extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStoreInstance.subscribe(this);
  }

  template() {
    return `
      <form class="purchase-money-form">
        <label class="purchase-money-label" for="purchase-money-input">상품을 구매할 금액을 투입해주세요.</label>
        <input type="number" id="purchase-money-input" placeholder="금액" required>
        <button class="purchase-money-button button">투입</button>
      </form>
      <p>투입한 금액: <span class="purchase-money">0</span>원</p>
    `;
  }

  setEvent() {
    $('.purchase-money-form').addEventListener('submit', this.handlePurchaseMoneyButtonSubmit);
  }

  initPurchaseMoneyInput($purchaseMoneyInput) {
    $purchaseMoneyInput.value = '';

    $purchaseMoneyInput.focus();
  }

  handlePurchaseMoneyButtonSubmit = (event) => {
    event.preventDefault();

    const $purchaseMoneyInput = $('#purchase-money-input');
    const purchaseMoneyInputValue = $purchaseMoneyInput.valueAsNumber;

    try {
      checkPurchaseMoneyValidation(purchaseMoneyInputValue);
    } catch (error) {
      showSnackbar(error.message);
      return;
    }
    showSnackbar(SUCCESS.PURCHASE_MONEY_INPUT);
    this.initPurchaseMoneyInput($purchaseMoneyInput);
    CoinStoreInstance.dispatchAction(COIN_ACTION.PURCHASE_MONEY_INPUT, purchaseMoneyInputValue);
  };

  rerender(newCoinsCount) {
    $('.purchase-money').textContent = newCoinsCount.money_input;
  }
}

customElements.define('purchase-money-form', PurchaseMoneyForm);

export default PurchaseMoneyForm;
