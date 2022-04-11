import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { EventOnElement, ProductItem } from '../types';
import { convertToLocaleString, showSnack } from '../utils';
import ValidationError from '../validation/validation-error';
import emptyImage from '../../images/empty.png';
import { ACTION } from '../constatns/flux-constants';
import { ERROR_MESSAGE } from '../constatns/validator-constants';

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

  emptyTemplate() {
    return `
      <h2>아직 상품이 없어요!</h2>
      <div>
        <img src=${emptyImage} width="100%" />
      </div>
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
      showSnack(`${name} 구매 완료`);
    } catch (e: any) {
      showSnack(e.message);
    }
  };

  purchaseProduct(name: string) {
    const { productList, insertedMoney } = Store.instance.getState();
    const { price } = productList.find((product) => product.name === name) as ProductItem;

    if (price > insertedMoney) throw new ValidationError(ERROR_MESSAGE.NOT_ENOUGH_MONEY);

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
    this.innerHTML = productList.length === 0 ? this.emptyTemplate() : this.template(productList);
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
