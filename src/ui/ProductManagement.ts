import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { $, addEvent, emit } from '../utils';
import VendingMachine from '../domain/VendingMachine';
import Product from '../domain/Product';

class ProductManagement extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe('product', this);
  }

  template() {
    return TEMPLATE.PRODUCT_MANAGEMENT;
  }

  setEvent() {
    addEvent(this, 'submit', '.product-manage-form', (e: any) => this.emitEvent(e));
  }

  emitEvent(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.valueAsNumber;
    const quantity = e.target.quantity.valueAsNumber;

    emit('.product-manage-form', '@add', { name, price, quantity }, this);
  }

  notify(_: never, products: Product[]) {
    $('tbody', this).insertAdjacentHTML(
      'beforeend',
      `<tr class="product-item">
          <td>${products[products.length - 1].name}</td>
          <td>${products[products.length - 1].price}</td>
          <td>${products[products.length - 1].quantity}</td>
          <td>
            <button type="button" class="product-item__edit-button button">수정</button>
            <button type="button" class="product-item__delete-button button">삭제</button>
          </td>
      </tr>`,
    );
  }
}

customElements.define('product-management', ProductManagement);

export default ProductManagement;
