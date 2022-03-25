import ProductStore from '../domains/stores/ProductStore';
import { createAction, PRODUCT_ACTION } from '../domains/actions';
import CustomElement from '../abstracts/CustomElement';
import { $ } from '../utils/dom';
import CONFIRM_MESSAGE from '../constants';

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
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }

  // eslint-disable-next-line max-lines-per-function
  rerender(newProduct, productIndex) {
    const { type, detail } = newProduct;

    switch (type) {
      case PRODUCT_ACTION.ADD:
        $('tbody', $('.product-current-situation')).insertAdjacentHTML(
          'beforeend',
          this.tableBodyRowTemplate(productIndex, detail),
        );
        this.setEventAfterProductAddRerender(productIndex);
        break;
      case PRODUCT_ACTION.DELETE:
        $(`.table-body-row${detail}`).remove();
    }
  }

  tableBodyRowTemplate(productIndex, { name, price, quantity }) {
    return `
      <tr class="table-body-row${productIndex}">
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>
          <button class="table__product-modify-button">수정</button>
          <button class="table__product-delete-button">삭제</button>
        </td>
      </tr>
    `;
  }

  setEventAfterProductAddRerender(productIndex) {
    $('.table__product-modify-button', $(`.table-body-row${productIndex}`)).addEventListener(
      'click',
      this.handleProductModifyButtonClick,
    );
    $('.table__product-delete-button', $(`.table-body-row${productIndex}`)).addEventListener('click', () =>
      this.handleProductDeleteButtonClick(productIndex),
    );
  }

  handleProductModifyButtonClick = () => {};

  handleProductDeleteButtonClick = (productIndex) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    ProductStore.instance.dispatch(createAction(PRODUCT_ACTION.DELETE, productIndex));
  };
}

customElements.define('product-current-situation', ProductCurrentSituation);

export default ProductCurrentSituation;
