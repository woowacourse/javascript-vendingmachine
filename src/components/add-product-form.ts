import Component from '../abstract/component';
import { ACTION } from '../constatns/flux-constants';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { EventOnElement, RawProductItem } from '../types';
import { consoleErrorWithConditionalAlert, convertToInteger } from '../utils';
import ValidationError from '../validation/validation-error';
import { validateProduct } from '../validation/validators';

@customElement('add-product-form')
class AddProductForm extends Component {
  template(): string {
    return `
      <form onsubmit="return false">
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

  setEvent() {
    this.addEvent('click', 'button', this.onClickAddProductBtn);
    this.addEvent('keyup', 'input', this.onPressEnter);
  }

  onClickAddProductBtn = () => {
    const nameInput = this.querySelector('input[name="product-name"]') as HTMLInputElement;
    const priceInput = this.querySelector('input[name="product-price"]') as HTMLInputElement;
    const quantityInput = this.querySelector('input[name="product-quantity"]') as HTMLInputElement;
    const [name, price, quantity] = [nameInput.value, priceInput.value, quantityInput.value];
    const productItem = { name, price, quantity };

    this.addProduct(productItem);

    [...this.querySelectorAll('input')].forEach(($input) => ($input.value = ''));
    this.querySelector('input')?.focus();
  };

  onPressEnter = ({ key }: EventOnElement) => {
    if (key === 'Enter') this.onClickAddProductBtn();
  };

  addProduct(productItem: RawProductItem) {
    const { productList } = Store.instance.getState();
    const { price, quantity } = productItem;
    const errorList = validateProduct(productItem, productList);

    if (errorList.length > 0) {
      return errorList.forEach((error) =>
        consoleErrorWithConditionalAlert(new ValidationError(error.errorMessage))
      );
    }

    Store.instance.dispatch(
      createAction(ACTION.ADD_PRODUCT, {
        ...productItem,
        price: convertToInteger(price),
        quantity: convertToInteger(quantity),
      })
    );
  }
}

export default AddProductForm;
