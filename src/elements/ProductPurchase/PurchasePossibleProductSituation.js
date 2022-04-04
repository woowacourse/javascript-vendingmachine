import CustomElement from '../../abstracts/CustomElement';
import ProductStoreInstance from '../../domains/stores/ProductStore';
import { $ } from '../../utils/dom';
import { PRODUCT_ACTION, COIN_ACTION } from '../../domains/actions';
import { checkCanPurchaseValidation } from '../../validators';
import CoinStoreInstance from '../../domains/stores/CoinStore';

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
      case PRODUCT_ACTION.DELETE: {
        $(`[data-purchase-product-name="${detail}"]`).remove();
        break;
      }
      case PRODUCT_ACTION.PURCHASE: {
        const $tbodyRow = $(`[data-purchase-product-name="${detail}"]`);
        this.updateProductQuantity($tbodyRow, detail);
      }
    }
  }

  updateProductQuantity = ($tbodyRow, detail) => {
    const $productQuantityTd = $('.product-quantity-td', $tbodyRow);
    $productQuantityTd.textContent -= 1;
    if (Number($productQuantityTd.textContent) === 0) {
      ProductStoreInstance.dispatchAction(PRODUCT_ACTION.DELETE, detail);
    }
  };

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
    const moneyInput = CoinStoreInstance.coinsCount.money_input;
    const productPrice = Number($('.product-price-td', $tbodyRow).textContent);
    const { purchaseProductName } = $tbodyRow.dataset;

    // 상품을 살 수 있는지 체크
    try {
      checkCanPurchaseValidation(moneyInput, productPrice);
    } catch (error) {
      alert(error.message);
      return;
    }

    // 수량 -1에 대한 액션
    ProductStoreInstance.dispatchAction(PRODUCT_ACTION.PURCHASE, purchaseProductName);
    // 투입한 금액 업데이트에 대한 액션
    CoinStoreInstance.dispatchAction(COIN_ACTION.UPDATE_MONEY_INPUT, productPrice);
  };
}

customElements.define('purchase-possible-product-situation', PurchasePossibleProductSituation);

export default PurchasePossibleProductSituation;
