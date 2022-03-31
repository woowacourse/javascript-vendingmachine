import Component from '../abstract/component';
import { ACTION } from '../constants';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { EventOnElement } from '../types';
import { consoleErrorWithConditionalAlert, convertToLocaleString, convertToInteger } from '../utils';
import ValidationError from '../validation/validation-error';
import { validateChargeCoins } from '../validation/validators';

@customElement('charge-money-form')
class ChargeMoneyForm extends Component {
  template(chargedMoney: number): string {
    return `
      <form onsubmit="return false">
        <label for="charge-money-input">자판기가 보유할 금액을 입력해주세요</label>
        <div class="d-flex mb-4">
          <input placeholder="금액" name="charge-money-input" class="form-control mr-4" />
          <button type="button" class="btn btn-primary">추가</button>
        </div>
        <label class="mb-0">현재 보유 금액: ${convertToLocaleString(chargedMoney)}원</label>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickChargeBtn);
  }

  onClickChargeBtn = ({ target }: EventOnElement) => {
    const $input = target.previousElementSibling as HTMLInputElement;
    const money: string = $input.value;
    try {
      this.chargeCoins(money);
    } catch (e: any) {
      consoleErrorWithConditionalAlert(e);
      $input.focus();
      $input.value = '';
    }
  };

  chargeCoins(money: string) {
    const { chargedMoney } = Store.instance.getState();
    const { hasError, errorMessage } = validateChargeCoins(money, chargedMoney);
    if (hasError) throw new ValidationError(errorMessage);
    Store.instance.dispatch(createAction(ACTION.CHARGE_COINS, convertToInteger(money)));
  }

  mount() {
    this.render();
  }

  render() {
    const { chargedMoney } = Store.instance.getState();
    this.innerHTML = this.template(chargedMoney);
  }
}

export default ChargeMoneyForm;
