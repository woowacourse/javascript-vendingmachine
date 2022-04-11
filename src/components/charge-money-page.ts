import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './charge-money-form';
import './changes-inventory';

@customElement('charge-money-page')
class ChargeMoneyPage extends Component {
  template(): string {
    return `
      <charge-money-form class="mb-12"></charge-money-form>
      <changes-inventory></changes-inventory>
    `;
  }

  mount() {
    this.render();
  }

  async render() {
    this.innerHTML = this.template();
  }
}

export default ChargeMoneyPage;
