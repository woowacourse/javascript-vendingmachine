import Component from '../../abstract/component';
import { ACTION } from '../../constants';
import { customElement } from '../../decorators/decortators';
import createAction from '../../flux/createAction';
import Store from '../../flux/store';
import { EventOnElement, ProductItem, ToastType } from '../../types';
import { toast, toInt } from '../../utils';
import { validateProduct } from '../../validation/validators';

@customElement('product-inventory')
class ProductInventory extends Component {
  productItemTemplate({ name, price, quantity, isEditing }: ProductItem) {
    if (isEditing) {
      return `
        <tr class="is-editing">
          <td><input class="form-control" placeholder="상풍명" value="${name}" data-original-name="${name}" data-test-id="product-name-input"/></td>
          <td><input class="form-control" placeholder="가격" value="${price}" data-test-id="product-price-input"/></td>
          <td><input class="form-control" placeholder="수량" value="${quantity}" data-test-id="product-quantity-input"/></td>
          <td class="has-btn">
            <div class="btn-group">
              <button class="btn xs mr-2 btn-primary btn-confirm" data-test-id="confirm-btn">확인</button>
              <button class="btn xs btn-outline-primary btn-cancel" data-test-id="cancel-btn">취소</button>
            </div>
          </td>
        </tr>
      `;
    }
    return `
      <tr>
        <td><span data-test-id="product-name">${name}</span></td>
        <td><span data-test-id="product-price">${price.toLocaleString()}</span>원</td>
        <td><span data-test-id="product-quantity">${quantity.toLocaleString()}</span>개</td>
        <td class="has-btn">
          <div class="btn-group">
            <button class="btn xs mr-2 btn-secondary btn-edit" data-test-id="edit-btn">수정</button>
            <button class="btn xs btn-secondary btn-delete" data-test-id="delete-btn">삭제</button>
          </div>
        </td>
      </tr>
    `;
  }

  template(productList: Array<ProductItem>): string {
    const header = `<h2>상품 현황</h2>`;
    if (!productList.length)
      return header + `<div class="text-center">현재 등록된 상품이 <b>없습니다</b></div>`;

    const productListTemplate = productList.map((item) => this.productItemTemplate(item)).join('');
    return `
      ${header}
      <table data-test-id="product-inventory-table">
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
    this.addEvent<KeyboardEvent>('keyup', 'input', (e) => {
      if (e.key !== 'Enter') return;
      const $tr = (e.target as HTMLElement).closest('tr.is-editing');
      if (!$tr) return;
      ($tr.querySelector('.btn-confirm') as HTMLButtonElement).click();
    });
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
    const isEditingSameProduct = (item: ProductItem) =>
      !(originalName === name && item.name === name);
    const errorList = validateProduct(
      { name, price, quantity },
      productList.filter(isEditingSameProduct)
    ).filter((result) => result.hasError);

    if (errorList.length > 0 && errorList[0].hasError) {
      toast(ToastType.Error, errorList[0].errorMessage);
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
    toast(ToastType.Success, '상품을 수정했습니다');
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
    toast(ToastType.Success, '상품을 삭제했습니다');
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
