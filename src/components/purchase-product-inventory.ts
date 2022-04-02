import Component from '../abstract/component';
import { ACTION } from '../constants';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { EventOnElement, ProductItem } from '../types';
import { consoleErrorWithConditionalAlert, convertToLocaleString } from '../utils';
import ValidationError from '../validation/validation-error';

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

  setEvent() {
    this.addEvent('click', '.has-btn button', this.onClickPurchaseBtn);
  }

  onClickPurchaseBtn = ({ target }: EventOnElement) => {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name } = tds;
    const name = $name.textContent?.trim() as string;

    try {
      this.purchaseProduct(name);
    } catch (e: any) {
      consoleErrorWithConditionalAlert(e);
    }
  };

  purchaseProduct(name: string) {
    const { productList, insertedMoney } = Store.instance.getState();
    const { price } = productList.find((product) => product.name === name) as ProductItem;

    if (price > insertedMoney) throw new ValidationError('금액이 부족합니다.');

    Store.instance.dispatch(createAction(ACTION.PURCHASE_PRODUCT, name));
  }
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

export default PurchaseProductInventory;
