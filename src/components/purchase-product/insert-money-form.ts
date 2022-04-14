import Component from '../../abstract/component';
import { ACTION } from '../../constants';
import { customElement } from '../../decorators/decortators';
import createAction from '../../flux/createAction';
import Store from '../../flux/store';
import { ToastType } from '../../types';
import { consoleErrorWithConditionalToast, toast, toInt } from '../../utils';
import ValidationError from '../../validation/validation-error';
import { validateInsertMoney } from '../../validation/validators';

@customElement('insert-money-form')
class InsertMoneyForm extends Component {
  template(insertedMoney: number): string {
    return `
      <form onsubmit="return false">
        <label for="insert-money-input">상품을 구매할 금액을 투입해주세요</label>
        <div class="d-flex mb-4">
          <input placeholder="금액" name="insert-money-input" class="form-control mr-4" data-test-id="insert-money-input" />
          <button type="button" class="btn btn-primary" data-test-id="insert-money-btn">투입</button>
        </div>
        <label class="mb-0">투입한 금액: <span data-test-id="inserted-money">${insertedMoney.toLocaleString()}</span>원</label>
      </form>
    `;
  }

  setEvent() {
    this.addEvent<KeyboardEvent>('keyup', 'input', (e) => {
      if (e.key !== 'Enter') return;
      (this.querySelector('button') as HTMLButtonElement).click();
    });
    this.addEvent('click', 'button', this.onClickInsertBtn);
  }

  onClickInsertBtn = () => {
    const $input = this.querySelector('input[name="insert-money-input"') as HTMLInputElement;
    const money: string = $input.value;
    try {
      this.insertMoney(money);
      toast(ToastType.Success, '돈을 투입했습니다');
    } catch (e: any) {
      consoleErrorWithConditionalToast(e);
      $input.focus();
      $input.value = '';
    }
  };

  insertMoney(money: string) {
    const { insertedMoney } = Store.instance.getState();
    const { hasError, errorMessage } = validateInsertMoney(money, insertedMoney);
    if (hasError) throw new ValidationError(errorMessage);
    Store.instance.dispatch(createAction(ACTION.INSERT_MONEY, toInt(money)));
  }

  mount() {
    this.render();
  }

  render() {
    const { insertedMoney } = Store.instance.getState();
    this.innerHTML = this.template(insertedMoney);
  }
}

export default InsertMoneyForm;
