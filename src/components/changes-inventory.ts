import Component from '../abstract/component';
import { COIN_UNITS } from '../constants';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import { CoinRecord } from '../types';
import { convertToLocaleString } from '../utils';

@customElement('changes-inventory')
class ChangesInventory extends Component {
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
      <section class="changes-inventory">
        <h2>자판기가 보유한 동전</h2>
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
    `;
  }

  mount() {
    const { chargedCoins } = Store.instance.getState();
    this.innerHTML = this.template(chargedCoins);
  }

  render() {
    const { chargedCoins } = Store.instance.getState();
    const tbody = this.querySelector('tbody');

    if (!tbody) return;
    tbody.innerHTML = this.coinsTemplate(chargedCoins);
  }
}

export default ChangesInventory;
