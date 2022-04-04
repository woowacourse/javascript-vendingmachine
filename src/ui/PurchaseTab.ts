import CustomElement from './CustomElement';
import VendingMachine from '../domain/VendingMachine';
import { ELEMENT_KEY } from '../constants';
import TEMPLATE from '../templates';
import storage from '../storage';
import { Product } from '../domain/Product';
import { addEvent, emit, markUnit } from '../utils';
import { $ } from '../utils';
import { COINS } from '../constants';

class PurchaseTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe(ELEMENT_KEY.PURCHASE, this);
  }

  render() {
    this.innerHTML = this.template();

    const userInputMoney: number = storage.getUserMoney();
    const products: Product[] = storage.getProducts();

    $('.purchase-form__money-input-amount', this).textContent = markUnit(userInputMoney);
    products.forEach((product) => this.insertItem(product));
  }

  template() {
    return TEMPLATE.PURCHASE_TAB;
  }

  setEvent() {
    addEvent(this, 'submit', '.purchase-form', (e) => this.handleMoneyInput(e));
    addEvent(this, 'click', '.product-item', (e) => this.handlePurchaseProduct(e));
    addEvent(this, 'click', '.purchase-return-button', (e) => this.handleChangeReturn(e));
  }

  handleMoneyInput(e) {
    e.preventDefault();

    const moneyInput = e.target.moneyInput.valueAsNumber;

    emit('.purchase-form', '@input', moneyInput, this);
  }

  handlePurchaseProduct(e) {
    if (e.target.classList.contains('product-item__purchase-button')) {
      const productName = e.target.closest('.product-item').dataset.productName;

      emit('#purchase-product-list-table', '@purchase', productName, this);
    }
  }

  handleChangeReturn(e) {
    emit('.purchase-return-button', '@return', {}, this);
  }

  notify({ action, data }) {
    switch (action) {
      case 'input':
        this.updateUserInputMoney(data);
        break;
      case 'purchase':
        this.purchaseItem(data);
        break;
      case 'return':
        this.updatePurchasePage(data);
        break;
    }
  }

  insertItem(product: Product) {
    $('tbody', this).insertAdjacentHTML(
      'beforeend',
      `<tr class="product-item" data-product-name="${product.name}" data-product-id="${product.id}">
          <td>${product.name}</td>
          <td>${markUnit(product.price)}</td>
          <td>${product.quantity}</td>
          <td class="product-item__button">
            <button type="button" class="product-item__purchase-button button">구매</button>
          </td>
       </tr>
      `,
    );
  }

  updateUserInputMoney(money) {
    $('.purchase-form__money-input-amount', this).textContent = markUnit(money);
  }

  purchaseItem({ id, quantity, userMoney }) {
    const product = $(`[data-product-id="${id}"]`, this);
    const targetProductQuantity = product.children[2];

    $('.purchase-form__money-input-amount', this).textContent = markUnit(userMoney);

    targetProductQuantity.textContent = quantity;

    if (Number(targetProductQuantity.textContent) === 0) {
      product.remove();
    }
  }

  updatePurchasePage({ userMoney, change }) {
    $('.purchase-form__money-input-amount', this).textContent = markUnit(userMoney);

    COINS.forEach((coin) => ($(`.purchase-coin-${coin}-quantity`).textContent = String(change[coin])));
  }
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
