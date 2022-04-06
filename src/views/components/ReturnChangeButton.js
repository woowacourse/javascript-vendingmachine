import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';

export default class ReturnChangeButton extends Component {
  template() {
    return `
      <button id="return-change-button" class="styled-button">반환</button>
    `;
  }

  setEvent() {
    this.addEvent('click', '#return-change-button', () => {
      try {
        vendingMachine.returnChange();
      } catch (err) {
        alert(err);
      }
    });
  }
}

customElements.define('return-button', ReturnChangeButton);
