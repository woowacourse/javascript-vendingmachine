import { SECTION_CONTAINER } from '../constants/constants';
import { $ } from '../utils/dom';
import { on, emit } from '../utils/event';
import { purchaseTableTemplate } from '../templates/templates';

export default class ProductPurchaseView {
  constructor() {
    on(SECTION_CONTAINER, [['submit', this.#onSubmitInputAmount]]);
    this.#bindPurchaseAndReturnEvent();
  }

  #bindPurchaseAndReturnEvent() {
    SECTION_CONTAINER.addEventListener('click', (e) => {
      const { target } = e;
      if (target.classList.contains('purchase-button')) {
        this.#purchase(target.closest('tr'));
      }
      if (target.id === 'return-button') {
        emit(SECTION_CONTAINER, '@return');
      }
    });
  }

  #onSubmitInputAmount = (e) => {
    e.preventDefault();
    if (e.target.id !== 'purchase-form') return;

    const userAmount = this.$amountInput.valueAsNumber;
    emit(SECTION_CONTAINER, '@amount', { userAmount });
  };

  #purchase(selectedProduct) {
    const index = selectedProduct.rowIndex - 1;
    emit(SECTION_CONTAINER, '@purchase', { index });
  }

  renderModifiedProductInfo(index) {
    const selectedProduct = this.$purchaseTbody.children[index];
    const quantity = selectedProduct.children[2].textContent;
    selectedProduct.children[2].textContent = Number(quantity) - 1;
    if (quantity === '1') this.$purchaseTbody.removeChild(selectedProduct);
  }

  initPurchaseDOM() {
    this.$amountInput = $('#amount-input');
    this.$currentAmount = $('#current-amount');
    this.$purchaseTbody = $('#purchase-tbody');
    this.$fiveHundredCoinRemain = $('#five-hundred-coin-remain');
    this.$oneHundredCoinRemain = $('#one-hundred-coin-remain');
    this.$fiftyCoinRemain = $('#fifty-coin-remain');
    this.$tenCoinRemain = $('#ten-coin-remain');
  }

  renderAmount(userAmount) {
    this.$currentAmount.textContent = `투입한 금액: ${userAmount}원`;
  }

  render(productList) {
    if (Array.isArray(productList)) {
      let template = '';
      productList.forEach((product) => {
        template += purchaseTableTemplate(product);
      });
      this.$purchaseTbody.insertAdjacentHTML('beforeend', template);
      return;
    }
    this.$purchaseTbody.insertAdjacentHTML('beforeend', purchaseTableTemplate(productList));
  }

  resetAmountInput() {
    this.$amountInput.value = '';
  }

  renderHaveCoins(coins) {
    this.$fiveHundredCoinRemain.textContent = `${coins[500]}개`;
    this.$oneHundredCoinRemain.textContent = `${coins[100]}개`;
    this.$fiftyCoinRemain.textContent = `${coins[50]}개`;
    this.$tenCoinRemain.textContent = `${coins[10]}개`;
  }
}
