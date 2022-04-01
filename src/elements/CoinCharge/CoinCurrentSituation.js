import CoinStore from '../../domains/stores/CoinStore';
import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';

class CoinCurrentSituation extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    CoinStore.instance.subscribeCoinsCount(this);
  }

  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <h2>자판기가 보유한 동전</h2>
      <table class="coin-current-situation">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td class="coin-500-count-td">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td class="coin-100-count-td">0개</td>
          </tr>
          </tr>
          <tr>
            <td>50원</td>
            <td class="coin-50-count-td">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td class="coin-10-count-td">0개</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  rerender(newCoinsCount) {
    $('.coin-500-count-td').textContent = `${newCoinsCount[500]}개`;
    $('.coin-100-count-td').textContent = `${newCoinsCount[100]}개`;
    $('.coin-50-count-td').textContent = `${newCoinsCount[50]}개`;
    $('.coin-10-count-td').textContent = `${newCoinsCount[10]}개`;
  }
}

customElements.define('coin-current-situation', CoinCurrentSituation);

export default CoinCurrentSituation;
