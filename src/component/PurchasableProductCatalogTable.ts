import { ProductCatalog } from '../domain/ProductCatalog';

import { ProductProps } from '../utils/interface';

interface PurchasableProductCatalogTableInterface {}

export class PurchasableProductCatalogTable implements PurchasableProductCatalogTableInterface {
  #target: HTMLDivElement;
  #productCatalog: ProductCatalog;

  constructor({ target, productCatalog }) {
    this.#target = target;
    this.#productCatalog = productCatalog;

    this.#target.addEventListener('productPurhcased', this.#renderPurchasedProduct);
  }

  render = () => {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
  };

  #template() {
    return `
      <div class="table-container">
      <h2>구매 가능 상품현황</h2>
      <table id="purchasable-product-table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody id="product-table-body">${this.#tableBodyTemplate()}</tbody>
      </table>
    </div>
    `;
  }

  #tableBodyTemplate(): string {
    return this.#productCatalog
      .getProductList()
      .map((product) => {
        const name = product.getName();
        const price = product.getPrice();
        const quantity = product.getQuantity();

        return this.#tableRowTemplate({ name, price, quantity });
      })
      .join('');
  }

  #tableRowTemplate({ name, price, quantity }: ProductProps): string {
    return `<tr id="${name}">
      <td class="product-name product-prop"><span>${name}</span></td>
      <td class="product-price product-prop"><span>${price}</span></td>
      <td class="product-quantity product-prop"><span>${quantity}</span></td>
      <td>
        <button class="purchase-button button" type="button">구매</button>
      </td>
    </tr>`;
  }

  #renderPurchasedProduct() {}
}
