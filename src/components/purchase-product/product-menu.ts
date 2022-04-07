import Component from '../../abstract/component';
import { ACTION } from '../../constants';
import { customElement } from '../../decorators/decortators';
import createAction from '../../flux/createAction';
import Store from '../../flux/store';
import { EventOnElement, ProductItem, ToastType } from '../../types';
import { toast } from '../../utils';
import { validatePurchaseProduct } from '../../validation/validators';

@customElement('product-menu')
class ProductMenu extends Component {
  productItemTemplate({ name, price, quantity }: ProductItem) {
    return `
      <tr>
        <td>${name}</td>
        <td>${price.toLocaleString('ko-kr')}원</td>
        <td>${quantity.toLocaleString('ko-kr')}개</td>
        <td class="has-btn">
          <button class="btn sm btn-secondary btn-purchase" data-test-id="purchase-btn">구매</button>
        </td>
      </tr>
    `;
  }

  template(productList: Array<ProductItem>): string {
    const productListTemplate = productList.map((item) => this.productItemTemplate(item)).join('');
    const header = `<h2>구매 가능 상품 현황</h2>`;
    if (productList.length === 0)
      return header + `<div class="text-center">현재 구매 가능한 상품이 <b>없습니다</b></div>`;
    return `
      ${header}
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

  setEvent() {
    this.addEvent('click', '.btn-purchase', this.purchase);
  }

  purchase = ({ target }: EventOnElement) => {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name } = tds;
    const name = $name.textContent;
    const { productList, insertedMoney } = Store.instance.getState();
    const productIdx = productList.findIndex((item) => item.name === name);
    const product = productList[productIdx];
    const { hasError, errorMessage } = validatePurchaseProduct(product, insertedMoney);
    if (hasError) {
      toast(ToastType.Error, errorMessage);
      return;
    }

    Store.instance.dispatch(createAction(ACTION.PURCHASE_PRODUCT, { name }));
    toast(ToastType.Success, '상품을 구매했습니다');
  };

  findTds(target: HTMLElement) {
    const children = target.closest('tr')?.children;
    if (!children) return null;
    const [$name, $price, $quantity] = children;
    return { $name, $price, $quantity };
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

export default ProductMenu;
