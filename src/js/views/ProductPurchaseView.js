import { SECTION_CONTAINER } from '../constants/constants.js';
import { $, replaceElement } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

const purchaseTemplate = ({ name, price, quantity }) => {
  return `
    <tr>
      <td>${name}</td>
      <td>${price}</td>
      <td class="product-quantity">${quantity}</td>
      <td>
        <button class="purchase-button" type="button" data-name=${name} data-price=${price} data-quantity=${quantity}>구매</button>
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
    this.$fiveHundredCoin = $('.returned-five-hundred-coin');
    this.$oneHundredCoin = $('.returned-one-hundred-coin');
    this.$fiftyCoin = $('.returned-fifty-coin');
    this.$tenCoin = $('.returned-ten-coin');

    this.$purchaseTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('purchase-button')) {
        this.#onClickPurchaseButton(e);
      }
    });
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

  #onClickPurchaseButton(e) {
    const product = {
      name: e.target.dataset.name,
      price: e.target.dataset.price,
      quantity: e.target.dataset.quantity - 1,
    };
    replaceElement(e.target.closest('tr'), purchaseTemplate(product));
  }
}
