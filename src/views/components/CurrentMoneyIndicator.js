import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

class CurrentMoneyIndicator extends Component {
  template() {
    const totalMoney = vendingMachine.getTotalMoney();

    return `
      <p class="money-indicator">현재 보유 금액: <span>${totalMoney}원</span></p>
    `;
  }
}

customElements.define('current-money', CurrentMoneyIndicator);
