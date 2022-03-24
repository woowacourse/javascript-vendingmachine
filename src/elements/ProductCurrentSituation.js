import ProductStore from '../domains/stores/ProductStore';
import CustomElement from '../abstracts/CustomElement';
import { $ } from '../utils/dom';

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

  rerender(newProduct) {
    $('tbody', $('.product-current-situation')).insertAdjacentHTML('beforeend', this.tableBodyRowTemplate(newProduct));
    this.setEventAfterRerender();
  }

  tableBodyRowTemplate({ name, price, quantity }) {
    return `
      <tr>
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

  setEventAfterRerender() {
    $('.table__product-modify-button').addEventListener('click', this.handleProductModifyButtonClick);
    $('.table__product-delete-button').addEventListener('click', this.handleProductDeleteButtonClick);
  }

  handleProductModifyButtonClick = () => {};

  handleProductDeleteButtonClick = () => {};
}

customElements.define('product-current-situation', ProductCurrentSituation);

export default ProductCurrentSituation;
