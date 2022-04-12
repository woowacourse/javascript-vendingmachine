import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

class InsertedMoneyIndicator extends Component {
  template() {
    const insertedMoney = vendingMachine.useStore(
      (state) => state.insertedMoney
    );

    return `
      <p class="money-indicator">투입한 금액: <span>${insertedMoney}원</span></p>
    `;
  }
}

customElements.define('inserted-money', InsertedMoneyIndicator);
