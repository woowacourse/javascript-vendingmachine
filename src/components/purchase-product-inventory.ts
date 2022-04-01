import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import { ProductItem } from '../types';
import { convertToLocaleString } from '../utils';

@customElement('purchase-product-inventory')
class PurchaseProductInventory extends Component {
  productItemTemplate({ name, price, quantity }: ProductItem) {
    return `
      <tr>
        <td>
          ${name}
        </td>
        <td>
          ${convertToLocaleString(price)}원
        </td>
        <td>
          ${convertToLocaleString(quantity)}개
        </td>
        <td class="has-btn">
          <button class="btn xs mr-2 btn-secondary">구매</button>
        </td>
      </tr>
    `;
  }

  template(productList: Array<ProductItem>): string {
    const productListTemplate = productList.map((item) => this.productItemTemplate(item)).join('');
    return `
      <h2>구매 가능 상품 현황</h2>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody>
          ${productListTemplate}
        </tbody>
      </table>
    `;
  }

  mount() {
    const { productList } = Store.instance.getState();
    this.innerHTML = this.template(productList);
  }

  render() {
    const tbody = this.querySelector('tbody');
    const { productList } = Store.instance.getState();
    const productListTemplate = productList.map((item) => this.productItemTemplate(item)).join('');
    if (!tbody) return;

    tbody.innerHTML = productListTemplate;
  }
}

export default PurchaseProductInventory;
