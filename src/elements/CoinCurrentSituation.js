import CustomElement from '../abstracts/CustomElement';

class CoinCurrentSituation extends CustomElement {
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
}

customElements.define('coin-current-situation', CoinCurrentSituation);

export default CoinCurrentSituation;
