import Component from '../abstract/component';
import { ACTION } from '../constants';
import { customElement, event } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { RawProductItem } from '../types';
import { consoleErrorWithConditionalAlert } from '../utils';
import ValidationError from '../validation/validation-error';
import { validateProduct } from '../validation/validators';

@customElement('add-product-form')
class AddProductForm extends Component {
  template(): string {
    return `
      <form>
        <label for="product-name">추가할 상품 정보를 입력해주세요.</label>
        <div class="d-flex">
          <input placeholder="상품명" name="product-name" class="form-control mr-1" />
          <input placeholder="가격" name="product-price" class="form-control mr-1" />
          <input placeholder="수량" name="product-quantity" class="form-control mr-4" />
          <button type="button" class="btn btn-primary">추가</button>
        </div>
      </form>
    `;
  }

  @event('click', 'button')
  onClickAddProductBtn() {
    const nameInput = this.querySelector('input[name="product-name"]') as HTMLInputElement;
    const priceInput = this.querySelector('input[name="product-price"]') as HTMLInputElement;
    const quantityInput = this.querySelector('input[name="product-quantity"]') as HTMLInputElement;
    const [name, price, quantity] = [nameInput.value, priceInput.value, quantityInput.value];
    const productItem = { name, price, quantity };

    try {
      this.addProduct(productItem);
    } catch (e: any) {
      consoleErrorWithConditionalAlert(e);
    }
  }

  addProduct(productItem: RawProductItem) {
    const { productList } = Store.instance.getState();
    const errorList = validateProduct(productItem, productList).filter((result) => result.hasError);
    if (errorList.length > 0 && errorList[0].hasError)
      throw new ValidationError(errorList[0].errorMessage);
    Store.instance.dispatch(createAction(ACTION.ADD_PRODUCT, productItem));
    [...this.querySelectorAll('input')].forEach(($input) => ($input.value = ''));
    this.querySelector('input')?.focus();
  }

  shouldSubscribe(): boolean {
    return true;
  }
}

export default AddProductForm;
