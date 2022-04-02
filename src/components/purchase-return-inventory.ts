import Component from '../abstract/component';
import { ACTION, COIN_UNITS, ERROR_MESSAGE } from '../constants';
import { customElement } from '../decorators/decortators';
import createAction from '../flux/createAction';
import Store from '../flux/store';
import { CoinRecord } from '../types';
import { convertToLocaleString, showSnack } from '../utils';
import ValidationError from '../validation/validation-error';
import { validateReturnChanges } from '../validation/validators';

@customElement('purchase-return-inventory')
class PurchaseReturnInventory extends Component {
  coinsTemplate(coins: CoinRecord) {
    return COIN_UNITS.map((unit) => {
      return `
        <tr>
          <td>${convertToLocaleString(unit)}원</td>
          <td>${convertToLocaleString(coins[unit])}개</td>
        </tr>
      `;
    }).join('');
  }

  template(coins: CoinRecord): string {
    return `
      <section class="purchase-return-inventory mb-4">
        <h2>잔돈 반환</h2>
        <table>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            ${this.coinsTemplate(coins)}
          </tbody>
        </table>
      </section>
      <div class="return-button">
        <button type="button" class="btn btn-secondary">반환</button>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.return-button button', this.onClickReturnBtn);
  }

  onClickReturnBtn = () => {
    const { insertedMoney, chargedCoins } = Store.instance.getState();
    try {
      this.returnChanges(insertedMoney);
    } catch (e: any) {
      showSnack(e.message);
    }
  };

  returnChanges(insertedMoney: number) {
    const { hasError, errorMessage } = validateReturnChanges(insertedMoney);
    if (hasError) throw new ValidationError(errorMessage);

    Store.instance.dispatch(createAction(ACTION.RETURN_CHANGES, undefined));

    const { insertedMoney: afterReturn } = Store.instance.getState();
    if (afterReturn > 0) {
      showSnack(ERROR_MESSAGE.NOT_ENOUGH_CHANGES);
    }
  }

  mount() {
    const { returnCoins } = Store.instance.getState();
    this.innerHTML = this.template(returnCoins);
  }

  render() {
    const { returnCoins } = Store.instance.getState();
    const tbody = this.querySelector('tbody');
    if (!tbody) return;
    tbody.innerHTML = this.coinsTemplate(returnCoins);
  }
}

export default PurchaseReturnInventory;
