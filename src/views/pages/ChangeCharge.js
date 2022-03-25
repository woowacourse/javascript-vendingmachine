import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

class ChangeCharge extends Component {
  template() {
    const coins = vendingMachine.useStore((state) => state.coins);
    const coinArray = [...Object.entries(coins)];
    const totalMoney = vendingMachine.getTotalMoney();

    return `
      <section>
        <h2 hidden>잔돈 충전</h2>
        <form id="change-charge-form">
          <label for="amount">자판기가 보유할 금액을 입력해주세요.</label>
          <input id="change-amount" name="amount" placeholder="금액" type="number" min="10" max="100000" step="10" required autofocus>
          <button>충전</button>
        </form>
        <p>현재 보유 금액: <span>${totalMoney}원</span></p>
      </section>
      <section>
        <h2>자판기 보유한 동전</h2>
        <table>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            ${coinArray
              .map(
                ([key, value]) => `
                  <tr>
                    <td>${key}원</td>
                    <td>${value}개</td>
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
    this.addEvent('submit', '#change-charge-form', () => {
      const changeAmount = this.querySelector('#change-amount').valueAsNumber;

      vendingMachine.addCoin(changeAmount);

      this.render();
    });
  }
}

customElements.define('change-charge', ChangeCharge);
