import Component from '../../abstract/component';
import { ACTION } from '../../constants';
import { customElement } from '../../decorators/decortators';
import createAction from '../../flux/createAction';
import Store from '../../flux/store';
import { EventOnElement } from '../../types';
import { consoleErrorWithConditionalAlert, toInt } from '../../utils';
import ValidationError from '../../validation/validation-error';
import { validateInsertMoney } from '../../validation/validators';

@customElement('insert-money-form')
class InsertMoneyForm extends Component {
  template(insertedMoney: number): string {
    return `
      <form onsubmit="return false">
        <label for="charge-money-input">상품을 구매할 금액을 투입해주세요</label>
        <div class="d-flex mb-4">
          <input placeholder="금액" name="charge-money-input" class="form-control mr-4" />
          <button type="button" class="btn btn-primary">투입</button>
        </div>
        <label class="mb-0">투입한 금액: ${insertedMoney.toLocaleString('ko-kr')}원</label>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickInsertBtn);
  }

  onClickInsertBtn = ({ target }: EventOnElement) => {
    const $input = target.previousElementSibling as HTMLInputElement;
    const money: string = $input.value;
    try {
      this.insertMoney(money);
    } catch (e: any) {
      consoleErrorWithConditionalAlert(e);
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
