import CoinStore from '../../domains/stores/CoinStore';
import { createAction, COIN_ACTION } from '../../domains/actions';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';
import { checkChangeReturnValidation } from '../../validators';

class ChangeReturnTable extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStore.instance.subscribeCustomer(this);
  }

  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <h2>잔돈 반환</h2>
      <table class="change-return-table">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td class="change-return-table__coin-500-count-td">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td class="change-return-table__coin-100-count-td">0개</td>
          </tr>
          </tr>
          <tr>
            <td>50원</td>
            <td class="change-return-table__coin-50-count-td">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td class="change-return-table__coin-10-count-td">0개</td>
          </tr>
        </tbody>
      </table>
      <div class="change-return-button-container">
        <button class="change-return-button">반환</button>
      </div>
    `;
  }

  setEvent() {
    $('.change-return-button').addEventListener('click', this.handleChangeReturnButtonClick);
  }

  handleChangeReturnButtonClick = () => {
    try {
      this.returnChange();
    } catch (error) {
      alert(error.message);
    }
  };

  returnChange() {
    checkChangeReturnValidation();

    CoinStore.instance.dispatch(createAction(COIN_ACTION.RETURN));
  }

  rerender({ coinsCount }) {
    $('.change-return-table__coin-500-count-td').textContent = `${coinsCount[500]}개`;
    $('.change-return-table__coin-100-count-td').textContent = `${coinsCount[100]}개`;
    $('.change-return-table__coin-50-count-td').textContent = `${coinsCount[50]}개`;
    $('.change-return-table__coin-10-count-td').textContent = `${coinsCount[10]}개`;
  }
}

customElements.define('change-return-table', ChangeReturnTable);

export default ChangeReturnTable;
