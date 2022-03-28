import Component from '../abstract/component';
import { ACTION } from '../constants';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { EventOnElement, ProductItem } from '../types';
import { toInt } from '../utils';
import { validateProduct } from '../validation/validators';

@customElement('product-inventory')
class ProductInventory extends Component {
  productItemTemplate({ name, price, quantity, isEditing }: ProductItem) {
    return `
      <tr>
        <td>${
          isEditing
            ? `<input class="form-control" placeholder="상풍명" value="${name}" data-original-name="${name}"/>`
            : name
        }</td>
        <td>${
          isEditing
            ? `<input class="form-control" placeholder="가격" value="${price}"/>`
            : `${price.toLocaleString('ko-kr')}원`
        }</td>
        <td>${
          isEditing
            ? `<input class="form-control" placeholder="수량" value="${quantity}"/>`
            : `${quantity.toLocaleString('ko-kr')}개`
        }</td>
        <td class="has-btn">
          <div class="btn-group">
            <button class="btn xs mr-2 ${
              isEditing ? 'btn-primary btn-confirm' : 'btn-secondary btn-edit'
            }">${isEditing ? '확인' : '수정'}</button>
            <button class="btn xs ${
              isEditing ? 'btn-outline-primary btn-cancel' : 'btn-secondary btn-delete'
            }">${isEditing ? '취소' : '삭제'}</button>
          </div>
        </td>
      </tr>
    `;
  }

  template(productList: Array<ProductItem>): string {
    const productListTemplate = productList.map((item) => this.productItemTemplate(item)).join('');
    return `
      <h2>상품 현황</h2>
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

  setEvent() {
    this.addEvent('click', '.btn-edit', this.changeToEditMode);
    this.addEvent('click', '.btn-confirm', this.editProduct);
    this.addEvent('click', '.btn-cancel', this.cancelProduct);
    this.addEvent('click', '.btn-delete', this.deleteProduct);
  }

  changeToEditMode = ({ target }: EventOnElement) => {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name } = tds;
    Store.instance.dispatch(
      createAction(ACTION.CHANGE_EDIT_MODE, { name: $name.textContent, isEditing: true })
    );
  };

  editProduct = ({ target }: EventOnElement) => {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name, $price, $quantity } = tds;

    const originalName = ($name.childNodes[0] as HTMLInputElement).dataset.originalName as string;
    const name = ($name.childNodes[0] as HTMLInputElement).value;
    const price = ($price.childNodes[0] as HTMLInputElement).value;
    const quantity = ($quantity.childNodes[0] as HTMLInputElement).value;

    const productList = Store.instance.getState().productList;
    const errorList = validateProduct(
      { name, price, quantity },
      productList.filter((item) => !(item.name === originalName && item.name === name))
    ).filter((result) => result.hasError);

    if (errorList.length > 0 && errorList[0].hasError) {
      alert(errorList[0].errorMessage);
      return;
    }
    Store.instance.dispatch(
      createAction(ACTION.EDIT_PRODUCT, {
        originalName,
        name,
        price: toInt(price),
        quantity: toInt(quantity),
      })
    );
  };

  cancelProduct = ({ target }: EventOnElement) => {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name } = tds;
    const $nameInput = $name.childNodes[0] as HTMLInputElement;
    const originalName = $nameInput.dataset.originalName as string;
    Store.instance.dispatch(
      createAction(ACTION.CHANGE_EDIT_MODE, { name: originalName, isEditing: false })
    );
  };

  deleteProduct = ({ target }: EventOnElement) => {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name } = tds;
    const result = window.confirm('해당 상품을 삭제하시겠습니까?');
    if (!result) return;
    Store.instance.dispatch(createAction(ACTION.DELETE_PRODUCT, $name.textContent));
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

export default ProductInventory;
