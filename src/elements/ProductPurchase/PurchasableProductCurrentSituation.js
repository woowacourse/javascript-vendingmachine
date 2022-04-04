import ProductStore from '../../domains/stores/ProductStore';
import { PRODUCT_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';

class PurchasableProductCurrentSituation extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ProductStore.instance.subscribe(this);
  }

  template() {
    return `
      <h2>구매 가능 상품 현황</h2>
      <table class="purchasable-product-current-situation">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }

  // eslint-disable-next-line max-lines-per-function
  rerender({ type, detail }) {
    switch (type) {
      case PRODUCT_ACTION.ADD:
        $('tbody', $('.purchasable-product-current-situation')).insertAdjacentHTML(
          'beforeend',
          this.tableBodyRowTemplate(detail),
        );
        this.setEventAfterProductAddRerender(detail);
        break;
      case PRODUCT_ACTION.MODIFY: {
        const { oldProductName, newProductInfo } = detail;
        const $tbodyRow = $(`[data-purchasable-product-name="${oldProductName}"]`);

        $tbodyRow.dataset.purchasableProductName = newProductInfo.name;

        $('.purchasable-product-name-td', $tbodyRow).textContent = newProductInfo.name;
        $('.purchasable-product-price-td', $tbodyRow).textContent = newProductInfo.price;
        $('.purchasable-product-quantity-td', $tbodyRow).textContent = newProductInfo.quantity;

        break;
      }
      case PRODUCT_ACTION.DELETE:
        $(`[data-purchasable-product-name="${detail}"]`).remove();
    }
  }

  tableBodyRowTemplate({ name, price, quantity }) {
    return ` 
      <tr data-purchasable-product-name="${name}">
        <td class="purchasable-product-name-td">${name}</td>
        <td class="purchasable-product-price-td">${price}</td>
        <td class="purchasable-product-quantity-td">${quantity}</td>
        <td>
          <button class="table__product-purchase-button">구매</button>
        </td>
      </tr>
    `;
  }

  setEventAfterProductAddRerender({ name }) {
    const $tbodyRow = $(`[data-purchasable-product-name="${name}"]`);

    $('.table__product-purchase-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductPurchaseButtonClick($tbodyRow),
    );
  }

  handleProductPurchaseButtonClick = ($tbodyRow) => {};
}

customElements.define('purchasable-product-current-situation', PurchasableProductCurrentSituation);

export default PurchasableProductCurrentSituation;
