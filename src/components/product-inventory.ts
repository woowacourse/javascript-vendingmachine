import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { EventOnElement, ProductItem } from '../types';
import {
  consoleErrorWithConditionalAlert,
  convertToLocaleString,
  convertToInteger,
} from '../utils';
import ValidationError from '../validation/validation-error';
import { validateProduct } from '../validation/validators';
import emptyImage from '../../images/empty.png';
import { ACTION } from '../constatns/flux-constants';
import { CONFIRM_MESSAGE } from '../constatns/validator-constants';

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
            : `${convertToLocaleString(price)}원`
        }</td>
        <td>${
          isEditing
            ? `<input class="form-control" placeholder="수량" value="${quantity}"/>`
            : `${convertToLocaleString(quantity)}개`
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

  emptyTemplate() {
    return `
      <h2>아직 상품이 없어요!</h2>
      <div>
        <img src=${emptyImage} width="100%" />
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-edit', this.changeToEditMode);
    this.addEvent('click', '.btn-confirm', this.editProduct);
    this.addEvent('click', '.btn-cancel', this.cancelProductEditing);
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
    );

    if (errorList.length > 0) {
      errorList.forEach((error) =>
        consoleErrorWithConditionalAlert(new ValidationError(error.errorMessage))
      );
      return;
    }

    Store.instance.dispatch(
      createAction(ACTION.EDIT_PRODUCT, {
        originalName,
        name,
        price: convertToInteger(price),
        quantity: convertToInteger(quantity),
      })
    );
  };

  cancelProductEditing = ({ target }: EventOnElement) => {
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
    const result = window.confirm(CONFIRM_MESSAGE.DELETE_PRODUCT);

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

export default ProductInventory;
