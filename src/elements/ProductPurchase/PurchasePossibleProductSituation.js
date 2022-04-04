import CustomElement from '../../abstracts/CustomElement';
import ProductStoreInstance from '../../domains/stores/ProductStore';
import { $ } from '../../utils/dom';
import { PRODUCT_ACTION } from '../../domains/actions';

class PurchasePossibleProductSituation extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ProductStoreInstance.subscribe(this);
  }

  template() {
    return `
      <h2>구매 가능 상품 현황</h2>
      <div class="purchase-possible-product-container">
        <table class="purchase-possible-product-situation">
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
      </div>
    `;
  }

  rerender({ type, detail }) {
    switch (type) {
      case PRODUCT_ACTION.ADD:
        $('tbody', $('.purchase-possible-product-situation')).insertAdjacentHTML(
          'beforeend',
          this.tableBodyRowTemplate(detail),
        );
        this.setEventAfterRerender(detail.name);
        break;
      case PRODUCT_ACTION.MODIFY: {
        const { oldProductName, newProductInfo } = detail;
        const $tbodyRow = $(`[data-purchase-product-name="${oldProductName}"]`);

        $tbodyRow.dataset.purchaseProductName = newProductInfo.name;

        $('.product-name-td', $tbodyRow).textContent = newProductInfo.name;
        $('.product-price-td', $tbodyRow).textContent = newProductInfo.price;
        $('.product-quantity-td', $tbodyRow).textContent = newProductInfo.quantity;
        $('.product-manage-buttons-td', $tbodyRow).replaceChildren();
        $('.product-manage-buttons-td', $tbodyRow).insertAdjacentHTML(
          'beforeend',
          `<button class="table__product-purchase-button">구매</button>`,
        );

        this.setEventAfterRerender(newProductInfo.name);
        break;
      }
      case PRODUCT_ACTION.DELETE:
        $(`[data-purchase-product-name="${detail}"]`).remove();
    }
  }

  tableBodyRowTemplate({ name, price, quantity }) {
    return ` 
      <tr data-purchase-product-name="${name}">
        <td class="product-name-td">${name}</td> 
        <td class="product-price-td">${price}</td>
        <td class="product-quantity-td">${quantity}</td>
        <td class="product-manage-buttons-td">
          <button class="table__product-purchase-button">구매</button>
        </td>
      </tr>
    `;
  }

  setEventAfterRerender(productName) {
    const $tbodyRow = $(`[data-purchase-product-name="${productName}"]`);

    $tbodyRow.scrollIntoView();

    $('.table__product-purchase-button', $tbodyRow).addEventListener('click', () =>
      this.handleProductPurchaseButtonClick($tbodyRow),
    );
  }

  handleProductPurchaseButtonClick = ($tbodyRow) => {
    console.log($tbodyRow);
  };
}

customElements.define('purchase-possible-product-situation', PurchasePossibleProductSituation);

export default PurchasePossibleProductSituation;
