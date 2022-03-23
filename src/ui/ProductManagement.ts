import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit } from '../utils';

class ProductManagement extends CustomElement {
  template() {
    return TEMPLATE.PRODUCT_MANAGEMENT;
  }

  setEvent() {
    addEvent(this, 'submit', '.product-manage-form', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.valueAsNumber;
    const quantity = e.target.quantity.valueAsNumber;

    emit('.product-manage-form', '@add', { name, price, quantity }, this);
  }
}

customElements.define('product-management', ProductManagement);

export default ProductManagement;
