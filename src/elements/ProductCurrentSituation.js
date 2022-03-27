import ProductStore from '../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../domains/actions';

import CustomElement from '../abstracts/CustomElement';
import { $, $$ } from '../utils/dom';
import { checkProductValidation } from '../validators';
import { CONFIRM_MESSAGE } from '../constants';

class ProductCurrentSituation extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ProductStore.instance.subscribe(this);
  }

  template() {
    return `
      <h2>상품 현황</h2>
      <table class="product-current-situation">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }

  // eslint-disable-next-line max-lines-per-function
  rerender(newProduct) {
    const { type, detail } = newProduct;

    switch (type) {
      case PRODUCT_ACTION.ADD:
        $('tbody', $('.product-current-situation')).insertAdjacentHTML('beforeend', this.tableBodyRowTemplate(detail));
        this.setEventAfterRerender(detail);
        break;
      case PRODUCT_ACTION.MODIFY: {
        const { oldProductName, newProductInfo } = detail;
        const $tbodyRow = $(`[data-product-name="${oldProductName}"]`);

        $tbodyRow.dataset.productName = newProductInfo.name;

        $('.product-name-td', $tbodyRow).textContent = newProductInfo.name;
        $('.product-price-td', $tbodyRow).textContent = newProductInfo.price;
        $('.product-quantity-td', $tbodyRow).textContent = newProductInfo.quantity;
        $('.product-manage-buttons-td', $tbodyRow).innerHTML = `
          <button class="table__product-modify-button">수정</button>
          <button class="table__product-delete-button">삭제</button>
        `;

        this.setEventAfterRerender(newProductInfo);
        break;
      }
      case PRODUCT_ACTION.DELETE:
        $(`[data-product-name="${detail}"]`).remove();
    }
  }

  tableBodyRowTemplate({ name, price, quantity }) {
    return ` 
      <tr data-product-name="${name}">
        <td class="product-name-td">${name}</td> 
        <td class="product-price-td">${price}</td>
        <td class="product-quantity-td">${quantity}</td>
        <td class="product-manage-buttons-td">
          <button class="table__product-modify-button">수정</button>
          <button class="table__product-delete-button">삭제</button>
        </td>
      </tr>
    `;
  }

  setEventAfterRerender({ name }) {
    const $tbodyRow = $(`[data-product-name="${name}"]`);

    $('.table__product-modify-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductModifyButtonClick($tbodyRow),
    );
    $('.table__product-delete-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductDeleteButtonClick(name),
    );
  }

  handleProductModifyButtonClick = ($tbodyRow) => {
    this.makeProductInfoModifiable($tbodyRow);
    this.setEventForProductModify($tbodyRow);
  };

  makeProductInfoModifiable($tbodyRow) {
    const $productNameTd = $('.product-name-td', $tbodyRow);
    $productNameTd.innerHTML = `<input class="product-name-input" placeholder="상품명" value="${$productNameTd.textContent}" maxlength="10" required>`;

    const $productPriceTd = $('.product-price-td', $tbodyRow);
    $productPriceTd.innerHTML = `<input type="number" class="product-price-input" placeholder="가격" value="${$productPriceTd.textContent}" min="100" max="10000" required>`;

    const $productQuantityTd = $('.product-quantity-td', $tbodyRow);
    $productQuantityTd.innerHTML = `<input type="number" class="product-quantity-input" placeholder="수량" value="${$productQuantityTd.textContent}" min="1" max="20" required>`;

    const $productManageButtonsTd = $('.product-manage-buttons-td', $tbodyRow);
    $productManageButtonsTd.innerHTML = `<button class="table__product-modify-confirm-button">확인</button>`;
  }

  setEventForProductModify($tbodyRow) {
    $$('input', $tbodyRow).forEach((input) =>
      input.addEventListener('keydown', (event) => this.handleProductModifyEnter(event, $tbodyRow)),
    );
    $('.table__product-modify-confirm-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductModifyConfirmButtonClick($tbodyRow),
    );
  }

  handleProductModifyEnter = (event, $tbodyRow) => {
    if (event.key !== 'Enter') return;

    try {
      this.modifyProduct($tbodyRow);
    } catch (error) {
      alert(error.message);
    }
  };

  handleProductModifyConfirmButtonClick = ($tbodyRow) => {
    try {
      this.modifyProduct($tbodyRow);
    } catch (error) {
      alert(error.message);
    }
  };

  modifyProduct($tbodyRow) {
    const oldProductName = $tbodyRow.dataset.productName;
    const newProductInfo = {
      name: $('.product-name-input', $tbodyRow).value,
      price: $('.product-price-input', $tbodyRow).valueAsNumber,
      quantity: $('.product-quantity-input', $tbodyRow).valueAsNumber,
    };

    checkProductValidation(newProductInfo);

    ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.MODIFY, { oldProductName, newProductInfo }));
  }

  handleProductDeleteButtonClick = (productName) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.DELETE, productName));
  };
}

customElements.define('product-current-situation', ProductCurrentSituation);

export default ProductCurrentSituation;
