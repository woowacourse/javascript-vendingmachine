import { SECTION_CONTAINER } from '../constants/constants.js';
import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

const purchaseTemplate = ({ name, price, quantity }) => {
  return `
    <tr>
      <td>${name}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td>
        <button class="purchase-button" type="button">구매</button>
      </td>
    </tr>
  `;
};

export default class ProductPurchaseView {
  constructor() {
    on(SECTION_CONTAINER, 'submit', this.#onSubmitPurchaseAmount.bind(this));
  }

  initPurchaseDom() {
    this.$productPurchaseInput = $('#product-purchase-input');
    this.$currentAmount = $('.current-amount');
    this.$purchaseTbody = $('#product-purchase-tbody');
    this.$fiveHundredCoin = $('#returned-five-hundred-coin');
    this.$oneHundredCoin = $('#returned-one-hundred-coin');
    this.$fiftyCoin = $('#returned-fifty-coin');
    this.$tenCoin = $('#returned-ten-coin');
  }

  renderTotalAmount(amount) {
    this.$currentAmount.textContent = `투입한 금액: ${amount}원`;
  }

  renderProducts(products) {
    products.forEach((product) => {
      this.$purchaseTbody.insertAdjacentHTML('beforeend', purchaseTemplate(product));
    });
  }

  renderReturnedCoin(coins) {
    this.$fiveHundredCoin.textContent = `${coins[500]}개`;
    this.$oneHundredCoin.textContent = `${coins[100]}개`;
    this.$fiftyCoin.textContent = `${coins[50]}개`;
    this.$tenCoin.textContent = `${coins[10]}개`;
  }

  resetAmountInput() {
    this.$productPurchaseInput.value = '';
  }

  #onSubmitPurchaseAmount(e) {
    e.preventDefault();
    if (e.target.id !== 'purchase-form') return;

    const inputAmount = this.$productPurchaseInput.valueAsNumber;
    emit(SECTION_CONTAINER, '@purchase', { inputAmount });
  }
}
