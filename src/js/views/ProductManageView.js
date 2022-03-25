import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

const tableTemplate = (product) => {
  return `
    <tr>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td><button class="modify-button" type="button">수정</button> <button class="delete-button" type="button">삭제</button></td>
    </tr>
  `;
};

const tableInputTemplate = (product) => {
  return `
    <td><input type="text" class="modify-input" placeholder="상품명" maxlength="10" value=${product.name} required /></td>
    <td><input type="number" class="modify-input" placeholder="가격" min="100" max="10000" value=${product.price} required /></td>
    <td><input type="number" class="modify-input" placeholder="수량" min="1" max="20" value=${product.quantity} required /></td>
    <td><button id="confirm-button" type="button">확인</button></td>
  `;
};

export default class ProductManageView {
  constructor() {
    this.$sectionContainer = $('#section-container');

    on(this.$sectionContainer, 'submit', this.#getProductInformation.bind(this));
  }

  initManageView() {
    this.$productNameInput = $('#product-name-input');
    this.$productPriceInput = $('#product-price-input');
    this.$productQuantityInput = $('#product-quantity-input');
    this.$productTbody = $('#product-tbody');

    this.$productTbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('modify-button')) {
        this.#replaceProductInformation(e.target.closest('tr'));
      }
    });
  }

  #getProductInformation(e) {
    e.preventDefault();
    if (e.target.id !== 'product-add-form') return;
    const keyword = {
      name: this.$productNameInput.value,
      price: this.$productPriceInput.valueAsNumber,
      quantity: this.$productQuantityInput.valueAsNumber,
    };
    emit(this.$sectionContainer, '@submit', { keyword });
  }

  #replaceProductInformation(selectedProductElement) {
    const product = {
      name: selectedProductElement.children[0].textContent,
      price: selectedProductElement.children[1].textContent,
      quantity: selectedProductElement.children[2].textContent,
    };
    selectedProductElement.innerHTML = tableInputTemplate(product);
  }

  // renderTable(product) {
  //   this.$productTbody.insertAdjacentHTML('beforeend', tableTemplate(product));
  //   $('#product-tbody').insertAdjacentHTML('beforeend', tableInputTemplate(product));
  // }

  render(productList) {
    if (Array.isArray(productList)) {
      productList.forEach((product) => {
        this.$productTbody.insertAdjacentHTML('beforeend', tableTemplate(product));
      });
      return;
    }
    this.$productTbody.insertAdjacentHTML('beforeend', tableTemplate(productList));
  }

  resetProductInput() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';
  }
}
