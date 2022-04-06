import Component from '../../abstract/component';
import { ACTION } from '../../constants';
import { customElement } from '../../decorators/decortators';
import createAction from '../../flux/createAction';
import Store from '../../flux/store';
import { RawProductItem, ToastType } from '../../types';
import { consoleErrorWithConditionalToast, toast, toInt } from '../../utils';
import ValidationError from '../../validation/validation-error';
import { validateProduct } from '../../validation/validators';

@customElement('add-product-form')
class AddProductForm extends Component {
  template(): string {
    return `
      <form onsubmit="return false">
        <label for="product-name" class="mb-3">추가할 상품 정보를 입력해주세요.</label>
        <div class="d-flex">
          <div class="input-container mr-1">
            <label for="product-name-input">상품명</label>
            <input placeholder="상품명" name="product-name" id="product-name-input" class="form-control" />
          </div>
          <div class="input-container mr-1">
            <label for="product-price-input">가격</label>
            <input placeholder="가격" name="product-price" id="product-price-input" class="form-control" />
          </div>
          <div class="input-container mr-4">
            <label for="product-quantity-input">수량</label>
            <input placeholder="수량" name="product-quantity" id="product-quantity-input" class="form-control" />
          </div>
          <button type="button" class="btn btn-primary">추가</button>
        </div>
      </form>
    `;
  }

  setEvent() {
    this.addEvent<KeyboardEvent>('keyup', 'input', (e) => {
      if (e.key !== 'Enter') return;
      (this.querySelector('button') as HTMLButtonElement).click();
    });
    this.addEvent('click', 'button', this.onClickAddProductBtn);
  }

  onClickAddProductBtn = () => {
    const nameInput = this.querySelector('input[name="product-name"]') as HTMLInputElement;
    const priceInput = this.querySelector('input[name="product-price"]') as HTMLInputElement;
    const quantityInput = this.querySelector('input[name="product-quantity"]') as HTMLInputElement;
    const [name, price, quantity] = [nameInput.value, priceInput.value, quantityInput.value];
    const productItem = { name, price, quantity };

    try {
      this.addProduct(productItem);
      toast(ToastType.Success, '상품을 추가했습니다');
    } catch (e: any) {
      consoleErrorWithConditionalToast(e);
    }
  };

  addProduct(productItem: RawProductItem) {
    const { productList } = Store.instance.getState();
    const { price, quantity } = productItem;
    const errorList = validateProduct(productItem, productList).filter((result) => result.hasError);
    if (errorList.length > 0 && errorList[0].hasError)
      throw new ValidationError(errorList[0].errorMessage);
    Store.instance.dispatch(
      createAction(ACTION.ADD_PRODUCT, {
        ...productItem,
        price: toInt(price),
        quantity: toInt(quantity),
      })
    );
    [...this.querySelectorAll('input')].forEach(($input) => ($input.value = ''));
    this.querySelector('input')?.focus();
  }

  shouldSubscribe(): boolean {
    return true;
  }
}

export default AddProductForm;
