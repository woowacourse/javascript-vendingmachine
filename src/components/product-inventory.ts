import Component from '../abstract/component';
import { customElement, event } from '../decorators/decortators';
import Store from '../flux/store';
import { ProductItem } from '../types';

@customElement('product-inventory')
class ProductInventory extends Component {
  productItemTemplate({ id, name, price, quantity }: ProductItem) {
    return `
      <tr data-product-id="${id}">
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>
          <div class="btn-group">
            <button class="btn xs mr-2 btn-edit">수정</button>
            <button class="btn xs btn-delete">삭제</button>
          </div>
        </td>
      </tr>
    `;
  }

  template(productList: Array<ProductItem>): string {
    const productListTemplate = productList.map((item) => this.productItemTemplate(item)).join('');
    return `
      <h2 class="text-center">상품 현황</h2>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${productListTemplate}
        </tbody>
      </table>
    `;
  }

  @event('click', '.btn-edit')
  editProduct() {}

  @event('click', '.btn-delete')
  deleteProduct() {}

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

export default ProductInventory;
