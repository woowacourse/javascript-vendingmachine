import ProductStoreInstance from '../../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';
import { checkProductAddValidation } from '../../validators';

class ProductAddForm extends CustomElement {
  template() {
    return `
      <form class="product-add-form">
        <label>추가할 상품 정보를 입력해주세요.</label>
        <div class="product-input-container">
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

    const $productNameInput = $('.product-name-input');
    const $productPriceInput = $('.product-price-input');
    const $productQuantityInput = $('.product-quantity-input');

    const newProduct = {
      name: $productNameInput.value.trim(),
      price: $productPriceInput.valueAsNumber,
      quantity: $productQuantityInput.valueAsNumber,
    };

    try {
      checkProductAddValidation(newProduct);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.initProductInputs($productNameInput, $productPriceInput, $productQuantityInput);
    ProductStoreInstance.dispatch(createAction(PRODUCT_ACTION.ADD, newProduct));
  };

  initProductInputs($productNameInput, $productPriceInput, $productQuantityInput) {
    $productNameInput.value = '';
    $productPriceInput.value = '';
    $productQuantityInput.value = '';

    $productNameInput.focus();
  }
}

customElements.define('product-add-form', ProductAddForm);

export default ProductAddForm;
