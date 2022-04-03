import CustomElement from './CustomElement';
import VendingMachine from '../domain/VendingMachine';
import { ELEMENT_KEY } from '../constants';
import TEMPLATE from '../templates';
import storage from '../storage';
import { Product } from '../domain/Product';
import { addEvent, emit, markUnit } from '../utils';
import { $ } from '../utils';

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
  }

  handleMoneyInput(e) {
    e.preventDefault();

    const moneyInput = e.target.moneyInput.valueAsNumber;

    emit('.purchase-form', '@input', moneyInput, this);
  }

  notify({ action, data }) {
    switch (action) {
      case 'input':
        console.log(data);
        this.updateUserInputMoney(data);
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
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
