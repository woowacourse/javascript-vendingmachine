import ProductStore from '../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../domains/actions';
import CustomElement from '../abstracts/CustomElement';
import { $ } from '../utils/dom';

class ProductAddForm extends CustomElement {
  template() {
    return `
      <form class="product-add-form">
        <label>추가할 상품 정보를 입력해주세요.</label>
        <div>
          <input class="product-name-input" placeholder="상품명" maxlength="10" required>
          <input type="number" class="product-price-input" placeholder="가격" min="100" max="10000" required>
          <input type="number" class="product-quantity-input" placeholder="수량" min="1" max="20" required>
          <button class="product-add-button">추가</button>
        </div>
      </form>
    `;
  }

  setEvent() {
    $('product-add-form').addEventListener('submit', this.handleProductAddFormSubmit);
  }

  handleProductAddFormSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      name: $('.product-name-input').value,
      price: $('.product-price-input').value,
      quantity: $('.product-price-input').value,
    };

    ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.ADD, newProduct));
  };
}

customElements.define('product-add-form', ProductAddForm);

export default ProductAddForm;
