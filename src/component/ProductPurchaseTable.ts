import { CoinVault } from '../domain/CoinVault';
import { Product } from '../domain/Product';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductPurchaseTable {
  target: HTMLDivElement;
  productCatalog: ProductCatalog;
  coinVault: CoinVault;
  productTable: HTMLTableElement;
  productTableBody: HTMLTableElement;

  constructor(props) {
    this.target = props.target;
    this.productCatalog = props.productCatalog;
    this.coinVault = props.coinVault;
  }

  render = () => {
    this.target.insertAdjacentHTML('beforeend', this.template());

    this.productTableBody = document.querySelector('#product-table-body');
    this.productTableBody.insertAdjacentHTML('beforeend', this.tableBodyTemplate());
    this.productTableBody.addEventListener('click', this.handleProductStateManage);
  };

  template(): string {
    return `
    <div class='table-container'>
      <h2>상품 현황</h2>
      <table id='product-table'>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody id ='product-table-body'></tbody>
      </table>
    </div>
  `;
  }

  tableBodyTemplate(): string {
    return this.productCatalog.productList
      .map((product) => this.tableRowTemplate(product))
      .join('');
  }

  tableRowTemplate(product: Product): string {
    return `<tr id = '${product.getName()}'>
  <td class='product-name product-prop'><span>${product.getName()}</span></td>
  <td class='product-price product-prop'><span>${product.getPrice()}</span></td>
  <td class='product-quantity product-prop'><span>${product.getQuantity()}</span></td>
  <td class='edit-button-container'>
    <button class='purchase-button button' type='button'>구매</button>
  </td>
</tr>`;
  }

  handleProductStateManage = (e) => {
    if (e.target.classList.contains('purchase-button')) {
      const tableRow = e.target.parentNode.parentNode;
      const productName = tableRow.id;
      const productPrice = this.productCatalog.getProductPriceByName(productName);

      if (this.coinVault.getCustomerInput() - productPrice >= 0) {
        this.productCatalog.purchaseProductByName(tableRow.id);
        this.renderUpdatedTableRowQuantity(tableRow);
        this.target.dispatchEvent(
          new CustomEvent('purchased', { detail: { price: productPrice } })
        );
      } else {
        alert('그돈으로 사먹으려고?');
      }
    }
  };

  renderUpdatedTableRowQuantity(tableRow: HTMLTableRowElement) {
    const updatedQuantity = this.productCatalog.getProductQuantityByName(tableRow.id);
    if (updatedQuantity === 0) {
      tableRow.remove();
      return;
    }
    tableRow
      .querySelector('.product-quantity')
      .querySelector('span').textContent = `${updatedQuantity}`;
  }
}
