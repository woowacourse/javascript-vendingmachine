import Component from '../../abstract/component';
import { ACTION, COIN } from '../../constants';
import { customElement } from '../../decorators/decortators';
import createAction from '../../flux/createAction';
import Store from '../../flux/store';
import { CoinRecord } from '../../types';

@customElement('release-coin')
class ReleaseCoin extends Component {
  coinsTemplate(coins: CoinRecord) {
    const units = [...COIN.UNITS].sort((a, b) => b - a);
    return units
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
      <section class="release-coin">
        <h2>잔돈 반환</h2>
        <table class="mb-4">
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
        <button class="btn sm btn-secondary v-center btn-release">반환</button>
      </section>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-release', this.releaseCoin);
  }

  releaseCoin = () => {
    Store.instance.dispatch(createAction(ACTION.RELEASE_COIN, {}));
  };

  mount() {
    this.render();
  }

  render() {
    const { changes } = Store.instance.getState();
    this.innerHTML = this.template(changes);
  }
}

export default ReleaseCoin;
