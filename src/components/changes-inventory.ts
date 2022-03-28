import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import { CoinRecord } from '../types';

@customElement('changes-inventory')
class ChangesInventory extends Component {
  coinsTemplate(coins: CoinRecord) {
    return Object.keys(coins)
      .map(Number)
      .map((unit) => {
        return `
        <tr>
          <td>${unit.toLocaleString('ko-kr')}원</td>
          <td>${coins[unit].toLocaleString('ko-kr')}개</td>
        </tr>
      `;
      })
      .join('');
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
