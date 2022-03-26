import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

class ChangeChargePage extends Component {
  template() {
    const coins = vendingMachine.useStore((state) => state.coins);
    const coinArray = [...Object.entries(coins)].sort(([a], [b]) => b - a);
    const totalMoney = vendingMachine.getTotalMoney();

    return `
      <section>
        <h2 hidden>잔돈 충전</h2>
        <form id="change-charge-form" class="change-charge-form">
          <div>
            <label for="amount" class="description">자판기가 보유할 금액을 입력해주세요.</label>
            <input
              id="charge-amount"
              class="charge-amount-input styled-input"
              name="amount"
              placeholder="금액"
              type="number"
              min="10"
              max="100000"
              step="10"
              required
              autofocus
            >
          </div>
          <button class="add-charge-button styled-button emphasized">충전</button>
        </form>
        <p class="current-money-indicator">현재 보유 금액: <span>${totalMoney}원</span></p>
      </section>
      <section>
        <h2 class="table-title">자판기가 보유한 동전</h2>
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
      </section>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#change-charge-form', (event) => {
      event.preventDefault();

      const chargeAmount = this.querySelector('#charge-amount').valueAsNumber;

      try {
        vendingMachine.addCoin(chargeAmount);
      } catch (err) {
        window.alert(err);
      }
    });
  }
}

customElements.define('change-charge', ChangeChargePage);
