import ProductStore from '../../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $, $$ } from '../../utils';
import { checkDuplicateProductWhenModify, checkProductValidation } from '../../validators';
import { CONFIRM_MESSAGE } from '../../constants';

class ProductCurrentSituation extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ProductStore.instance.subscribe(this);
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

  // eslint-disable-next-line max-lines-per-function
  rerender({ type, detail }) {
    switch (type) {
      case PRODUCT_ACTION.ADD:
        $('tbody', $('.product-current-situation')).insertAdjacentHTML('beforeend', this.tableBodyRowTemplate(detail));
        this.setEventAfterProductAddRerender(detail);
        break;
      case PRODUCT_ACTION.MODIFY: {
        const { oldProductName, newProductInfo } = detail;
        const $tbodyRow = $(`[data-product-name="${oldProductName}"]`);

        $tbodyRow.dataset.productName = newProductInfo.name;

        $$('.product-td', $tbodyRow).forEach((td) => td.removeAttribute('hidden'));
        $$('.product-modify-td', $tbodyRow).forEach((td) => td.setAttribute('hidden', true));

        $('.product-td.product-name-td', $tbodyRow).textContent = newProductInfo.name;
        $('.product-td.product-price-td', $tbodyRow).textContent = newProductInfo.price;
        $('.product-td.product-quantity-td', $tbodyRow).textContent = newProductInfo.quantity;

        break;
      }
      case PRODUCT_ACTION.DELETE:
        $(`[data-product-name="${detail}"]`).remove();
    }
  }

  // eslint-disable-next-line max-lines-per-function
  tableBodyRowTemplate({ name, price, quantity }) {
    return ` 
      <tr data-product-name="${name}">
        <td class="product-td product-name-td">${name}</td>
        <td class="product-modify-td product-name-td" hidden>
          <input class="product-name-input" placeholder="상품명" value="${name}" maxlength="10" required>
        </td>

        <td class="product-td product-price-td">${price}</td>
        <td class="product-modify-td product-price-td" hidden>
          <input type="number" class="product-price-input" placeholder="가격" value="${price}" min="100" max="10000" required>
        </td>
      
        <td class="product-td product-quantity-td">${quantity}</td>
        <td class="product-modify-td product-quantity-td" hidden>
          <input type="number" class="product-quantity-input" placeholder="수량" value="${quantity}" min="1" max="20" required>
        </td>

        <td class="product-td product-manage-buttons-td">
          <button class="table__product-modify-button">수정</button>
          <button class="table__product-delete-button">삭제</button>
        </td>
        <td class="product-modify-td product-manage-buttons-td" hidden>
          <button class="table__product-modify-confirm-button">확인</button>
        </td>
      </tr>
    `;
  }

  setEventAfterProductAddRerender({ name }) {
    const $tbodyRow = $(`[data-product-name="${name}"]`);

    $tbodyRow.scrollIntoView();

    $('.table__product-modify-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductModifyButtonClick($tbodyRow),
    );
    $('.table__product-delete-button', $tbodyRow).addEventListener('click', () => {
      this.handleProductDeleteButtonClick($tbodyRow.dataset);
    });

    $$('.product-modify-td input', $tbodyRow).forEach((input) =>
      input.addEventListener('keydown', (event) => this.handleProductModifyEnter(event, $tbodyRow)),
    );
    $('.product-modify-td .table__product-modify-confirm-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductModifyConfirmButtonClick($tbodyRow),
    );
  }

  handleProductModifyButtonClick = ($tbodyRow) => {
    $$('.product-td', $tbodyRow).forEach((td) => td.setAttribute('hidden', true));
    $$('.product-modify-td', $tbodyRow).forEach((td) => td.removeAttribute('hidden'));
  };

  handleProductDeleteButtonClick = ({ productName }) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.DELETE, productName));
  };

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

    ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.MODIFY, { oldProductName, newProductInfo }));
  }
}

customElements.define('product-current-situation', ProductCurrentSituation);

export default ProductCurrentSituation;
