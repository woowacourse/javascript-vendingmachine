import ProductStoreInstance from '../../domains/stores/ProductStore';
import { PRODUCT_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $, $$ } from '../../utils/dom';
import { checkDuplicateProductWhenModify, checkProductValidation } from '../../validators';
import { CONFIRM_MESSAGE, SNACKBAR } from '../../constants';

class ProductCurrentSituation extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ProductStoreInstance.subscribe(this);
  }

  template() {
    return `
      <h2>상품 현황</h2>
      <div class="product-current-situation-container">
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
      </div>
    `;
  }

  rerender({ type, detail }) {
    switch (type) {
      case PRODUCT_ACTION.ADD:
        $('tbody', $('.product-current-situation')).insertAdjacentHTML('beforeend', this.tableBodyRowTemplate(detail));
        this.setEventAfterRerender(detail.name);
        break;
      case PRODUCT_ACTION.MODIFY: {
        const { oldProductName, newProductInfo } = detail;
        const $tbodyRow = $(`[data-product-name="${oldProductName}"]`);

        $tbodyRow.dataset.productName = newProductInfo.name;

        $('.product-name-td', $tbodyRow).textContent = newProductInfo.name;
        $('.product-price-td', $tbodyRow).textContent = newProductInfo.price;
        $('.product-quantity-td', $tbodyRow).textContent = newProductInfo.quantity;
        $('.product-manage-buttons-td', $tbodyRow).replaceChildren();
        $('.product-manage-buttons-td', $tbodyRow).insertAdjacentHTML(
          'beforeend',
          `<button class="table__product-modify-button">수정</button>
            <button class="table__product-delete-button">삭제</button>`,
        );

        this.setEventAfterRerender(newProductInfo.name);
        break;
      }
      case PRODUCT_ACTION.DELETE: {
        $(`[data-product-name="${detail}"]`).remove();
        break;
      }
      case PRODUCT_ACTION.PURCHASE: {
        const $tbodyRow = $(`[data-product-name="${detail}"]`);
        this.updateProductQuantity($tbodyRow);
      }
    }
  }

  updateProductQuantity = ($tbodyRow) => {
    $('.product-quantity-td', $tbodyRow).textContent -= 1;
  };

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

  setEventAfterRerender(productName) {
    const $tbodyRow = $(`[data-product-name="${productName}"]`);

    $tbodyRow.scrollIntoView();

    $('.table__product-modify-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductModifyButtonClick($tbodyRow),
    );
    $('.table__product-delete-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductDeleteButtonClick(productName),
    );
  }

  handleProductModifyButtonClick = ($tbodyRow) => {
    this.makeProductInfoModifiable($tbodyRow);
    this.setEventForProductModify($tbodyRow);
  };

  makeProductInfoModifiable($tbodyRow) {
    const $productNameTd = $('.product-name-td', $tbodyRow);
    const oldProductName = $productNameTd.textContent;
    $productNameTd.replaceChildren();
    $productNameTd.insertAdjacentHTML(
      'beforeend',
      `<input class="product-name-input" placeholder="상품명" value="${oldProductName}" maxlength="10" required>`,
    );

    const $productPriceTd = $('.product-price-td', $tbodyRow);
    const oldProductPrice = $productPriceTd.textContent;
    $productPriceTd.replaceChildren();
    $productPriceTd.insertAdjacentHTML(
      'beforeend',
      `<input type="number" class="product-price-input" placeholder="가격" value="${oldProductPrice}" min="100" max="10000" required>`,
    );

    const $productQuantityTd = $('.product-quantity-td', $tbodyRow);
    const oldProductQuantity = $productQuantityTd.textContent;
    $productQuantityTd.replaceChildren();
    $productQuantityTd.insertAdjacentHTML(
      'beforeend',
      `<input type="number" class="product-quantity-input" placeholder="수량" value="${oldProductQuantity}" min="1" max="20" required>`,
    );

    const $productManageButtonsTd = $('.product-manage-buttons-td', $tbodyRow);
    $productManageButtonsTd.replaceChildren();
    $productManageButtonsTd.insertAdjacentHTML(
      'beforeend',
      `<button class="table__product-modify-confirm-button">확인</button>`,
    );
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

    if (oldProductName !== newProductInfo.name) {
      checkDuplicateProductWhenModify(newProductInfo);
    }

    checkProductValidation(newProductInfo);

    ProductStoreInstance.dispatchAction(PRODUCT_ACTION.MODIFY, { oldProductName, newProductInfo });
    this.showSnackbar(SNACKBAR.PRODUCT_MODIFY_SUCCESS);
  }

  handleProductDeleteButtonClick = (productName) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    ProductStoreInstance.dispatchAction(PRODUCT_ACTION.DELETE, productName);
    this.showSnackbar(SNACKBAR.PRODUCT_DELETE_SUCCESS);
  };
}

customElements.define('product-current-situation', ProductCurrentSituation);

export default ProductCurrentSituation;
