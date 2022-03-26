import Component from '../abstract/component';
import { ACTION, VALIDATION_ERROR_NAME } from '../constants';
import { customElement, event } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { ProductItem } from '../types';
import { consoleErrorWithConditionalAlert } from '../utils';
import ValidationError from '../validation/validation-error';
import { validateProduct } from '../validation/validators';

type EditParams = {
  target: HTMLElement;
  $name: Element;
  $price: Element;
  $quantity: Element;
};

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
  onClickEditBtn(event: { target: HTMLElement }) {
    const children = event.target.closest('tr')?.children;
    if (!children) return;
    const [$name, $price, $quantity] = children;

    if (!event.target.classList.contains('confirm')) {
      this.changeToEditMode({ target: event.target, $price, $quantity });
      return;
    }
    try {
      this.editProduct({ target: event.target, $name, $price, $quantity });
    } catch (e: any) {
      consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
    }
  }

  @event('click', '.btn-delete')
  deleteProduct({ target }: { target: HTMLElement }) {
    const tds = this.findTds(target);
    if (!tds) return;
    const { $name } = tds;
    const result = window.confirm('해당 상품을 삭제하시겠습니까?');
    if (!result) return;
    Store.instance.dispatch(createAction(ACTION.DELETE_PRODUCT, $name.textContent));
  }

  findTds(target: HTMLElement) {
    const children = target.closest('tr')?.children;
    if (!children) return null;
    const [$name, $price, $quantity] = children;
    return { $name, $price, $quantity };
  }

  changeToEditMode({ target, $price, $quantity }: Omit<EditParams, '$name'>) {
    $price.innerHTML = `<input placeholder=${$price.textContent} class="form-control"/>`;
    $quantity.innerHTML = `<input placeholder=${$quantity.textContent} class="form-control"/>`;
    target.innerText = '확인';
    target.classList.add('cyan');
    target.classList.add('confirm');
  }

  editProduct({ target, $name, $price, $quantity }: EditParams) {
    const name = $name.innerHTML;
    const price = ($price.childNodes[0] as HTMLInputElement).value;
    const quantity = ($quantity.childNodes[0] as HTMLInputElement).value;

    const productList = Store.instance.getState().productList;
    const errorList = validateProduct(
      { name, price, quantity },
      productList.filter((item) => item.name !== name)
    ).filter((result) => result.hasError);

    if (errorList.length > 0 && errorList[0].hasError) {
      throw new ValidationError(errorList[0].errorMessage);
    }

    $price.innerHTML = price;
    $quantity.innerHTML = quantity;
    Store.instance.dispatch(createAction(ACTION.EDIT_PRODUCT, { name, price, quantity }));
    target.innerText = '수정';
    target.classList.remove('cyan');
    target.classList.remove('confirm');
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
