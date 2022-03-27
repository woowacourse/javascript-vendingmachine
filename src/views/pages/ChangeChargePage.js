import Component from '../../core/Component';
import '../components/ChangeChargeForm';
import '../components/CurrentMoneyIndicator';
import '../components/CoinTable';

class ChangeChargePage extends Component {
  template() {
    return `
      <section>
        <h2 hidden>잔돈 충전</h2>
        <charge-form></charge-form>
        <current-money></current-money>
      </section>
      <section>
        <h2 class="table-title">자판기가 보유한 동전</h2>
        <coin-table></coin-table>
      </section>
    `;
  }
}

customElements.define('change-charge', ChangeChargePage);
