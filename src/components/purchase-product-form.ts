import Component from '../abstract/component';
import { ACTION } from '../constants';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { consoleErrorWithConditionalAlert, convertToLocaleString } from '../utils';
import ValidationError from '../validation/validation-error';
import { validateInsertMoney } from '../validation/validators';

@customElement('purchase-product-form')
class PurchaseProductForm extends Component {
  template(): string {
    const { insertedMoney } = Store.instance.getState();
    return `
      <form onsubmit="return false">
        <label for="purchase-money-input">상품을 구매할 금액을 투입해주세요</label>
        <div class="d-flex mb-4">
          <input placeholder="금액" name="purchase-money-input" class="form-control mr-4" />
          <button type="button" class="btn btn-primary">투입</button>
        </div>
        <label class="mb-0">투입한 금액: ${convertToLocaleString(insertedMoney)}원</label>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickInsertMoneyBtn);
  }

  onClickInsertMoneyBtn = () => {
    const $moneyInput = document.querySelector('input') as HTMLInputElement;
    const money = $moneyInput.value;

    try {
      this.insertMoney(money);
    } catch (e: any) {
      consoleErrorWithConditionalAlert(e);
      $moneyInput.focus();
      $moneyInput.value = '';
    }
  };

  insertMoney(money: string) {
    const { insertedMoney } = Store.instance.getState();
    const { hasError, errorMessage } = validateInsertMoney(money, insertedMoney);

    if (hasError) throw new ValidationError(errorMessage);

    Store.instance.dispatch(createAction(ACTION.INSERT_MONEY, money));
  }

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.template();
  }
}

export default PurchaseProductForm;
