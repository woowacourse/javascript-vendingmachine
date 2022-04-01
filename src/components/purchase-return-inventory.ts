import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import { CoinRecord } from '../types';
import { convertToLocaleString } from '../utils';

@customElement('purchase-return-inventory')
class PurchaseReturnInventory extends Component {
  coinsTemplate(coins: CoinRecord) {
    return Object.keys(coins)
      .map(Number)
      .map((unit) => {
        return `
        <tr>
          <td>${convertToLocaleString(unit)}원</td>
          <td>${convertToLocaleString(coins[unit])}개</td>
        </tr>
      `;
      })
      .join('');
  }

  template(coins: CoinRecord): string {
    return `
      <section class="purchase-return-inventory mb-4">
        <h2>잔돈</h2>
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

export default PurchaseReturnInventory;
