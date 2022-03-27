import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

export default class CoinTable extends Component {
  template() {
    const coins = vendingMachine.useStore((state) => state.coins);
    const coinArray = [...Object.entries(coins)].sort(([a], [b]) => b - a);

    return `
      <table class="styled-table">
        <thead>
          <tr class="styled-tr">
            <th class="styled-th">동전</th>
            <th class="styled-th">개수</th>
          </tr>
        </thead>
        <tbody>
          ${coinArray
            .map(
              ([key, value]) => `
                <tr class="styled-tr">
                  <td class="styled-td">${key}원</td>
                  <td class="styled-td">${value}개</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }
}

customElements.define('coin-table', CoinTable);
